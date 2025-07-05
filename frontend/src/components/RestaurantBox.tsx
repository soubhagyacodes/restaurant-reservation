import { MapPin, RectangleHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";

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

export default function RestaurantBox({ restaurant }: { restaurant: restaurantType }) {
    const navigate = useNavigate()

    function getAvailableTables(){
        let count = 0;
        restaurant.tables.forEach((table) => {
            if(table.isAvailable){
                count ++;
            }
        })

        return count
    }

    const availableTables = getAvailableTables()

    return (
        <div className="p-8 grid grid-cols-12 font-[Rubik] rounded-lg border-1 border-gray-300 hover:border-orange-500 group duration-150">
            <div className="col-span-9 cursor-pointer">
            <Link to={`/restaurants/${restaurant.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <p className="text-3xl group-hover:text-orange-500 duration-150 font-medium">{restaurant.name}</p>

                <div className="flex items-center gap-3 mt-1">

                    <div className="flex items-center text-xs gap-1">
                        <MapPin className="size-3" /> {restaurant.location}
                    </div>
                    <div className="flex items-center text-xs gap-1">
                        <RectangleHorizontal className="size-3" /> {restaurant.tables.length} Tables
                    </div>
                </div>
                <div className="mt-2 line-clamp-2 text-sm text-gray-700">{restaurant.description}</div>
                <div className="mt-3">
                        {availableTables > 0 ? <span className="text-green-500 font-semibold">{availableTables} Table{availableTables > 1 ? "s" : ""} Available</span> : <span className="text-red-400 font-bold"> No Tables Available</span>}
                    </div>
               </Link>
            </div>

            <div className="flex items-center col-span-3 ml-auto gap-5">
                {restaurant.tables.length!= 0 ? <Button className="cursor-pointer bg-orange-400 hover:bg-amber-500/95 w-63 h-12" onClick={() => {navigate(`/restaurants/${restaurant.id}/tables`); window.scrollTo({ top: 0, behavior: "smooth" })}}>Reserve a Table</Button> : (
                    <div className="text-orange-500 font-medium">
                        (Reservations Starting Soon)
                    </div>
                )}
                {/* <HeartIcon className={"cursor-pointer text-red-500" + (favorite ? " fill-red-500" : "")} onClick={() => { setFavorite((value) => !value) }} /> */}
            </div>
        </div>
                     
    )
}
