import { Circle } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"
import OwnerSingleTableRow from "./OwnerSingleTableRow"

type reservations = {
   id: string,
   reservationTime: string,
   duration: number,
   status: string,
   reservationBy: {
      _count: {
         reservations: number
      },
      email: string,
      name: string,
      id: string
   }
}[]


export default function TableReservationGrid({ reservations }: { reservations: reservations | undefined }) {
   const [searchQuery, setSearchQuery] = useState("")

   function getFilteredReservations(){
      let filtered = reservations;

      if(searchQuery != ""){
         filtered = reservations?.filter((reservation) => reservation.reservationBy.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }

      return filtered
   }

   const filteredReservations = getFilteredReservations()

   return (
      <>
         {reservations?.length == 0 ? <div className="h-50 flex items-center justify-center text-2xl">
            No Reservations for this table currently.
         </div> : (
            <>
               <div className="flex justify-between mb-4 items-center">
                  <p className="flex gap-2 items-center"><Circle className="fill-gray-400 text-gray-400 size-5" /> Old Reservations</p>

                  <Input className="w-60 border-2" placeholder="Search..." onChange={e => setSearchQuery(e.target.value)} value={searchQuery}/>
               </div>
               <div className="grid grid-cols-9 bg-orange-200 p-2 text-sm gap-x-1">
                  <p className="font-semibold">Username</p>
                  <p className="font-semibold col-span-2">email</p>
                  <p className="font-semibold">Past Reservations</p>
                  <p className="font-semibold">Date</p>
                  <p className="font-semibold">Time</p>
                  <p className="font-semibold">Duration</p>
                  <p className="font-semibold">Status</p>
                  <p className="font-semibold">Actions</p>
               </div>
               {filteredReservations?.map(({ id, duration, reservationBy: { email,name, _count: { reservations } }, reservationTime, status }) => {
                  const date = new Date(reservationTime).toLocaleDateString()
                  const time = new Date(reservationTime).toLocaleTimeString('en-US', { hour12: true, timeStyle: "short" })
                  let old = false;

                  if (new Date(reservationTime) < new Date()) {
                     old = true;
                  }

                  const reservation = {id, name, email, status, reservations, date, time, old, duration}

                  return <OwnerSingleTableRow reservation={reservation} key={id}/>
               })}
            </>
         )}
      </>
   )
}
