import { getUserReservations, handleGetUserReservationsErrors } from "@/api/reservations"
import ReservationBox from "@/components/ReservationBox"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"


type reservationType = {
	id: string,
	reservationTime: string,
	duration: number,
	status: string,
	tableReserved: {
		id: string,
		tableNumber: number,
		seats: number,
		ofRestaurant: {
			id: string,
			name: string,
			location: string
		}
	}
}

export default function MyReservations() {
	const [loading, setLoading] = useState<boolean>(true)
	const [faultyFetch, setFaultyFetch] = useState<boolean>(false)
	const [reservations, setReservations] = useState<reservationType[]>()

	useEffect(() => {
		getUserReservations()
			.then((response) => {
				setReservations(response.data)
			})
			.catch((error) => {
				setFaultyFetch(true)
				handleGetUserReservationsErrors(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	const newReservations = reservations?.filter((reservation) => new Date(reservation.reservationTime) > new Date())
	const oldReservations = reservations?.filter((reservation) => new Date(reservation.reservationTime) <= new Date())
	
	
	return (
		<div className="min-h-screen p-15 font-[Rubik]">
			<div className="font-[Satoshi] pt-8">
				<p className="text-7xl text-center font-extrabold">My Reservations</p>
				<p className="text-center mt-4 text-2xl font-bold text-orange-400">Your reserved tables, all in one place</p>
			</div>

			<div className="min-h-100 mt-13">
				{
					loading ? (
						<div className="h-100 flex items-center justify-center text-2xl gap-2">
							<Loader className="animate-spin"/> Loading...
						</div>
					) : faultyFetch ? (
						<div className="h-100 flex items-center justify-center text-2xl gap-2">
							Something Went Wrong, Please Refresh or Try Again Later.
						</div>
					) : (
						oldReservations?.length == 0 && newReservations?.length == 0 ? (
						<div className="h-100 flex items-center justify-center text-2xl gap-2">
							No Reservations Yet.
						</div>
						) :
						<>
						<div className={"min-h-120 space-y-8 " + (oldReservations && oldReservations?.length > 0 ? "mb-20" : "")}>
							{newReservations?.map((reservation) => <ReservationBox reservation={reservation} key={reservation.id}/>)}
						</div>
						{(oldReservations && oldReservations?.length > 0) && <div>
							<p className="mb-12 text-4xl font-[Satoshi] font-extrabold">- Old Reservations</p>
							<div className="space-y-8">{oldReservations?.map((reservation) => <ReservationBox reservation={reservation} key={reservation.id}/> )}</div>
						</div>}
						</>
					)
				}
			</div>
		</div>
	)
}
//  + (oldReservations && oldReservations?.length > 0 ? "mb-10" : "")