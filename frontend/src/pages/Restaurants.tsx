import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import RestaurantBox from "@/components/RestaurantBox";
import axios from "axios";


export default function Restaurants() {
    const [searchFilter, setSearchFilter] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
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
            <p className="font-[Ubuntu] text-5xl">Restaurants</p>

            <div className="flex items-center mt-14 gap-3">
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400" />
                    <Select onValueChange={(value) => { setSearchFilter(value) }}>
                        <SelectTrigger className="!h-11 w-34">
                            <SelectValue placeholder="Filter" />
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

                <Input className="h-11" placeholder="Search..." onChange={(e) => { setSearchValue(e.target.value) }} value={searchValue} />
            </div>

            <div className="mt-8 grid grid-cols-8 gap-8">
                <div className="col-span-1 h-full">
                    <p className="mb-5">Filters:</p>

                    <div>
                        <p className="text-gray-400 text-sm mb-4">Number of Tables</p>
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
                <div className="col-span-7 h-full flex-col flex gap-4">
                    {restaurants.map((restaurant) => <RestaurantBox restaurant={restaurant}/>)}
                </div>
            </div>
        </div>
    )
}