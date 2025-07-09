import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Loader2Icon, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import RestaurantBox from "@/components/RestaurantBox";
import axios from '../config/axios'
import { useSearchParams } from "react-router";


export type tableType = {
    id: string,
    tableNumber: number,
    seats: number,
    isAvailable: boolean,
    restaurantId: string
}

export type restaurantType = {
    id: string,
    name: string,
    location: string,
    description: string,
    ownerId: string,
    tables: tableType[]
}


export default function Restaurants() {
    // const [searchFilter, setSearchFilter] = useState("")
    // const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState<restaurantType[]>([])
    const [faultyFetch, setfaultyFetch] = useState<boolean>(false)
    // const [filter2, setFilter2] = useState<string>("all")
    const [searchParams, setSearchparams] = useSearchParams()

    const queryParams = Object.fromEntries(searchParams.entries())
    const searchValue = queryParams.searchvalue ? queryParams.searchvalue : ""
    const searchFilter = queryParams.searchFilter ? queryParams.searchFilter : ""
    const filter2 = queryParams.filter2 ? queryParams.filter2 : "all"

    useEffect(() => {
        axios.get("/api/restaurants", { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setRestaurants(response.data)
            })
            .catch((error) => {
                console.log("Error while fetching the restaurants data: ", error)
                setfaultyFetch(true)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    function getFilteredRestaurants(): restaurantType[]{
        let filtered = [...restaurants]

        if(searchValue.trim() != ""){
            if(searchFilter == "name"){
                filtered = filtered.filter((restaurant) => restaurant.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
            }
            else if(searchFilter == "location"){
                filtered = filtered.filter((restaurant) => restaurant.location.toLowerCase().includes(searchValue.toLowerCase().trim()))
            }
        }

        if(filter2 != "all"){
            const threshold = parseInt(filter2);
            filtered = filtered.filter((restaurant) => restaurant.tables.length >= threshold)
        }

        return filtered
    }   
    
    const filteredRestaurants = getFilteredRestaurants()

    return (
        <div className=" font-[Rubik] p-15 pt-35 bg-[url(../../landing.svg)] bg-repeat-x">
            <p className="text-8xl font-extrabold font-[Satoshi] text-center">Restaurants</p>
            <p className="font-bold font-[Satoshi] text-3xl text-orange-400  mt-2  text-center">Book your table now</p>

            <div className="flex items-center mt-8">
                <div className="flex items-center gap-2">
                    {/* <Filter className="text-gray-400" /> */}
                    <Select onValueChange={(value) => {setSearchparams({...queryParams, searchFilter: value}) }} value={queryParams.searchFilter}>
                        <SelectTrigger className="!h-13 w-44 border-2 !rounded-r-none !text-black">
                            <div className="flex gap-3">
                                <Filter className="size-5 text-gray-400"/><SelectValue placeholder="Filter" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Search by</SelectLabel>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="location">Location</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Input className="h-13 !rounded-l-none" placeholder="Search..." onChange={(e) => { setSearchparams({...queryParams, searchvalue: e.target.value}, {replace: true}) }} value={queryParams.searchvalue} />
            </div>

            <div className="mt-8 grid grid-cols-8 gap-8">
                <div className="col-span-1 h-full">
                    <p className="mb-4 text-orange-400 font-medium">Filters:</p>

                    <div>
                        <p className="text-sm mb-4 font-light">Number of Tables</p>
                        <RadioGroup defaultValue="all" onValueChange={(value) => setSearchparams({...queryParams, filter2: value})} value={queryParams.filter2}>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="all" id="r1" />
                                <Label htmlFor="r1" className="font-normal text-xs">All</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="2" id="r12" />
                                <Label htmlFor="r12" className="font-normal text-xs">{">= 2"}</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="10" id="r2" />
                                <Label htmlFor="r2" className="font-normal text-xs">{">= 10"}</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="15" id="r3" />
                                <Label htmlFor="r3" className="font-normal text-xs">{">= 15"}</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="col-span-7 flex-col flex gap-4 min-h-70">
                    {loading ? (
                        <div className="min-h-80 flex items-center justify-center font-[Ubuntu] text-md gap-2">
                            <Loader2Icon className="animate-spin" /> Loading...
                        </div>
                    ) : 
                    faultyFetch ? (
                        <div className="flex items-center justify-center h-80  text-2xl gap-3">
                            Something Went Wrong. Please Refresh or Try Again Later.
                        </div> 
                    ) : (filteredRestaurants.length == 0 ? (
                        <div className="flex items-center justify-center h-80  text-3xl gap-3">< UtensilsCrossed className="size-10"/> Nothing Found</div>
                    ) :
                    searchValue != "" && searchFilter == "" ? (
                        <div className="flex items-center justify-center h-80  text-2xl gap-3">
                            Select a <b>Search Filter Criteria</b> from the dropdown first before searching
                        </div> 
                    ) : (
                        filteredRestaurants.map((restaurant) => <RestaurantBox key={restaurant.id} restaurant={restaurant}/>)
                    )
                    )
                    }
                </div>
            </div>
        </div>

    )
}