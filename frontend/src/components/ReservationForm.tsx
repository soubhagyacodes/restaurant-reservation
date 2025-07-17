import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Loader2Icon, MailCheck } from "lucide-react";
import { createReservation, handleCreateReservationErrors } from "@/api/reservations";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { sendMail } from "@/api/mail";
import useAuth from "@/hooks/useAuth";

type tableType = {
   id: string,
   tableNumber: number,
   seats: number,
   isAvailable: boolean,
   restaurantId: string,
   _count: { reservationHistory: number }
}

type restaurantType = {
   id: string,
   name: string,
   location: string,
   description: string,
   ownerid: string,
   owner: {
      id: string,
      name: string,
      role: string
   },
   _count: { tables: number }
   tables: tableType[]
}

const formSchema = z.object({
   reservationTime: z.iso.datetime({ local: true, message: "Not a Valid Date-Time" }),
   duration: z.string().min(1, "Duration should be minimum of 1 hour").max(5, "Duration cannot be more than 5 hours.")
}).refine((data) => (new Date(data.reservationTime)) > new Date(), {
   message: "Date and Time are old",
   path: ["reservationTime"],
})
   .refine((data) => (Number.isInteger(Number(data.duration)) && parseInt(data.duration) != undefined && (parseInt(data.duration) >= 1) && (parseInt(data.duration) <= 5)), {
      message: "Must be a positive integer between 1 hours to 5 hours",
      path: ["duration"]
   })

type reservationFormType = z.infer<typeof formSchema>


export default function ReservationForm({ table, restaurant }: { table: tableType, restaurant: restaurantType | null }) {
   const [dialogOpen, setDialogOpen] = useState(false)
   const navigate = useNavigate()
   const [btnloading, setbtnLoading] = useState<boolean>(false)
   const [reservationDateTime, setReservationDateTime] = useState(new Date())
   const [reservedDuration, setReservedDuration] = useState(1)
   const [mailSent, setMailSent] = useState(false)
   const { user } = useAuth()

   const form = useForm<reservationFormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         reservationTime: "",
         duration: "",
      },
   })

   async function onSubmit({ duration, reservationTime }: reservationFormType) {
      // We've got local time, convert to ISO string and send.
      // Baad mein convert, duration to number before sending.......
      setbtnLoading(true)
      setReservationDateTime(new Date(reservationTime))
      setReservedDuration(parseInt(duration))

      const finalObject = {
         reservationTime: new Date(reservationTime).toISOString(),
         duration: parseInt(duration),
         tableId: table.id
      }
      const loadingID = toast.loading("Loading...", { description: "Please wait while we reserve your table." })
      try {
         await createReservation(finalObject)
         toast.dismiss(loadingID)
         setDialogOpen(true)
         // navigate("/my-reservations")
         // scrollTo({ behavior: "smooth", top: 0 })

         const reservationDateTime = new Date(reservationTime)

         try {
            const values = {
               tableNumber: table.tableNumber,
               seats: table.seats,
               restaurantName: restaurant?.name,
               restaurantLocation: restaurant?.location,
               reservationDate: reservationDateTime.toLocaleDateString(),
               reservationTime: reservationDateTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
               }),
               reservationDuration: parseInt(duration),
               username: user?.name
            }
            await sendMail(values)
            setMailSent(true)
         } catch (error) {
            console.log("Error While Sending the mail: ", error)
         }
      } catch (error) {
         handleCreateReservationErrors(error, loadingID)
      }
      finally {
         setbtnLoading(false)
      }
   }


   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 font-[Satoshi] font-bold">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="reservationTime"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-md text-orange-400 font-bold">Date and Time to be Reserved</FormLabel>
                           <FormControl>
                              <Input placeholder="Reservation Time" type="datetime-local" {...field} className="border-1 border-black" />
                           </FormControl>
                           <FormMessage className=" text-xs" />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="duration"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-md text-orange-400 font-bold">Duration (In Hours)</FormLabel>
                           <FormControl>
                              <Input placeholder="Duration..." type="number"  {...field} className="border-1 border-black" />
                           </FormControl>
                           <FormMessage className=" text-xs" />
                        </FormItem>
                     )}
                  />
               </div>
               {btnloading ? <Button type="submit" className="w-full bg-orange-400 mt-8 hover:bg-orange-400/80 h-12 space-x-2" disabled><Loader2Icon className="animate-spin" />Book Now</Button> : <Button type="submit" className="w-full bg-orange-400 mt-8 hover:bg-orange-400/80 h-12">Book Now</Button>}
            </form>
         </Form>

         <Dialog open={dialogOpen} onOpenChange={() => { setDialogOpen((value) => !value); navigate("/my-reservations"); scrollTo({ behavior: "smooth", top: 0 }) }}>
            <DialogContent className="font-[Rubik] ">
               <DialogHeader>
                  <DialogTitle className="font-[Satoshi] text-2xl text-green-600"><span className="font-extrabold">Table #{table.tableNumber}</span>  Reserved Successfully</DialogTitle>
                  <DialogDescription>
                     We’ve saved your spot — see you soon!
                  </DialogDescription>
               </DialogHeader>
               <div className="px-5 pt-3 pb-5 bg-amber-100 rounded-xl">
                  <h1 className="mb-3 mt-2 font-extrabold text-xl text-orange-400 font-[Satoshi]">Your Reservation Details: </h1>
                  {[
                     {
                        id: 1,
                        title: "Restaurant Name",
                        value: restaurant?.name
                     },
                     {
                        id: 2,
                        title: "Location",
                        value: restaurant?.location
                     },
                     {
                        id: 6,
                        title: "Table Number",
                        value: table.tableNumber
                     },
                     {
                        id: 7,
                        title: "Seats",
                        value: table.seats
                     },
                     {
                        id: 3,
                        title: "Reserved Date",
                        value: reservationDateTime.toLocaleDateString()
                     },
                     {
                        id: 4,
                        title: "Reserved Time",
                        value: reservationDateTime.toLocaleTimeString('en-US', {
                           hour: '2-digit',
                           minute: '2-digit',
                           hour12: true,
                        })
                     },
                     {
                        id: 5,
                        title: "Duration",
                        value: `${reservedDuration} Hour${reservedDuration > 1 ? "s" : ""}`
                     },

                  ].map(({ id, title, value }) => <p key={id} className="grid grid-cols-5"><span className="col-span-2 font-medium ">{title}</span> <span className="col-span-3">{value}</span> </p>)
                  }
                  {mailSent ? <p className="text-sm text-orange-500 mt-6 flex items-center gap-2 font-semibold"><MailCheck />A COPY HAS BEEN SENT TO YOUR REGISTERED MAIL.</p> : null}
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
