import { useState, type Dispatch, type SetStateAction } from "react"
import { Button } from "./ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import SettingsRow from "./SettingsRow"
import { Circle, Loader2 } from "lucide-react"
import { addTable, handleCreateTableErrors } from "@/api/tables"
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
   isAvailable: z.string({ message: "It must be defined" }),
   tableNumber: z.string()
}).refine((data) => {
   const seatsNumber = Number(data.seats)

   return Number.isInteger(seatsNumber) && parseInt(data.seats) >= 1
}, { message: "Seats must be an integer and greater than 1", path: ["seats"] })
   .refine((data) => {
      const Numbertable = Number(data.tableNumber)

      return Number.isInteger(Numbertable) && parseInt(data.tableNumber) > 0
   }, { message: "Table number must be an integer greater than 0", path: ["tableNumber"] })
   .refine((data) => {
      return data.isAvailable == "available" || data.isAvailable == "notAvailable"
   }, { message: "This field must be defined", path: ["isAvailable"] })






export default function TableSettings({ tables, restaurantID, setGlobalTables }: { tables: tableType[] | undefined, restaurantID: string | undefined, setGlobalTables: Dispatch<SetStateAction<tableType[] | undefined>>}) {
   const [varTables, setTables] = useState<tableType[] | undefined>(tables)
   const [addTableDialog, setAddTableDialog] = useState(false)
   const [loading, setLoading] = useState(false)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         isAvailable: "",
         seats: "",
         tableNumber: ""
      }
   })

   async function addTableHandler(values: z.infer<typeof formSchema>) {
      setLoading(true)
      const data = {
         seats: parseInt(values.seats),
         isAvailable: values.isAvailable == "available" ? true : false,
         tableNumber: parseInt(values.tableNumber)
      }

      try {
         const response = await addTable(restaurantID, data)
         setTables([...(varTables ?? []), response.data])
         setGlobalTables([...(varTables ?? []), response.data])
         toast.success("Table Added Successfully")
         setAddTableDialog(false)
      } catch (error) {
         console.log(error)
         handleCreateTableErrors(error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <>
         <div>
            {tables?.length == 0 ?
               <div className="flex flex-col items-center justify-center h-50 text-xl gap-3">
                  No Tables in this restaurant yet.
                  <Button className="bg-orange-400 hover:bg-orange-400/80" onClick={() => { setAddTableDialog(true) }}>+ Add a Table</Button>
               </div>
               :
               <>
                  <Button className="mb-6 bg-orange-400 hover:bg-orange-400/80" onClick={() => { setAddTableDialog(true) }}>+ Add a Table</Button>
                  <div className="space-y-1">
                     {varTables?.map((table) => {
                        return <SettingsRow 
                        table={table} 
                        key={table.id} 
                        onDelete={(id: string) => {
                           setTables((prev) => prev?.filter((table) => table.id != id));
                           setGlobalTables((prev) => prev?.filter((table) => table.id != id))
                        }}
                        onDetailChange={(id, isAvailable, seats) => {
                           setGlobalTables((prev) => {
                              const updated = prev?.map((table) => {
                                 if(table.id == id){
                                    return {...table, isAvailable, seats}
                                 }

                                 return table
                              })

                              return updated
                           })
                        }}
                        />
                     })}
                  </div>
               </>
            }
         </div>


         <Dialog open={addTableDialog} onOpenChange={setAddTableDialog}>
            <DialogContent className="font-[Satoshi]">
               <DialogHeader>
                  <DialogTitle className="text-2xl">Add a Table</DialogTitle>
                  <DialogDescription>
                     Fill all the details here and press the add button to add the table.
                  </DialogDescription>
               </DialogHeader>
               <div className="mt-1">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(addTableHandler)} className="space-y-5">
                        <FormField
                           control={form.control}
                           name="tableNumber"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="font-bold">Table Number</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Table Number..." className="border-2" type="number" {...field} />
                                 </FormControl>
                                 <FormDescription className="font-medium text-xs">
                                    Enter the table number of your new table.
                                 </FormDescription>
                                 <FormMessage className="text-sm" />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="seats"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="font-bold">Seats</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Seats..." className="border-2" type="number" {...field} />
                                 </FormControl>
                                 <FormDescription className="font-medium text-xs">
                                    Enter the number of seats in your new table.
                                 </FormDescription>
                                 <FormMessage className="text-sm" />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="isAvailable"
                           render={({ field }) => (
                              <FormItem className="">
                                 <FormLabel className="font-bold">Availability</FormLabel>
                                 <FormControl>
                                    <Select {...field} value={field.value} onValueChange={field.onChange}>
                                       <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Availability" className="text-red-400" />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="available" className=""><Circle className="text-green-400 fill-green-400" />Available</SelectItem>
                                          <SelectItem value="notAvailable" className=""><Circle className="text-red-400 fill-red-400" />Not Available</SelectItem>
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormDescription className="font-medium text-xs">
                                    Specify the availability of your table for now.
                                 </FormDescription>
                                 <FormMessage className="" />
                              </FormItem>
                           )}
                        />
                        <div className="flex justify-end gap-3">
                           <DialogClose asChild><Button variant={"outline"}>Close</Button></DialogClose>
                           {loading ? <Button className="bg-orange-400 hover:bg-orange-400/80" disabled><Loader2 className="animate-spin" />Add Table</Button> : <Button className="bg-orange-400 hover:bg-orange-400/80" type="submit">Add Table</Button>}
                        </div>
                     </form>
                  </Form>
               </div>

            </DialogContent>
         </Dialog>
      </>
   )
}
