import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Bug, History, Loader, MapPin, RectangleHorizontalIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

type tableType = {
    id: string,
    tableNumber: number,
    seats: number,
    isAvailable: boolean,
    restaurantId: string,
    _count: {reservationHistory: number}
}

export type restaurantType = {
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
    _count: {tables: number}
    tables: tableType[]
}

export default function SingleRestaurant() {
   const navigate = useNavigate()
   const {id} = useParams()
   const [restaurant, setRestaurant] = useState<restaurantType | null>(null)
   const [faultyFetch, setFaultyFetch] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(true)
   const [content, setContent] = useState<string>("description")

   useEffect(() => {
      axios.get(`http://localhost:3000/api/restaurants/${id}`, {withCredentials: true})
         .then((response) => {
            setRestaurant({...response.data})
         })
         .catch((error) => {
            console.log("Error while fetching a restaurant using its id: ", error)
            setFaultyFetch(true)
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])

   function getCounts(){
      const tables = restaurant?.tables
      let reservationCount = 0
      let availableCount = 0
      tables?.forEach((table) => {
         if(table._count.reservationHistory > 0){
            reservationCount++;
         }

         if(table.isAvailable){
            availableCount++;
         }
      })

      return [reservationCount, availableCount]
   }

   const [pastreservationCount, availableCount] = getCounts()


   return (
      <div className='px-15 py-25 font-[Rubik]'>
         {loading ? (
               <div className='h-140 flex items-center justify-center text-2xl font-[Satoshi] font-bold gap-2'>
                  <Loader className='animate-spin size-6'/> Loading
               </div>
            ) :
            (faultyFetch ? (
               <div className='h-140 flex  flex-col items-center justify-center font-[Satoshi] font-bold text-2xl gap-2'>
                  <Bug className='size-10' /> Something Went Wrong. Please Refresh.
               </div>
            ) : (
               <>
               <div className='flex justify-between'>
                  <div className='flex flex-col gap-2'>
                     <p className='text-6xl font-extrabold font-[Satoshi] mb-5'>{restaurant?.name}</p>
                     <p className='flex gap-1 font-bold text-md'>{availableCount > 0 ? <span className='text-green-500'>{availableCount} Table{availableCount > 1 ? "s" : ""} Available</span> : <span className='text-red-500'>No Tables Available</span>}</p>
                     <p className='flex gap-1'><MapPin />{restaurant?.location}</p>
                     <p className='flex gap-1'><RectangleHorizontalIcon />{restaurant?._count.tables} Tables</p>
                     <p className='flex gap-1'><History />{pastreservationCount}{pastreservationCount > 0 ? "+" : ""} Past Reservations</p>
                  </div>
                  <div className='font-[Satoshi] text-xl'>
                     {restaurant?._count.tables && restaurant?._count.tables > 0 ? <Button className="cursor-pointer bg-orange-400 hover:bg-amber-500/95 w-80 h-14 text-md font-bold" onClick={() => {navigate(`/restaurants/${restaurant.id}/tables`); window.scrollTo({ top: 0, behavior: "smooth" })}}>Reserve a Table</Button> : <div className='text-orange-400 p-6 font-bold text-3xl'>Reservations Starting Soon</div>}
                  </div>
               </div>
               <div className='flex flex-col gap-12'>
                  <div className='flex mt-20 text-xl font-[Satoshi] font-bold items-center'>
                     <p className={"cursor-pointer hover:underline hover:underline-offset-14  w-32" + (content == "description" ? " font-extrabold underline underline-offset-14 text-orange-400" : "")} onClick={() => setContent("description")}>Description</p>
                     <div className='w-px h-6 bg-gray-400 mr-5'></div>
                     <p className={"cursor-pointer hover:underline hover:underline-offset-14  w-25" + (content == "availability" ? " font-extrabold underline underline-offset-14 text-orange-400" : "")} onClick={() => setContent("availability")}>Availability</p>
                  </div>
                  {content == "description" ? (
                     <div className='text-gray-600'>
                        {restaurant?.description}
                        <p className='font-medium text-xl text-black mt-8'>Owner: {restaurant?.owner.name}</p>
                     </div>
                  ) : 
                  (
                    restaurant?._count.tables && restaurant?._count.tables > 0 ? (
                      <div className='flex flex-col gap-1'>
                        {restaurant?.tables.map((table) => {
                           return (
                              <div className='grid grid-cols-6 text-md'>
                                 <div className='col-span-1 text-xl'>Table <span className='font-bold ml-1'>#{table.tableNumber}</span></div>
                                 <div className='col-span-1'>{table.isAvailable ? <span className='text-green-500 font-semibold'>Available</span> : <span className='text-red-500 font-semibold'>Reserved</span>}</div>
                              </div>
                           )
                        })}
                     </div> 
                    ) :
                    (
                     <div>
                        No Tables in this Restaurant currently.
                     </div>
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
