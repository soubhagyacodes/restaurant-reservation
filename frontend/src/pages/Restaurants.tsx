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

    const isMobile = window.innerWidth < 768;

    return (
        <div className=" font-[Rubik] md:p-15 px-4 md:pt-35 pt-35 bg-[url(../../landing.svg)] bg-repeat-x md:flex md:flex-col overflow-clip">
            <p className="md:text-8xl font-extrabold font-[Satoshi] md:text-center  text-5xl">Restaurants</p>
            <p className="font-bold font-[Satoshi] text-xl md:text-3xl text-orange-400  md:mt-2  md:text-center">Book your table now</p>

            <div className="flex items-center mt-8">
                <div className="flex items-center gap-2">
                    {/* <Filter className="text-gray-400" /> */}
                    <Select onValueChange={(value) => {setSearchparams({...queryParams, searchFilter: value}) }} value={queryParams.searchFilter}>
                        <SelectTrigger className="!h-11 md:!h-13 md:w-44 border-2 !rounded-r-none !text-black">
                            <div className="flex gap-3">
                                <Filter className="size-5 text-gray-400"/><SelectValue placeholder={isMobile ? "" : "Filter"} />
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

                <Input className="md:h-13 h-11 !rounded-l-none md:text-md text-sm" placeholder="Search..." onChange={(e) => { setSearchparams({...queryParams, searchvalue: e.target.value}, {replace: true}) }} value={queryParams.searchvalue} />
            </div>

            <div className="md:mt-8 mt-7 md:grid grid-cols-8 gap-8">
                <div className="col-span-1 h-full hidden md:block">
                    <p className="mb-4 text-orange-400 font-medium">Filters:</p>

                    <div className="">
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
                <div className="col-span-7 flex-col flex gap-4 min-h-70 mb-8 md:mb-0">
                    {loading ? (
                        <div className="md:h-80 h-60 flex items-center justify-center font-[Ubuntu] md:text-md text-lg gap-2 md:px-0 px-5">
                            <Loader2Icon className="animate-spin" /> Loading...
                        </div>
                    ) : 
                    faultyFetch ? (
                        <div className="flex items-center justify-center md:h-80 h-60  md:text-2xl text-lg gap-3 md:px-0 px-5">
                            Something Went Wrong. Please Refresh or Try Again Later.
                        </div> 
                    ) : (filteredRestaurants.length == 0 ? (
                        <div className="flex items-center justify-center md:h-80 h-60  text-3xl gap-3">< UtensilsCrossed className="size-10"/> Nothing Found</div>
                    ) :
                    searchValue != "" && searchFilter == "" ? (
                        <div className="flex items-center justify-center md:h-80 h-60  md:text-2xl text-lg md:px-0 px-5 gap-3">
                            <p>Select a <b>Search Filter Criteria</b> from the dropdown first before searching</p>
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