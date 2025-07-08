import OwnerTableWithChairs from "./OwnerTablewithChairs"

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


export default function OwnerTables({ tables }: { tables: tableType[] | undefined }) {

   return (
      <div>
         <p className="text-xl font-medium mb-3">Click on a table to manage its reservations.</p>

         <div className="bg-orange-100 border-2 border-orange-400 rounded-md min-h-100 grid grid-cols-3 items-center place-items-center-safe gap-y-10 gap-x-4 p-10">
            {tables?.map((table) => {
               function getData() {
                  let confirmed = 0;
                  let pending = 0;
                  let cancelled = 0;
                  let old = 0;

                  const reservations = table.reservationHistory

                  reservations.forEach(({reservationTime, status}) => {
                     const reservationDateTime = new Date(reservationTime)
                     const timeToday = new Date()

                     if(reservationDateTime > timeToday){
                        if(status == "PENDING"){
                           pending++;
                        }
                        else if(status == "CANCELLED"){
                           cancelled++;
                        }
                        else if(status == "CONFIRMED"){
                           confirmed++;
                        }
                     }
                     else {
                        old++;
                     }
                  })

                  return [pending, confirmed, cancelled, old]
               }

               const [pending, confirmed, cancelled, old] = getData()

               return (
                  <div className="flex items-center gap-2 border-1 border-gray-600 rounded-2xl w-full py-8" key={table.id}>
                     <OwnerTableWithChairs big={false} key={table.id} table={table} />
                     <div className="bg-white p-6 rounded-xl">
                        <p className="text-orange-400 font-extrabold text-md font-[Satoshi]">New Reservations </p>
                        <div className="text-sm">
                           <p className="grid grid-cols-2 gap-3"><span className="font-semibold">Pending</span> {pending}</p>
                           <p className=" grid grid-cols-2 gap-3"><span className="font-semibold">Confirmed</span> {confirmed}</p>
                           <p className=" grid grid-cols-2 gap-3"><span className="font-semibold">Cancelled</span> {cancelled}</p>
                        </div>

                        <p className="mt-3 text-gray-500 text-sm">Old Reservations - {old}</p>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
