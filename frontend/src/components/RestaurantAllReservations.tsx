import AllReservationsRestaurantRow from "./Row-Restaurant-AllReservations"

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

export default function RestaurantAllReservations({tables} : {tables: tableType[] | undefined}) {

   function getData(){
      const reservations : {reservationID: string, tableNumber: number, seats: number, name: string, email: string, pastReservations: number, old: boolean, duration: number, status: string, date: string, time: string, reservationTime: string}[] = []
      tables?.forEach(({reservationHistory, tableNumber, seats}) => {
         reservationHistory.forEach(({id, reservationTime, duration, status, reservationBy: {name, email, _count: {reservations : pastReservations}}}) => {
            let old = false;

            if(new Date(reservationTime) < new Date()){
               old = true;
            }

            const date = new Date(reservationTime).toLocaleDateString()
            const time = new Date(reservationTime).toLocaleTimeString('en-US', {timeStyle: "short", hour12: true})

            reservations.push({reservationID: id, tableNumber, seats, name, email, pastReservations, old, duration, status, date, time, reservationTime})
         })
      })

      return reservations
   }

   const reservations = getData()

   return (
      <>
         <div className="grid grid-cols-10 py-2 bg-orange-200 font-medium text-sm">
            <p>User</p>
            <p className="col-span-2">Email</p>
            <p>Past Reservations</p>
            <p className="ml-4">Table No. (Seats)</p>
            <p className="ml-5">Date</p>
            <p>Time</p>
            <p>Duration</p>
            <p>Status</p>
            <p>Actions</p>
         </div>

         {reservations.map((reservation) => {
            return <AllReservationsRestaurantRow reservation={reservation} key={reservation.reservationID}/>
         })}
      </>
   )
}
