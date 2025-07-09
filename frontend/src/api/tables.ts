import { AxiosError } from "axios"
import axios from '../config/axios'
import { toast } from "sonner"

async function patchTable(id : string, data: {seats: number, isAvailable: boolean}){
   return axios.patch(`/api/tables/${id}`, data, {withCredentials: true})
}

async function deleteTable(id: string){
   return axios.delete(`/api/tables/${id}`, {withCredentials: true})
}

async function addTable(restaurantID: string | undefined, data: {seats: number, isAvailable: boolean, tableNumber: number}){
   return axios.post(`/api/restaurants/${restaurantID}/tables`, data, {withCredentials: true})
}

const handleCreateTableErrors = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.response) {
         console.log("error when adding a table, response received: ", error.response.data.msg)
         toast.error("Something Went Wrong", { description: error.response.data.msg })
      }
      else if (error.request) {
         console.log("error when adding a table, request was sent but no response", error.request)
         toast.error("Something Went Wrong", { description: "Please try again." })
      }
      else {
         console.log("error when adding a table, request didn't setup: ", error)
         toast.error("Something Went Wrong", { description: "Please try again." })
      }
   }

   else {
      console.log("Unexpected error when adding a table: ", error)
      toast.error("Something Went Wrong.", { description: "Please try again Later." })
   }
}

export {patchTable, deleteTable, handleCreateTableErrors, addTable}