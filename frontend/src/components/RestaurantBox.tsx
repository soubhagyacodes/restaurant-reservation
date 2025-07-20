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
        <div className="md:py-8 md:px-8 px-4 py-3 md:grid md:grid-cols-12 w-full font-[Rubik] rounded-lg border-1 border-gray-400/65 hover:border-orange-500 group duration-150">
            <div className="col-span-9 cursor-pointer">
            <Link to={`/restaurants/${restaurant.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="mt-2 md:text-base text-xs md:hidden">
                        {availableTables > 0 ? <p className="text-green-500 font-semibold ">{availableTables} Table{availableTables > 1 ? "s" : ""} Available</p> : <p className="text-red-400 font-bold"> No Tables Available</p>}
                    </div>
                    <p className="md:text-3xl text-2xl group-hover:text-orange-500 duration-150 font-medium">{restaurant.name}</p>

                <div className="flex items-center gap-3 mt-1">

                    <div className="flex items-center text-xs gap-1">
                        <MapPin className="size-3" /> {restaurant.location}
                    </div>
                    <div className="flex items-center text-xs gap-1">
                        <RectangleHorizontal className="size-3" /> {restaurant.tables.length} Tables
                    </div>
                </div>
                <div className="mt-2 line-clamp-2 md:text-sm text-xs text-gray-700">{restaurant.description}</div>
                <div className="mt-3 md:block hidden">
                        {availableTables > 0 ? <p className="text-green-500 font-semibold md:text-left text-center">{availableTables} Table{availableTables > 1 ? "s" : ""} Available</p> : <p className="text-red-400 font-bold"> No Tables Available</p>}
                    </div>
               </Link>
            </div>

            <div className="flex items-center col-span-3 ml-auto gap-5">
                {restaurant.tables.length!= 0 ? <Button className="cursor-pointer bg-orange-400 hover:bg-amber-500/95 w-full mt-4 md:mt-0 md:w-63 md:h-12 md:text-lg font-[Satoshi] font-extrabold" onClick={() => {navigate(`/restaurants/${restaurant.id}/tables`); window.scrollTo({ top: 0, behavior: "smooth" })}}>Reserve a Table</Button> : (
                    <div className="text-orange-500 font-medium md:text-base text-sm">
                        (Reservations Starting Soon)
                    </div>
                )}
                {/* <HeartIcon className={"cursor-pointer text-red-500" + (favorite ? " fill-red-500" : "")} onClick={() => { setFavorite((value) => !value) }} /> */}
            </div>

                
        </div>
                     
    )
}
