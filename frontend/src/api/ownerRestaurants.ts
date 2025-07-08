import axios, { AxiosError } from "axios"
import { toast } from "sonner"

async function getOwnerRestaurants() {
   return axios.get("http://localhost:3000/api/my-restaurants", { withCredentials: true })
}

async function deleteRestaurant(id: string | undefined){
   return axios.delete(`http://localhost:3000/api/restaurants/${id}`, {withCredentials: true})
}

async function registerRestaurant(data: {name: string, location: string, description: string}){
   return axios.post("http://localhost:3000/api/restaurants", data, {withCredentials: true})
}

async function editRestaurant(id: string, data: {name: string, location: string, description: string}){
   return axios.put(`http://localhost:3000/api/restaurants/${id}`, data, {withCredentials: true})
}

function handleGetOwnerRestaurants(error: unknown) {
   if (error instanceof AxiosError) {
      if (error.response) {
         console.log("Error while getting owner restaurants, response received: ", error.response.data.msg)
      }
      else if (error.request) {
         console.log("Error while getting owner restaurants, request was sent but no response: ", error.request)
      }
      else {
         console.log("Error while getting owner restaurants, request didn't setup: ", error)
      }
   }

   else {
      console.log("Unexpected error while getting owner restaurants: ", error)
   }
}

const handleCreateRestaurantErrors = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.response) {
         console.log("error when creating a restaurant, response received: ", error.response.data.msg)
         toast.error("Something Went Wrong", { description: error.response.data.msg })
      }
      else if (error.request) {
         console.log("error when creating a restaurant, request was sent but no response", error.request)
         toast.error("Something Went Wrong", { description: "Please try again." })
      }
      else {
         console.log("error when creating a restaurant, request didn't setup: ", error)
         toast.error("Something Went Wrong", { description: "Please try again." })
      }
   }

   else {
      console.log("Unexpected error when creating a restaurant: ", error)
      toast.error("Something Went Wrong.", { description: "Please try again Later." })
   }
}

const handleEditRestaurantErrors = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.response) {
         console.log("error when editing a restaurant, response received: ", error.response.data.msg)
         toast.error("Something Went Wrong", { description: error.response.data.msg })
      }
      else if (error.request) {
         console.log("error when editing a restaurant, request was sent but no response", error.request)
         toast.error("Something Went Wrong", { description: "Please try again." })
      }
      else {
         console.log("error when editing a restaurant, request didn't setup: ", error)
         toast.error("Something Went Wrong", { description: "Please try again." })
      }
   }

   else {
      console.log("Unexpected error when editing a restaurant: ", error)
      toast.error("Something Went Wrong.", { description: "Please try again Later." })
   }
}

function getOwnerRestaurant(id: string | undefined){
   return axios.get(`http://localhost:3000/api/owner/restaurant/${id}`, {withCredentials: true})
}

export { getOwnerRestaurants, handleGetOwnerRestaurants, getOwnerRestaurant, deleteRestaurant, registerRestaurant, handleCreateRestaurantErrors,handleEditRestaurantErrors, editRestaurant }