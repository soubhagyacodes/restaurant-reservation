import clsx from "clsx"
import { Circle } from "lucide-react"

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
   return (
      <>
         {reservations?.length == 0 ? <div className="h-50 flex items-center justify-center text-2xl">
            No Reservations for this table currently.
         </div> : (
            <>
            <p className="flex gap-2 items-center mb-3"><Circle className="fill-gray-400 text-gray-400 size-5"/> Old Reservations</p>
            <div className="grid grid-cols-8 bg-orange-200 p-2">
            <p className="font-semibold col-span-2">Username</p>
            <p className="font-semibold">Past Reservations</p>
            <p className="font-semibold">Date</p>
            <p className="font-semibold">Time</p>
            <p className="font-semibold">Duration</p>
            <p className="font-semibold">Status</p>
         </div>
         {reservations?.map(({duration, reservationBy: {name, _count: {reservations}}, reservationTime, status}) => {
            const date = new Date(reservationTime).toLocaleDateString()
            const time = new Date(reservationTime).toLocaleTimeString('en-US', {hour12: true, timeStyle: "short"})
            let old = false;

            if(new Date(reservationTime) < new Date()){
               old = true;
            }

            return <div className={clsx("grid grid-cols-8 p-2 items-center border-b-1 border-b-gray-400", old && "text-gray-400")}>
               <p className="col-span-2">{name}</p>
               <p>{reservations}</p>
               <p>{date}</p>
               <p>{time}</p>
               <p>{duration} Hours</p>
               <p>{status}</p>
            </div>
         })}
         </>
         )}
      </>
   )
}
