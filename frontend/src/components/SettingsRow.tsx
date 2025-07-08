import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form"

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Circle } from "lucide-react"
import { patchTable } from "@/api/tables"
import { toast } from "sonner"

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
      tabledId: string,
      reservationBy: {
         _count: { reservations: number }
         id: string,
         name: string,
         email: string
      }
   }[]
}


const formSchema = z.object({
   seats: z.string(),
   isAvailable: z.string({ message: "It must be defined" })
}).refine((data) => {
   const seatsNumber = Number(data.seats)

   return Number.isInteger(seatsNumber) && parseInt(data.seats) >= 1
}, { message: "Seats must be an integer and greater than 1", path: ["seats"] })
   .refine((data) => {
      return data.isAvailable == "available" || data.isAvailable == "notAvailable"
   }, { message: "This field must be defined", path: ["isAvailable"] })


export default function SettingsRow({ table }: { table: tableType }) {
   const [varSeats, setSeats] = useState(table.seats)
   const [varisAvailable, setIsAvailable] = useState(table.isAvailable)
   const [editMode, setEditMode] = useState(false)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         isAvailable: varisAvailable ? "available" : "notAvailable",
         seats: varSeats.toString()
      }
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setEditMode(false)

      const data = {
         seats: parseInt(values.seats),
         isAvailable: values.isAvailable == "available" ? true : false
      }

      try {
         await patchTable(table.id, data)
         setSeats(parseInt(values.seats))
         setIsAvailable(values.isAvailable == "available" ? true : false)
      } catch (error) {
         console.log("error while patching the table", error)
         toast.error("Something Went Wrong", { description: "Try updating the table later." })
      }
   }

   return (
      <>
         {!editMode &&
            <div className="grid grid-cols-12 items-center">
               <p className="text-xl">Table <span className="font-semibold">#{table.tableNumber}</span></p>
               <p className="col-span-2">{varSeats} Seats</p>
               {varisAvailable ?
                  <p className="text-green-500 font-semibold col-span-2">Available</p>
                  :
                  <p className="text-red-500 font-semibold col-span-2">Not In Service</p>
               }
               <Button className="w-fit border-1 border-orange-400 bg-white text-orange-400 hover:bg-orange-400 hover:text-white" onClick={() => { setEditMode(true) }}>Edit</Button>
            </div>
         }
         {editMode &&
            <div className="grid grid-cols-12">
               <p className="text-xl">Table <span className="font-semibold">#{table.tableNumber}</span></p>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-11 grid grid-cols-11">
                     <FormField
                        control={form.control}
                        name="seats"
                        render={({ field }) => (
                           <FormItem className="pr-7 col-span-2">
                              <FormControl>
                                 <Input placeholder="seats..." className="border-2" type="number" {...field} />
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="isAvailable"
                        render={({ field }) => (
                           <FormItem className="col-span-2">
                              <FormControl>
                                 <Select {...field} value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-fit">
                                       <SelectValue placeholder="Availability" className="text-red-400" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="available" className=""><Circle className="text-green-400 fill-green-400" />Available</SelectItem>
                                       <SelectItem value="notAvailable" className=""><Circle className="text-red-400 fill-red-400" />Not Available</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                     <Button className="inline-block w-fit bg-white border-green-400 border-1 text-green-400 hover:text-white hover:bg-green-400" type="submit">Save</Button>
                  </form>
               </Form>

            </div>}
      </>
   )
}
