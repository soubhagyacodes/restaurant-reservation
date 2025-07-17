import { getOwnerRestaurants, handleCreateRestaurantErrors, handleGetOwnerRestaurants, registerRestaurant } from "@/api/ownerRestaurants"
import OwnerRestaurantBox from "@/components/OwnerRestaurantBox"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

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

const formSchema = z.object({
	name: z.string({ message: "It must be defined" }).min(1, "Name cannot be empty").max(40, "Name can be maximum of 40 characters"),
	location: z.string({ message: "It must be defined" }).min(1, "Location cannot be empty").max(160, "Location can be maximum of 160 characters"),
	description: z.string({ message: "It must be defined" }).min(1, "Description cannot be empty").max(1000, "Description can be maximum of 1000 characters")
})

export default function OwnerRestaurants() {
	const [restaurants, setRestaurants] = useState<OwnerRestaurants>()
	const [faultyFetch, setFaultyFetch] = useState(false)
	const [loading, setLoading] = useState(true)
	const [addRestaurantDialog, setAddRestaurantDialog] = useState(false)
	const [btnloading, setbtnloading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			location: "",
			description: ""
		}
	})

	async function addRestaurantHandler(values: z.infer<typeof formSchema>) {
		setbtnloading(true)

		try {
			const response = await registerRestaurant(values)
			setRestaurants([...restaurants ?? [], response.data])
			setAddRestaurantDialog(false)
			form.reset()
		} catch (error) {
			handleCreateRestaurantErrors(error)
		} finally{
			setbtnloading(false)
		}
	}

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
		<>
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
									<div className="self-center flex gap-5 items-center font-medium text-xl font-[Satoshi] p-7 bg-orange-100 rounded-xl">Register a New Restaurant Here: <Button className="font-extrabold bg-orange-400 w-70 h-12 text-xl hover:bg-orange-400/80 hover:gap-x-4" onClick={() => { setAddRestaurantDialog(true) }}><span>Register a Restaurant</span> <ArrowRight className="size-5" /></Button> </div>
									<div className="space-y-7">{restaurants?.map((restaurant) => <OwnerRestaurantBox key={restaurant.id} restaurant={restaurant} onDelete={(id) => { setRestaurants((prev) => prev?.filter((restaurant) => restaurant.id != id)) }} />)}</div>
								</div>
									:
									(
										<div className="h-110 flex items-center justify-center text-2xl gap-2 m-10 bg-orange-100 rounded-xl">
											<div className="flex flex-col justify-center items-center gap-4 text-2xl font-semibold">
												No Restaurants Found. Register one now.
												<Button className="font-bold bg-orange-400 w-80 h-12 text-xl hover:bg-orange-400/80 hover:gap-x-4" onClick={() => setAddRestaurantDialog(true)}><span>Register a Restaurant</span> <ArrowRight className="size-5" /></Button>
											</div>
										</div>
									)
								)}
							</>
						)
					)
				}

			</div>

			<Dialog open={addRestaurantDialog} onOpenChange={setAddRestaurantDialog}>
				<DialogContent className="font-[Satoshi] !max-w-none w-200 max-h-screen">
					<DialogHeader>
						<DialogTitle className="text-2xl">Register a Restaurant</DialogTitle>
						<DialogDescription>
							Fill all the details here and press the add button to add the restaurant.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-1">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(addRestaurantHandler)} className="space-y-5">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-bold">Name of the Restaurant</FormLabel>
											<FormControl>
												<Input placeholder="Name..." className="border-2" {...field} defaultValue={""}/>
											</FormControl>
											<FormDescription className="font-medium text-xs">
												Enter the name of your new restaurant.
											</FormDescription>
											<FormMessage className="text-sm" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-bold">Location</FormLabel>
											<FormControl>
												<Input placeholder="Location..." className="border-2" {...field} defaultValue={""}/>
											</FormControl>
											<FormDescription className="font-medium text-xs">
												Enter the location of your restaurant.
											</FormDescription>
											<FormMessage className="text-sm" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel className="font-bold">Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Tell us a little bit about the restaurant"
													className="resize-none"
													{...field}
													defaultValue={""}
												/>
											</FormControl>
											<FormDescription className="font-medium text-xs">
												Enter some lines about your restaurant.
											</FormDescription>
											<FormMessage className="" />
										</FormItem>
									)}
								/>
								<p className="text-black text-sm mt-8 font-medium">*You can add tables to this restaurant by going to the table settings of this restaurant, once created.</p>
								<div className="flex justify-end gap-3">
									<DialogClose asChild><Button variant={"outline"}>Close</Button></DialogClose>
									{btnloading ? <Button className="bg-orange-400 hover:bg-orange-400/80" disabled><Loader2 className="animate-spin" />Add Restaurant</Button> : <Button className="bg-orange-400 hover:bg-orange-400/80" type="submit">Add Restaurant</Button>}
								</div>
							</form>
						</Form>
					</div>
					

				</DialogContent>
			</Dialog>
		</>
	)
}
