import clsx from "clsx";
import { AlertCircle, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { assignStatus } from "@/api/management";
import { toast } from "sonner";

export default function OwnerSingleTableRow({ reservation: {id, name, email, status, reservations, date, time, old, duration } }: { reservation: { id: string, name: string, email: string, status: string, reservations: number, date: string, time: string, old: boolean, duration: number } }) {
   const [varStatus, setStatus] = useState(status)
   const [confirmDialog, setConfirmDialog] = useState(false)
   const [cancelDialog, setCancelDialog] = useState(false)

   async function handleConfirmReservation(){
      setConfirmDialog(false)

      try {
         await assignStatus(id, "CONFIRMED")
         setStatus("CONFIRMED")
      } catch (error) {
         console.log("Error while confirming a reservation: ", error)
         toast.error("Something went wrong while confirming the reservation", {description: "Please try again later."})
      }
   }

   async function handleCancelReservation(){
      setCancelDialog(false)
      try {
         await assignStatus(id, "CANCELLED")
         setStatus("CANCELLED")
      } catch (error) {
         console.log("Error while cancelling a reservation: ", error)
         toast.error("Something went wrong while cancelling the reservation", {description: "Please try again later."})
      }
   }

   return (
      <>
         <div className={clsx("grid grid-cols-9 p-2 items-center border-b-1 border-b-gray-400 text-sm gap-x-1", old && "text-gray-400")}>
            <p className="break-words pr-3">{name}</p>
            <p className="col-span-2 break-all pr-4">{email}</p>
            <p>{reservations}</p>
            <p>{date}</p>
            <p>{time}</p>
            <p>{duration} Hours</p>
            <p className={clsx("font-bold flex items-center gap-1", (old ? "text-gray-400" : varStatus == "PENDING" ? "text-yellow-400" : (varStatus == "CONFIRMED" ? "text-green-400" : "text-red-400")))}>{varStatus == "PENDING" ? <AlertCircle className="size-5" /> : varStatus == "CONFIRMED" ? <Check className="size-5" /> : <X className="size-5" />}{varStatus}</p>
            <div className="flex items-center justify-center gap-2">
               {varStatus == "PENDING" && <>
                  <Button className="cursor-pointer bg-white border-green-400 border-2 text-green-400 font-bold hover:text-white hover:bg-green-400 h-8 w-18" onClick={() => { setConfirmDialog(true) }}>Confirm</Button>
                  <Button className="cursor-pointer bg-white border-red-400 border-2 text-red-400 font-bold hover:text-white hover:bg-red-400 h-8 w-18" onClick={() => { setCancelDialog(true) }}>Cancel</Button>
               </>}
               {old && "Old Reservation"}
               {((varStatus == "CONFIRMED" || varStatus == "CANCELLED") && !old) && <><Button className="bg-white border-green-400 border-2 text-green-400 font-bold hover:text-white hover:bg-green-400 h-8 w-18" disabled>Confirm</Button><Button className="bg-white border-red-400 border-2 text-red-400 font-bold hover:text-white hover:bg-red-400 h-8 w-18" disabled>Cancel</Button> </>}
            </div>
         </div>

         <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
            <DialogContent className="font-[Satoshi]">
               <DialogHeader>
                  <DialogTitle className="text-xl">Are you absolutely sure to make this reservation as <b className="text-green-500">Confirmed?</b></DialogTitle>
                  <DialogDescription>
                     This action cannot be undone.
                  </DialogDescription>
               </DialogHeader>
               <div className="flex justify-end gap-3">
                  <DialogClose><Button variant={"outline"}>Close</Button></DialogClose>
                  <Button className="bg-green-500 hover:bg-green-500/80" onClick={handleConfirmReservation}>Confirm Reservation</Button>
               </div>
            </DialogContent>
         </Dialog>

         <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
            <DialogContent className="font-[Satoshi]">
               <DialogHeader>
                  <DialogTitle className="text-xl">Are you absolutely sure to make this reservation as <b className="text-red-500">Cancelled?</b></DialogTitle>
                  <DialogDescription>
                     This action cannot be undone.
                  </DialogDescription>
               </DialogHeader>
               <div className="flex justify-end gap-3">
                  <DialogClose><Button variant={"outline"}>Close</Button></DialogClose>
                  <Button className="bg-red-500 hover:bg-red-500/80" onClick={handleCancelReservation}>Cancel Reservation</Button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
