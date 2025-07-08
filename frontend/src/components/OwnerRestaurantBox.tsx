import { EditIcon, Loader2, LucideRectangleHorizontal, MapPin, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { deleteRestaurant, editRestaurant, handleEditRestaurantErrors } from "@/api/ownerRestaurants"
import { toast } from "sonner"

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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "./ui/input"

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

const formSchema = z.object({
   name: z.string({ message: "It must be defined" }).min(1, "Name cannot be empty").max(40, "Name can be maximum of 40 characters"),
   location: z.string({ message: "It must be defined" }).min(1, "Location cannot be empty").max(160, "Location can be maximum of 160 characters"),
   description: z.string({ message: "It must be defined" }).min(1, "Description cannot be empty").max(1000, "Description can be maximum of 1000 characters")
})


export default function OwnerRestaurantBox({ restaurant, onDelete }: { restaurant: OwnerRestaurant, onDelete: (id: string) => void }) {
   const [deleteDialog, setDeleteDialog] = useState(false)
   const [loading, setLoading] = useState(false)
   const [editRestaurantDialog, setEditRestaurantDialog] = useState(false)
   const [btnloading, setbtnloading] = useState(false)

   const [name, setName] = useState(restaurant.name)
   const [location, setLocation] = useState(restaurant.location)
   const [description, setDescription] = useState(restaurant.description)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: name,
         location: location,
         description: description
      }
   })

   async function editRestaurantHandler(values: z.infer<typeof formSchema>){
      setbtnloading(true)

      try {
         await editRestaurant(restaurant.id, values)
         setName(values.name)
         setLocation(values.location)
         setDescription(values.description)
         setEditRestaurantDialog(false)
      } catch (error) {
         handleEditRestaurantErrors(error)
      }finally{
         setbtnloading(false)
      }
   }

   async function handleDeleteRestaurant() {
      setLoading(true)

      try {
         await deleteRestaurant(restaurant.id)
         onDelete(restaurant.id)
         setDeleteDialog(false)
      } catch (error) {
         console.log(error)
         toast.error("Something Went Wrong", { description: "Please Try Deleting Later." })
      } finally {
         setLoading(false)
      }
   }


   const getData = () => {
      let available = 0
      let pending = 0
      const tables = restaurant.tables

      tables.forEach((table) => {
         if (table.isAvailable) {
            available++;
         }

         table.reservationHistory.forEach((reservation) => {
            if (new Date(reservation.reservationTime) > new Date() && reservation.status == "PENDING") {
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
      <>
         <div className="min-h-50 border-2 p-10 border-gray-400/60 rounded-md overflow-hidden grid-cols-12 grid group hover:border-orange-300 hover:shadow-md duration-200">
            <div className="col-span-9 cursor-pointer" onClick={() => { navigate(`/ownerrestaurant/${restaurant.id}`); scrollTo({ behavior: "smooth", top: 0 }) }}>
               {pending > 0 && <span className="inline-block bg-yellow-400 text-xl p-1 px-2 rounded-t-xl text-white font-extrabold font-[Satoshi] mb-1">{pending} New Pending Reservations</span>}
               <p className="text-5xl font-[Satoshi] font-extrabold group-hover:text-orange-400 duration-200">{name}</p>
               <div className="flex gap-3 mt-3">
                  <div className="flex items-center gap-1"><MapPin /> {location}</div>
                  <div className="flex items-center gap-1"><LucideRectangleHorizontal /> {restaurant._count.tables} Tables</div>
               </div>
               <div className="mt-5">
                  <p className="font-medium">Table Stats: </p>
                  <div className="flex gap-5">
                     <p className="text-green-500 font-bold">{available} Available</p>
                     <p className="text-red-500 font-bold">{notAvailable} Not In Service</p>
                  </div>
               </div>
            </div>
            <div className="col-span-3 flex items-center justify-center">
               <div className="flex flex-col gap-3 h-full w-full justify-center">
                  <Button className="bg-orange-400/90 hover:bg-orange-400/70 text-xl h-12" onClick={() => {setEditRestaurantDialog(true)}}><EditIcon className="size-5" />Edit Details</Button>
                  <Button className="bg-red-400 hover:bg-red-400/80 h-12 text-xl" onClick={() => { setDeleteDialog(true) }}><Trash2 className="size-5" />Delete</Button>
               </div>
            </div>
         </div>

         <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
            <DialogContent className="font-[Satoshi]">
               <DialogHeader>
                  <DialogTitle className="text-xl">Are you absolutely sure to delete the restaurant <b className="text-red-500">{name}?</b></DialogTitle>
                  <DialogDescription>
                     This action cannot be undone. All the related reservations and tables of this restaurant will be permanently deleted.
                  </DialogDescription>
               </DialogHeader>
               <div className="flex justify-end gap-3">
                  <DialogClose asChild><Button variant={"outline"}>Close</Button></DialogClose>
                  {loading ? <Button className="bg-red-500 hover:bg-red-500/80" onClick={handleDeleteRestaurant} disabled><Loader2 className="animate-spin" />Delete Restaurant</Button> : <Button className="bg-red-500 hover:bg-red-500/80" onClick={handleDeleteRestaurant}>Delete Restaurant</Button>}
               </div>
            </DialogContent>
         </Dialog>

         <Dialog open={editRestaurantDialog} onOpenChange={setEditRestaurantDialog}>
            <DialogContent className="font-[Satoshi] !max-w-none w-200 max-h-screen">
               <DialogHeader>
                  <DialogTitle className="text-2xl">Edit the Restaurant Details</DialogTitle>
                  <DialogDescription>
                     Change any detail here and press the submit button to add the changes.
                  </DialogDescription>
               </DialogHeader>
               <div className="mt-1">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(editRestaurantHandler)} className="space-y-5">
                        <FormField
                           control={form.control}
                           name="name"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="font-bold">Name of the Restaurant</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Name..." className="border-2" {...field} />
                                 </FormControl>
                                 <FormDescription className="font-medium text-xs">
                                    Edit the name of your restaurant.
                                 </FormDescription>
                                 <FormMessage className="text-sm" />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="location"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="font-bold">Location</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Location..." className="border-2" {...field} />
                                 </FormControl>
                                 <FormDescription className="font-medium text-xs">
                                    Edit the location of your restaurant.
                                 </FormDescription>
                                 <FormMessage className="text-sm" />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="description"
                           render={({ field }) => (
                              <FormItem className="">
                                 <FormLabel className="font-bold">Description</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Tell us a little bit about the restaurant"
                                       className="resize-none"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormDescription className="font-medium text-xs">
                                    Edit the description of your restaurant.
                                 </FormDescription>
                                 <FormMessage className="" />
                              </FormItem>
                           )}
                        />
                        <p className="text-black text-sm mt-8 font-medium">*You can add tables to this restaurant by going to the table settings of this restaurant.</p>
                        <div className="flex justify-end gap-3">
                           <DialogClose asChild><Button variant={"outline"}>Close</Button></DialogClose>
                           {btnloading ? <Button className="bg-orange-400 hover:bg-orange-400/80" disabled><Loader2 className="animate-spin" />Submit</Button> : <Button className="bg-orange-400 hover:bg-orange-400/80" type="submit">Submit</Button>}
                        </div>
                     </form>
                  </Form>
               </div>


            </DialogContent>
         </Dialog>

      </>
   )
}
