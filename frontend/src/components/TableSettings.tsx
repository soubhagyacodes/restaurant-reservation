import SettingsRow from "./SettingsRow"
import { Button } from "./ui/button"

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
         _count: {reservations: number}
         id: string,
         name: string,
         email: string
      }
   }[]
}

export default function TableSettings({tables} : {tables: tableType[] | undefined}) {
   return (
      <div>
         {tables?.length == 0 ? 
         <div className="flex flex-col items-center justify-center h-50 text-xl">
            No Tables in this restaurant yet.
         </div> 
         : 
         <>
         <Button className="mb-6 bg-orange-400 hover:bg-orange-400/80">+ Add a Table</Button>
         <div className="space-y-1">
            {tables?.map((table) => {
               return <SettingsRow table={table} key={table.id}/>
            })}
         </div>
         </>
      }
      </div>
   )
}
