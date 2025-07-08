import { getOwnerRestaurants, handleGetOwnerRestaurants } from "@/api/ownerRestaurants"
import OwnerRestaurantBox from "@/components/OwnerRestaurantBox"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"


type OwnerRestaurants = {
	id: string,
	name: string,
	location: string,
	description: string,
	ownerId: string,
	_count: {
		tables: number
	},
	tables: {
		isAvailable: true,
		reservationHistory: {
			reservationTime: string,
			status: string
		}[]
	}[]
}[]

export default function OwnerRestaurants() {
	const [restaurants, setRestaurants] = useState<OwnerRestaurants>()
	const [faultyFetch, setFaultyFetch] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getOwnerRestaurants()
			.then((response) => {
				setRestaurants(response.data)
			})
			.catch((error) => {
				setFaultyFetch(true)
				handleGetOwnerRestaurants(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<div className='min-h-150 p-15 font-[Rubik] space-y-18'>
			{
				loading ? <div className="h-110 flex items-center justify-center text-xl gap-2">
					<Loader2 className="animate-spin" /> Loading...
				</div> : (
					faultyFetch ? <div className="h-110 flex items-center justify-center text-2xl gap-2">
						Something Went Wrong. Please Refresh or try again later.
					</div> : (
						<>
							<div className="headings mt-8 space-y-2 font-[Satoshi]">
								<p className="text-center text-7xl font-extrabold">Your Restaurants</p>
								<p className="text-center font-bold text-orange-400 text-2xl">Manage all the  reservations of your restaurants in one place</p>
							</div>

							{((restaurants && restaurants?.length > 0) ? <div className="space-y-8 flex flex-col">
								<div className="self-center flex gap-5 items-center font-medium text-xl font-[Satoshi] p-7 bg-orange-100 rounded-xl">Register a New Restaurant Here: <Button className="font-extrabold bg-orange-400 w-70 h-12 text-xl hover:bg-orange-400/80 hover:gap-x-4"><span>Register a Restaurant</span> <ArrowRight className="size-5" /></Button> </div>
								<div className="space-y-7">{restaurants?.map((restaurant) => <OwnerRestaurantBox key={restaurant.id} restaurant={restaurant} onDelete={(id) => {setRestaurants((prev) => prev?.filter((restaurant) => restaurant.id != id))}}/>)}</div>
							</div>
								:
								(
									<div className="h-110 flex items-center justify-center text-2xl gap-2 m-10 bg-orange-100 rounded-xl">
										<div className="flex flex-col justify-center items-center gap-4 text-2xl font-semibold">
											No Restaurants Found. Register one now.
											<Button className="font-bold bg-orange-400 w-80 h-12 text-xl hover:bg-orange-400/80 hover:gap-x-4"><span>Register a Restaurant</span> <ArrowRight className="size-5" /></Button>
										</div>
									</div>
								)
							)}
						</>
					)
				)
			}

		</div>
	)
}
