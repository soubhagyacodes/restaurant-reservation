import axios from '../config/axios'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import type { restaurantType } from "./Tables"
import TableWithChairs from "@/components/TablewithChairs"
import { Loader } from "lucide-react"
import ReservationForm from "@/components/ReservationForm"


export default function SingleTable() {
	const { restaurantId, tableId } = useParams()
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

	const table = restaurant?.tables.find((table) => tableId == table.id)
	if (!table) {
		return <div className="min-h-150 text-3xl font-[Satoshi] font-medium flex items-center justify-center">
			Table Not Found.
		</div>
	}

	const { tableNumber, seats } = table

	return (
		<div className="min-h-screen font-[Rubik] p-14">
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
					<div className="grid grid-cols-12">
						<div className="col-span-5">
							<p className="text-6xl font-bold">Table #{tableNumber}</p>
							<p className="text-2xl mt-2 ml-2">from <Link to={`/restaurants/${restaurant?.id}`} onClick={() => scrollTo({ top: 0, behavior: "smooth" })} className="underline underline-offset-4">{restaurant?.name}</Link></p>
							<div>
								<TableWithChairs big={true} table={table} />
							</div>
						</div>

						<div className="bg-orange-100 col-span-7 p-10 rounded-3xl">
							<p className="text-3xl font-extrabold font-[Satoshi]">Order Overview</p>
							<div className="h-[1.5px] bg-orange-400 rounded-xl mt-4" />

							<div className="mt-8 text-xl mb-10 space-y-1">
								{[
									{
										id: 1,
										title: "Restaurant Name",
										value: restaurant?.name
									},
									{
										id: 2,
										title: "Location",
										value: restaurant?.location
									},
									{
										id: 3,
										title: "Table Number",
										value: tableNumber
									},
									{
										id: 4,
										title: "Seats",
										value: seats
									},
								].map(({ title, value, id }) => (<div className="grid grid-cols-6" key={id}>
									<p className="col-span-2"><b className="font-[Satoshi] font-bold">{title}</b></p>
									<p className="col-span-4">{value}</p>
								</div>))}
							</div>
							<p className="text-xl font-semibold font-[Satoshi] mb-4">Enter Specifications:</p>
							<ReservationForm table={table} restaurant={restaurant} />
						</div>
					</div>
				)
			)}
		</div>
	)
}
