import { getTableReservations } from "@/api/reservations"
import TableReservationGrid from "@/components/TableReservationGrid"
import { Loader2, RockingChair } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

type table = {
   id: string,
   tableNumber: number,
   seats: number,
   isAvailable: boolean,
   ofRestaurant: {name: string}
}

type reservations = {
   id: string,
   reservationTime: string,
   duration: number,
   status: string,
   reservationBy: {
      _count: {
         reservations: number
      },
      email: string,
      name: string,
      id: string
   }
}[]

export default function OwnerSingleTable() {
   const { id } = useParams()
   const [reservations, setReservations] = useState<reservations>()
   const [table, setTable] = useState<table>()
   const [faultyFetch, setFaultyFetch] = useState(false)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      getTableReservations(id)
         .then((response) => {
            setReservations(response.data.reservations)
            setTable(response.data.table)
         })
         .catch((error) => {
            console.log("error while retrieving the reservations of the table for the owner", error)
            setFaultyFetch(true)
         })
         .finally(() => {
            setLoading(false)
         })
   })

   return (
      <div className="min-h-150 font-[Rubik]">
         {loading ? (
            <div className="h-150 flex items-center justify-center gap-2 text-xl">
               <Loader2 className="animate-spin" /> Loading...
            </div>
         ) : faultyFetch ? (
            <div className="h-150 flex items-center justify-center gap-2 text-2xl">
               Something Went Wrong. Please Refresh or try again later.
            </div>
         ) :
            <div className="p-15">
               <h1 className="text-7xl font-[Satoshi] font-extrabold">Table #{table?.tableNumber}</h1>
               {table?.isAvailable ? <p className="text-green-500 font-bold text-3xl mt-2">Available</p> : <p className="text-red-500 font-bold text-3xl mt-2">Not In Service Currently</p>}
               <div className="text-xl mt-3 space-y-1 mb-7">
                  <p>from <span className="font-semibold">{table?.ofRestaurant.name}</span></p>
                  <p className="flex gap-1"><RockingChair />{table?.seats} Seats</p>
               </div>
               
               <TableReservationGrid reservations = {reservations}/>
            </div>
         }
      </div>
   )
}
