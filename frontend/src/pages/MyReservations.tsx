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
						<div className="min-h-120 space-y-8">
							{reservations?.map((reservation) => <ReservationBox reservation={reservation}/>)}
						</div>
					)
				}
			</div>
		</div>
	)
}
