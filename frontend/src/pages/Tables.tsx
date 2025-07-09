import TableWithChairs from "@/components/TablewithChairs"
import axios from '../config/axios'
import { ArrowUp, Circle, History, Loader, MapPin, RectangleHorizontalIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export type tableType = {
	id: string,
	tableNumber: number,
	seats: number,
	isAvailable: boolean,
	restaurantId: string,
	_count: { reservationHistory: number }
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
	_count: { tables: number }
	tables: tableType[]
}

export default function Tables() {
	const { restaurantId } = useParams()
	const [restaurant, setRestaurant] = useState<restaurantType | null>(null)
	const [faultyFetch, setFaultyFetch] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		axios.get(`/api/restaurants/${restaurantId}`, { withCredentials: true })
			.then((response) => {
				setRestaurant({ ...response.data })
			})
			.catch((error) => {
				console.log("Error while fetching a restaurant using its id: ", error)
				setFaultyFetch(true)
			})
			.finally(() => {
				setLoading(false)
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function getCounts() {
		const tables = restaurant?.tables
		let reservationCount = 0
		let availableCount = 0
		tables?.forEach((table) => {
			if (table._count.reservationHistory > 0) {
				reservationCount = reservationCount + table._count.reservationHistory;
			}

			if (table.isAvailable) {
				availableCount++;
			}
		})

		return [reservationCount, availableCount]
	}

	const [pastreservationCount, availableCount] = getCounts()


	return (
		<div className="min-h-120 font-[Rubik] p-14">
			{loading ? (
				<div className="min-h-150 text-2xl font-[Satoshi] font-bold flex items-center justify-center gap-2">
					<Loader className="animate-spin size-8" /> Loading
				</div>
			) : (
				faultyFetch ? (
					<div className="min-h-150 text-3xl font-[Satoshi] font-medium flex items-center justify-center">
						Something Went Wrong. Please Refresh or Try Again Later.
					</div>
				) : (
					<>
						<p className="text-2xl">Select your Table from <b>{restaurant?.name}</b></p>
						{/* <div className="flex gap-3 mt-1 text-sm">
							<p className="text-green-400 flex items-center font-semibold gap-1"><Circle className="fill-green-400 text-green-400 size-3"/> Available</p>
							<p className="text-red-400 flex items-center font-semibold gap-1"><Circle className="fill-red-400 text-red-400 size-3"/> Reserved</p>
						</div> */}
						<div className="grid grid-cols-9 mt-5">
							<div className="flex flex-col justify-between col-span-6 pt-15 pb-7 bg-orange-100/70 min-h-120 border-2 border-orange-300 rounded-md shadow-xs shadow-orange-400">
								<div className="grid grid-cols-3 auto-rows-min gap-y-20 items-center place-items-center">
									{restaurant?.tables.map((table) => <TableWithChairs table={table} big={false}/>)}
								</div>

								<div className="flex items-center justify-center mt-20">
									<p className="text-center text-xl font-bold flex"><ArrowUp className="mr-5" />Entrance <ArrowUp className="ml-5" /></p>
								</div>
							</div>

							<div className="col-span-3 px-10 flex flex-col">
								<p className="text-5xl font-bold font-[Satoshi]">{restaurant?.name}</p>
								<div className="flex flex-col gap-1 mt-4">
									<p className='flex gap-1'><MapPin />{restaurant?.location}</p>
									<p className='flex gap-1'><RectangleHorizontalIcon />{restaurant?._count.tables} Tables</p>
									<p className='flex gap-1'><History />{pastreservationCount}{pastreservationCount > 0 ? "+" : ""} Past Reservations</p>
								</div>

								<div className="mt-10">
									<p className="text-[26px] font-[Satoshi] font-bold">Availability</p>
									<div className="mt-2 text-xl font-[Satoshi]">
										<p className="font-extrabold text-green-500 grid grid-cols-6"><span className="col-span-3">Available:</span> <span className="col-span-3">{availableCount}</span></p>
										<p className="font-extrabold text-red-500 grid grid-cols-6"><span className="col-span-3">Not In Service:</span> <span className="col-span-3">{restaurant?._count.tables && restaurant?._count.tables - availableCount}</span></p>
									</div>
								</div>

								<div className="flex-grow"></div>
								<div className="flex gap-8">
									<div className="flex gap-2 items-center">
										<Circle className="text-green-400 fill-green-400 size-4"/> Available
									</div>
									<div className="flex gap-2 items-center">
										<Circle className="text-red-400 fill-red-400 size-4"/> Not In Service
									</div>
								</div>
							</div>
						</div>
					</>
				)
			)
			}
		</div>
	)
}
