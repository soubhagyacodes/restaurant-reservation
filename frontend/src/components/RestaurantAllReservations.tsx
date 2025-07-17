import { Circle } from "lucide-react"
import AllReservationsRestaurantRow from "./Row-Restaurant-AllReservations"
import { Input } from "./ui/input"
import { useState, type Dispatch, type SetStateAction } from "react"

type tableType = {
   id: string,
   tableNumber: number,
   seats: number,
   isAvailable: boolean,
   restaurantId: string,
   _count: { reservationHistory: number },
   reservationHistory: {
      id: string,
      reservationTime: string,
      duration: number,
      status: string,
      tableId: string,
      reservationBy: {
         _count: { reservations: number }
         id: string,
         name: string,
         email: string
      }
   }[]
}

export default function RestaurantAllReservations({ tables, setTables }: { tables: tableType[] | undefined, setTables: Dispatch<SetStateAction<tableType[] | undefined>> }) {

   const [searchQuery, setSearchQuery] = useState("")

   function getData() {
      const reservations: { reservationID: string, tableNumber: number, seats: number, name: string, email: string, pastReservations: number, old: boolean, duration: number, status: string, date: string, time: string, reservationTime: string, tableId: string }[] = []
      tables?.forEach(({ reservationHistory, tableNumber, seats }) => {
         reservationHistory.forEach(({ id, tableId, reservationTime, duration, status, reservationBy: { name, email, _count: { reservations: pastReservations } } }) => {
            let old = false;

            if (new Date(reservationTime) < new Date()) {
               old = true;
            }

            const date = new Date(reservationTime).toLocaleDateString()
            const time = new Date(reservationTime).toLocaleTimeString('en-US', { timeStyle: "short", hour12: true })

            reservations.push({ reservationID: id, tableNumber, seats, name, email, pastReservations, old, duration, status, date, time, reservationTime, tableId })
         })
      })

      return reservations
   }

   const reservations = getData()

   function getFilteredReservations(){
      let filtered = reservations;

      if(searchQuery != ""){
         filtered = reservations?.filter((reservation) => reservation.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }

      return filtered
   }

   const filteredReservations = getFilteredReservations()

   

   return (
      <>
         <div className="flex justify-between mb-4 items-center">
            <p className="flex gap-2 items-center text-sm"><Circle className="fill-gray-400 text-gray-400 size-5" /> Old Reservations</p>

            <div className="flex items-center gap-2 text-sm">
               <p>Search : </p>
               <Input className="w-60 border-2" placeholder="Search..." onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
            </div>
         </div>
         <div className="grid grid-cols-10 py-2 bg-orange-200 font-medium text-sm">
            <p>User</p>
            <p className="col-span-2">Email</p>
            <p>Past Reservations</p>
            <p className="ml-4">Table No. (Seats)</p>
            <p className="ml-5">Date</p>
            <p>Time</p>
            <p>Duration</p>
            <p>Status</p>
            <p>Actions</p>
         </div>

         {filteredReservations.length == 0 ? (
            <div className="h-80 flex items-center justify-center">
               No Reservations.
            </div>
         ): filteredReservations.map((reservation) => {
            return <AllReservationsRestaurantRow reservation={reservation} key={reservation.reservationID} setTables={setTables}/>
         })}
      </>
   )
}
