import { editRestaurant, getOwnerRestaurant, handleEditRestaurantErrors } from "@/api/ownerRestaurants"
import OwnerTables from "@/components/OwnerTables"
import RestaurantAllReservations from "@/components/RestaurantAllReservations"
import TableSettings from "@/components/TableSettings"
import { Button } from "@/components/ui/button"
import { Bug, Edit, History, Loader, Loader2, MapPin, RectangleHorizontalIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"

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

type ownerRestaurantType = {
   id: string,
   name: string,
   location: string,
   description: string,
   ownerid: string,
   _count: { tables: number }
   tables: tableType[]
}

const formSchema = z.object({
   name: z.string({ message: "It must be defined" }).min(1, "Name cannot be empty").max(40, "Name can be maximum of 40 characters"),
   location: z.string({ message: "It must be defined" }).min(1, "Location cannot be empty").max(160, "Location can be maximum of 160 characters"),
   description: z.string({ message: "It must be defined" }).min(1, "Description cannot be empty").max(1000, "Description can be maximum of 1000 characters")
})


export default function OwnerSingleRestaurant() {
   const { id } = useParams()
   const [restaurant, setRestaurant] = useState<ownerRestaurantType>()
   const [faultyFetch, setFaultyFetch] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(true)
   const [content, setContent] = useState<string>("tables")
   const [tables, setTables] = useState<tableType[] | undefined>(undefined)

   const [editRestaurantDialog, setEditRestaurantDialog] = useState(false)
   const [btnloading, setbtnloading] = useState(false)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: restaurant?.name,
         location: restaurant?.location,
         description: restaurant?.description
      }
   })

   useEffect(() => {
      if (restaurant) {
         form.reset({
            name: restaurant.name,
            location: restaurant.location,
            description: restaurant.description,
         })
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [restaurant])

   async function editRestaurantHandler(values: z.infer<typeof formSchema>) {
      setbtnloading(true)

      try {
         await editRestaurant(restaurant?.id ?? "", values)
         if (restaurant) {
            setRestaurant({
               ...restaurant,
               name: values.name,
               location: values.location,
               description: values.description
            })
         }
         setEditRestaurantDialog(false)
      } catch (error) {
         handleEditRestaurantErrors(error)
      } finally {
         setbtnloading(false)
      }
   }

   useEffect(() => {
      getOwnerRestaurant(id)
         .then((response) => {
            setRestaurant(response.data)
            setTables(response.data.tables)
         })
         .catch((error) => {
            console.log("Error while fetching a restaurant at the owner's side using its id: ", error)
            setFaultyFetch(true)
         })
         .finally(() => {
            setLoading(false)
         })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   

   function getData() {
      let available = 0
      let pending = 0

      let pastReservations = 0

      tables?.forEach((table) => {
         if (table.isAvailable) {
            available++;
         }

         table.reservationHistory.forEach((reservation) => {
            if (new Date(reservation.reservationTime) > new Date() && reservation.status == "PENDING") {
               pending++;
            }
         })

         if (table._count.reservationHistory > 0) {
            pastReservations += table._count.reservationHistory;
         }
      })

      const notAvailable = tables?.length ? tables?.length - available : 0

      return [available, notAvailable, pending, pastReservations]
   }

   const [available, notAvailable, pending, pastReservations] = getData()


   return (
      <>
         <div className='min-h-150 p-15 font-[Rubik]'>
            {loading ? (
               <div className='h-120 flex items-center justify-center text-2xl font-[Satoshi] font-bold gap-2'>
                  <Loader className='animate-spin size-6' /> Loading
               </div>
            ) :
               (faultyFetch ? (
                  <div className='h-120 flex  flex-col items-center justify-center font-[Satoshi] font-bold text-2xl gap-2'>
                     <Bug className='size-10' /> Something Went Wrong. Please Refresh.
                  </div>
               ) : (
                  <>


                     <div className='grid grid-cols-12'>
                        <div className="col-span-8">
                           {pending > 0 ? <span className="bg-amber-300 inline-block p-3 rounded-t-xl text-white font-[Satoshi] font-bold text-xl mb-1"><span className="text-3xl font-extrabold mr-1">{pending}</span> New Pending Reservations</span> : <span className="bg-green-500 inline-block p-3 rounded-t-xl text-white font-[Satoshi] font-bold text-xl mb-1"><span className="text-3xl font-extrabold mr-1">{pending}</span> New Pending Reservations</span>}
                           <p className="font-[Satoshi] font-extrabold text-6xl">{restaurant?.name}</p>

                           <div className="mt-6 space-y-1">
                              {[
                                 {
                                    id: 1,
                                    icon: <MapPin />,
                                    value: restaurant?.location
                                 },
                                 {
                                    id: 2,
                                    icon: <RectangleHorizontalIcon />,
                                    value: `${tables?.length} Tables`
                                 },
                                 {
                                    id: 3,
                                    icon: <History />,
                                    value: `${pastReservations}+ Past Reservations`
                                 },
                              ].map(({ id, icon, value }) => <p key={id} className="flex gap-1 text-xl items-center"><span>{icon}</span><span>{value}</span></p>)}
                           </div>
                        </div>
                        <div className="flex-1"></div>
                        <div className="col-span-3 flex flex-col justify-center gap-3">
                           <Button className="h-15 bg-orange-400 hover:bg-orange-400/80 text-xl" onClick={() => { setEditRestaurantDialog(true) }}><Edit className="size-5" />Edit Details</Button>
                        </div>
                     </div>

                     <div className="mt-8">
                        <p className="font-semibold text-xl mb-1">Table Stats:</p>
                        <div className="flex gap-10 text-xl">
                           <p className="text-green-500 font-bold">{available} Available</p>
                           <p className="text-red-500 font-bold">{notAvailable} Not In Service</p>
                        </div>
                     </div>



                     {/* Lower Section */}
                     <div className='flex flex-col gap-12 mt-10'>
                        {/* Sub-NavBar */}
                        <div className='flex text-xl font-[Satoshi] font-bold items-center'>
                           <p className={"cursor-pointer hover:underline hover:underline-offset-14  w-32" + (content == "description" ? " font-extrabold underline underline-offset-14 text-orange-400" : "")} onClick={() => setContent("description")}>Description</p>
                           <div className='w-px h-6 bg-gray-500 mr-5'></div>
                           <p className={"cursor-pointer hover:underline hover:underline-offset-14  w-20" + (content == "tables" ? " font-extrabold underline underline-offset-14 text-orange-400" : "")} onClick={() => setContent("tables")}>Tables</p>
                           <div className='w-px h-6 bg-gray-400 mr-5'></div>
                           <p className={"cursor-pointer hover:underline hover:underline-offset-14  w-40" + (content == "all-reservations" ? " font-extrabold underline underline-offset-14 text-orange-400" : "")} onClick={() => setContent("all-reservations")}>All Reservations</p>
                           <div className='w-px h-6 bg-gray-400 mr-5'></div>
                           <p className={"cursor-pointer hover:underline hover:underline-offset-14  w-40" + (content == "table-settings" ? " font-extrabold underline underline-offset-14 text-orange-400" : "")} onClick={() => setContent("table-settings")}>Table Settings</p>
                        </div>

                        {/* Sub-Content - Saare tabs ka content */}
                        <div>
                           {content == "description" ? (
                              <div className='text-gray-600'>
                                 {restaurant?.description}
                              </div>
                           ) :
                              (
                                 content == "tables" ? (
                                    tables?.length && tables.length > 0 ? (
                                       <OwnerTables tables={tables} />
                                    ) :
                                       (
                                          <div>
                                             No Tables in this Restaurant currently.
                                          </div>
                                       )
                                 ) :
                                    (
                                       content == "table-settings" ? <TableSettings tables={tables} restaurantID={restaurant?.id} setGlobalTables={setTables}/>
                                          :
                                          // content is all-reservations, then ----
                                          <RestaurantAllReservations tables={tables} setTables={setTables}/>
                                    )
                              )
                           }
                        </div>
                     </div>
                  </>
               ))
            }
         </div>

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