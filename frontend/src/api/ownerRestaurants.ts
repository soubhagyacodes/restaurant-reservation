import axios, { AxiosError } from "axios"

async function getOwnerRestaurants() {
   return axios.get("http://localhost:3000/api/my-restaurants", { withCredentials: true })
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

export { getOwnerRestaurants, handleGetOwnerRestaurants }