import { MapPin, RectangleHorizontal } from "lucide-react";
import { Button } from "./ui/button";

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

    return (
        <div className="p-8 grid grid-cols-12 font-[Rubik] rounded-lg border-1 border-gray-300 hover:border-orange-500 group duration-150">
            <div className="col-span-9">
                <p className="text-3xl group-hover:text-orange-500 duration-150 cursor-pointer font-medium">{restaurant.name}</p>
                <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center text-xs gap-1">
                        <MapPin className="size-3" /> {restaurant.location}
                    </div>
                    <div className="flex items-center text-xs gap-1">
                        <RectangleHorizontal className="size-3" /> {restaurant.tables.length} Tables
                    </div>
                </div>
                <div className="mt-2 line-clamp-2 text-sm text-gray-700">{restaurant.description}</div>
            </div>

            <div className="flex items-center col-span-3 ml-auto gap-5">
                {restaurant.tables.length!= 0 ? <Button className="cursor-pointer bg-orange-400 hover:bg-amber-500/95 w-50 h-11">Reserve Table</Button> : (
                    <div className="text-orange-500 font-medium">
                        (Reservations Starting Soon)
                    </div>
                )}
                {/* <HeartIcon className={"cursor-pointer text-red-500" + (favorite ? " fill-red-500" : "")} onClick={() => { setFavorite((value) => !value) }} /> */}
            </div>
        </div>
    )
}
