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
import axios from "axios";


type tableType = {
    id: string,
    tableNumber: number,
    seats: number,
    isAvailable: boolean,
    restaurantId: string
}

type restaurantType = {
    id: string,
    name: string,
    location: string,
    description: string,
    ownerId: string,
    tables: tableType[]
}

export default function Restaurants() {
    const [searchFilter, setSearchFilter] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState<restaurantType[]>([])

    useEffect(() => {
        console.log("useeffect runs")
        axios.get("http://localhost:3000/api/restaurants", { withCredentials: true })
            .then((response) => {
                setRestaurants(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <div className=" font-[Rubik] p-15">
            <p className="font-[Ubuntu] text-5xl font-bold">Restaurants</p>
            <p className="font-[Ubuntu] text-2xl text-orange-400  mt-2">Book your table now</p>

            <div className="flex items-center mt-8">
                <div className="flex items-center gap-2">
                    {/* <Filter className="text-gray-400" /> */}
                    <Select onValueChange={(value) => { setSearchFilter(value) }}>
                        <SelectTrigger className="!h-13 w-35 border-2 !rounded-r-none !text-black">
                            <Filter className="size-5 text-gray-400"/><SelectValue placeholder="Filter" />
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

                <Input className="h-13 !rounded-l-none" placeholder="Search..." onChange={(e) => { setSearchValue(e.target.value) }} value={searchValue} />
            </div>

            <div className="mt-8 grid grid-cols-8 gap-8">
                <div className="col-span-1 h-full">
                    <p className="mb-4 text-orange-400 font-medium">Filters:</p>

                    <div>
                        <p className="text-sm mb-4 font-light">Number of Tables</p>
                        <RadioGroup>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="all" id="r1" />
                                <Label htmlFor="r1" className="font-normal text-xs">All</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value=">2" id="r12" />
                                <Label htmlFor="r12" className="font-normal text-xs">{">2"}</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value=">10" id="r2" />
                                <Label htmlFor="r2" className="font-normal text-xs">{">10"}</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value=">15" id="r3" />
                                <Label htmlFor="r3" className="font-normal text-xs">{">15"}</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="col-span-7 flex-col flex gap-4">
                    {loading ? (
                        <div className="min-h-80 flex items-center justify-center font-[Ubuntu] text-md gap-2">
                            <Loader2Icon className="animate-spin" /> Loading...
                        </div>
                    ) : 
                    (searchValue.trim() === "" ? 
                        restaurants.map((restaurant) => <RestaurantBox key={restaurant.id} restaurant={restaurant}/>) 
                        : 
                        (searchFilter == "name" ? (<div className="flex flex-col gap-4">
                            {(restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchValue.trim().toLowerCase()))).length == 0 ? <div className="flex items-center justify-center h-80  text-3xl gap-3">< UtensilsCrossed className="size-10"/> Nothing Found</div> : null}
                            {(restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchValue.trim().toLowerCase()))).map((restaurant) => <RestaurantBox key={restaurant.id} restaurant={restaurant}/>)}
                        </div>) : (
                            searchFilter == "location" ? (
                                <div className="flex flex-col gap-4">
                            {(restaurants.filter((restaurant) => restaurant.location.toLowerCase().includes(searchValue.trim().toLowerCase()))).length == 0 ? <div className="flex items-center justify-center h-80  text-3xl gap-3">< UtensilsCrossed className="size-10"/> Nothing Found</div> : null}
                            {(restaurants.filter((restaurant) => restaurant.location.toLowerCase().includes(searchValue.trim().toLowerCase()))).map((restaurant) => <RestaurantBox key={restaurant.id} restaurant={restaurant}/>)}
                                </div>
                            ) : 
                            <div className="flex items-center justify-center h-80  text-2xl gap-3">
                                Select a <b>Search Filter Criteria</b> from the dropdown first before searching
                            </div> 
                        )))
                    }
                </div>
            </div>
        </div>
    )
}