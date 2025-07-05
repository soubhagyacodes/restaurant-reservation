import { AlarmClock, AlertCircle, CalendarDaysIcon, Check, Clock, Loader2Icon, LucideRockingChair, MapPin, RectangleHorizontalIcon, Trash2, X } from "lucide-react"
import { Button } from "./ui/button"
import {  useState } from "react"
import { cancelReservation } from "@/api/reservations"
import { toast } from "sonner"

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"

type reservationType = {
   id: string,
   reservationTime: string,
   duration: number,
   status: string,
   tableReserved: {
      id: string,
      tableNumber: number,
      seats: number,
      ofRestaurant: {
         id: string,
         name: string,
         location: string
      }
   }
}


export default function ReservationBox({ reservation }: { reservation: reservationType }) {
   const [reservationStatus, setReservationStatus] = useState(reservation.status)
   const [loading, setLoading] = useState(false)
   const [dialogOpen, setDialogOpen] = useState(false)

   const old = new Date(reservation.reservationTime) <= new Date()

   function btnHandler(){
      setDialogOpen(true)
   }

   async function cancelReservationHandler(){
      setLoading(true)
      try {
         await cancelReservation(reservation.id)
         setReservationStatus("CANCELLED")
      } catch (error) {
         console.log("Error while cancelling a reservation by the user: ", error)
         toast.error("Something Went Wrong", {description: "Please try again later."})
      }
      finally{
         setDialogOpen(false)
         setLoading(false)
      }
   }

   return (
      <div className={"font-[Rubik] border-1 border-t-0 overflow-hidden rounded-3xl " + (old ? "border-gray-500" : "border-orange-400")}>
         {old ? <p className="text-center bg-gray-500 text-white font-bold text-xl">Old Reservation</p> : (reservationStatus == "PENDING" ? <p className="text-center bg-yellow-300 text-white font-bold text-md">Pending</p> : (reservationStatus == "CANCELLED" ? <p className="text-center bg-red-400 text-white font-bold text-md">Cancelled</p> : <p className="text-center bg-green-400 text-white font-bold text-md">Confirmed</p>))}
      <div className="grid grid-cols-4">
         <div className="col-span-3 p-10">
            <p className="text-gray-500 text-sm">Reservation id: {reservation.id}</p>
            <p className={"text-4xl font-[Satoshi] font-extrabold " + (old ? "text-gray-500" : "")}>{reservation.tableReserved.ofRestaurant.name}</p>
            <div className={"grid grid-cols-2 mt-3 " + (old ? "text-gray-500" : "")}>
               <div>
                  <p className="flex gap-2"><MapPin /> {reservation.tableReserved.ofRestaurant.location}</p>
                  <p className="flex gap-2"><RectangleHorizontalIcon /> Table #{reservation.tableReserved.tableNumber}</p>
                  <p className="flex gap-2"><LucideRockingChair />{reservation.tableReserved.seats} Seats</p>
               </div>
               <div>
                  <p className="flex gap-2"><CalendarDaysIcon /> {new Date(reservation.reservationTime).toLocaleDateString()}</p>
                  <p className="flex gap-2"><Clock /> {new Date(reservation.reservationTime).toLocaleTimeString('en-US', {hour12: true, timeStyle: "short"})}</p>
                  <p className="flex gap-2"><AlarmClock /> {reservation.duration} Hours</p>
               </div>
            </div>
         </div>
         <div className="btns col-span-1 flex flex-col items-center justify-center gap-6">
            <div>
            <p className="text-sm mb-4 text-gray-500 text-center">Confirmation Status: </p>
            {reservationStatus == "PENDING" ? <div className={"flex items-center justify-center text-3xl font-bold gap-x-2 " + (old ? "text-gray-500" : "text-yellow-300")}><AlertCircle className="size-10"/>  {reservationStatus}</div> : (reservationStatus == "CANCELLED" ? <div className={"flex items-center justify-center  text-3xl font-bold gap-x-2 " + (old ? "text-gray-500" : "text-red-400")}> <X className="size-9"/>{reservationStatus}</div> : <div className={"flex items-center justify-center  text-3xl font-bold gap-x-2 " + (old ? "text-gray-500" : "text-green-400")}><Check className="size-9"/>{reservationStatus}</div>)}
            </div>
            <div className="flex items-center justify-center ">
            {old ? <Button className="bg-gray-500/90 h-12 w-50" disabled><Trash2/>Cancel Reservation</Button> : (reservationStatus != "CANCELLED" ? <Button className="bg-red-500/90 h-12 w-50 hover:bg-red-500/80" onClick={btnHandler} ><Trash2 />Cancel Reservation</Button> : (loading ? <Button className="bg-red-500/90 h-12 w-50" disabled><Loader2Icon className="animate-spin"/>Cancel Reservation</Button> : <Button className="bg-red-500/90 h-12 w-50" disabled><Trash2/>Cancel Reservation</Button>))}

            </div>
         </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="font-[Rubik] p-7">
               <DialogHeader>
                  <DialogTitle className="font-[Satoshi] text-3xl font-bold">Are You Sure?</DialogTitle>
                  <DialogDescription className="text-md">
                     Cancelling a reservation is irreversible
                  </DialogDescription>
               </DialogHeader>
               <div className="flex items-center justify-end mt-5 gap-3">
                  <DialogClose><Button variant={"outline"} className="border-2">Close</Button></DialogClose>
                  <Button className="bg-red-500 hover:bg-red-500/90" onClick={cancelReservationHandler}>Yes</Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   )
}
