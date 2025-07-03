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
import { Loader2Icon } from "lucide-react";
import { createReservation, handleCreateReservationErrors } from "@/api/reservations";


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


export default function ReservationForm({ tableId }: { tableId: string }) {
   const navigate = useNavigate()
   const [btnloading, setbtnLoading] = useState<boolean>(false)

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
      const finalObject = {
         reservationTime: new Date(reservationTime).toISOString(),
         duration: parseInt(duration),
         tableId
      }
      console.log(finalObject)
      const loadingID = toast.loading("Loading...", { description: "Please wait while we reserve your table." })
      try {
         await createReservation(finalObject)
         navigate("/my-reservations")
         scrollTo({behavior: "smooth", top:0})
         toast.success("Reservation Completed", { description: "Your requested table has been reserved.", id: loadingID })
      } catch (error) {
         handleCreateReservationErrors(error, loadingID)
      }
      finally{
         setbtnLoading(false)
      }
   }


   return (
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
            {btnloading ? <Button type="submit" className="w-full bg-orange-400 mt-8 hover:bg-orange-400/80 h-12 space-x-2" disabled><Loader2Icon className="animate-spin"/>Book Now</Button> : <Button type="submit" className="w-full bg-orange-400 mt-8 hover:bg-orange-400/80 h-12">Book Now</Button>}
         </form>
      </Form>
   )
}
