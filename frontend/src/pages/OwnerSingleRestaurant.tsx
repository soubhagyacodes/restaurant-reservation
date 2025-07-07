import { getOwnerRestaurant } from "@/api/ownerRestaurants"
import OwnerTables from "@/components/OwnerTables"
import RestaurantAllReservations from "@/components/RestaurantAllReservations"
import { Button } from "@/components/ui/button"
import { Bug, Edit, History, Loader, MapPin, RectangleHorizontalIcon, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

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


export default function OwnerSingleRestaurant() {
   const { id } = useParams()
   const [restaurant, setRestaurant] = useState<ownerRestaurantType>()
   const [faultyFetch, setFaultyFetch] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(true)
   const [content, setContent] = useState<string>("tables")

   useEffect(() => {
      getOwnerRestaurant(id)
         .then((response) => {
            setRestaurant(response.data)
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

   const tables = restaurant?.tables

   function getData(){
      let available = 0
      let pending = 0

      let pastReservations = 0

      tables?.forEach((table) => {
         if(table.isAvailable){
            available ++;
         }

         table.reservationHistory.forEach((reservation) => {
            if(new Date(reservation.reservationTime) > new Date() && reservation.status == "PENDING"){
               pending++;
            }
         })

         if(table._count.reservationHistory > 0){
            pastReservations += table._count.reservationHistory;
         }
      })

      const notAvailable = restaurant?._count.tables ? ((restaurant?._count.tables) - available) : 0

      return [available, notAvailable, pending, pastReservations]
   }

   const  [available, notAvailable, pending, pastReservations] = getData()
 

   return (
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
                                 value: `${restaurant?._count.tables} Tables`
                              },
                              {
                                 id: 3,
                                 icon: <History />,
                                 value: `${pastReservations}+ Past Reservations`
                              },
                           ].map(({id, icon, value}) => <p key={id} className="flex gap-1 text-xl items-center"><span>{icon}</span><span>{value}</span></p>)}
                        </div>
                     </div>
                     <div className="flex-1"></div>
                     <div className="col-span-3 flex flex-col justify-center gap-3">
                           <Button className="h-15 bg-orange-400 hover:bg-orange-400/80 text-xl"><Edit className="size-5"/>Edit Details</Button>
                           <Button className="h-15 bg-red-500 hover:bg-red-500/90 text-xl"><Trash2 className="size-5"/>Delete</Button>
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
                     </div>

                     {/* Sub-Content - Saare tabs ka content */}
                     {content == "description" ? (
                        <div className='text-gray-600'>
                           {restaurant?.description}
                        </div>
                     ) :
                        (
                           content == "tables" ? (
                           restaurant?._count.tables && restaurant?._count.tables > 0 ? (
                              <OwnerTables tables={tables}/>
                           ) :
                              (
                                 <div>
                                    No Tables in this Restaurant currently.
                                 </div>
                              )
                        ) :
                        // content is all-reservations then ----
                        (
                           <RestaurantAllReservations />
                        )
                        )
                     }
                  </div>
               </>
            ))
         }
      </div>
   )
}