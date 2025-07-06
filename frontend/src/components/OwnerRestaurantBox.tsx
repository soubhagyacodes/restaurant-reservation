import { EditIcon, LucideRectangleHorizontal, MapPin, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"

type OwnerRestaurant = {
	id: string,
	name: string,
	location: string,
	description: string,
	ownerId: string,
	_count: {
		tables: number
	},
	tables: {
		isAvailable: true,
		reservationHistory: {
			reservationTime: string,
			status: string
		}[]
	}[]
}


export default function OwnerRestaurantBox({ restaurant }: { restaurant: OwnerRestaurant }) {
   const getData = () => {
      let available = 0
      let pending = 0
      const tables = restaurant.tables

      tables.forEach((table) => {
         if(table.isAvailable){
            available ++;
         }

         table.reservationHistory.forEach((reservation) => {
            if(new Date(reservation.reservationTime) > new Date() && status == "PENDING"){
               pending++;
            }
         })
      })

      const notAvailable = restaurant._count.tables - available

      return [available, notAvailable, pending]
   }

   const [available, notAvailable, pending] = getData()

   const navigate = useNavigate()
   return (
      <div className="min-h-50 border-2 p-10 border-gray-400/60 rounded-md overflow-hidden grid-cols-12 grid group hover:border-orange-300 hover:shadow-md duration-200">
         <div className="col-span-9 cursor-pointer" onClick={() => {navigate(`/ownerrestaurant/${restaurant.id}`); scrollTo({behavior: "smooth", top: 0})}}>
            {pending > 0 && <span className="inline-block bg-yellow-400 text-xl p-1 px-2 rounded-t-xl text-white font-extrabold font-[Satoshi] mb-1">{pending} Pending Reservations</span>}
            <p className="text-5xl font-[Satoshi] font-extrabold group-hover:text-orange-400 duration-200">{restaurant.name}</p>
            <div className="flex gap-3 mt-3">
               <div className="flex items-center gap-1"><MapPin /> {restaurant.location}</div>
               <div className="flex items-center gap-1"><LucideRectangleHorizontal /> {restaurant._count.tables} Tables</div>
            </div>
            <div className="mt-5">
               <p className="font-medium">Table Stats: </p>
               <div className="flex gap-5">
                  <p className="text-green-400 font-bold">{available} Available</p>
                  <p className="text-red-400 font-bold">{notAvailable} Not In Service</p>
               </div>
            </div>
         </div>
         <div className="col-span-3 flex items-center justify-center">
            <div className="flex flex-col gap-3 h-full w-full justify-center">
               <Button className="bg-orange-400/90 hover:bg-orange-400/70 text-xl h-12"><EditIcon className="size-5"/>Edit Details</Button>
               <Button className="bg-red-400 hover:bg-red-400/90 h-12 text-xl"><Trash2 className="size-5"/>Delete</Button>
            </div>
         </div>
      </div>
   )
}
