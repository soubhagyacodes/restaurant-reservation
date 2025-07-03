import axios, { AxiosError } from "axios"
import { toast } from "sonner"

const createReservation = (values: { reservationTime: string, duration: number, tableId: string }) => {
   return axios.post("http://localhost:3000/api/reservations", values, { withCredentials: true })
}

const handleCreateReservationErrors = (error: unknown, loadingID: string | number) => {
   if (error instanceof AxiosError) {
      if (error.response) {
         console.log("Error while making a reservation, response received: ", error.response.data.msg)
         toast.error("Something Went Wrong", { description: error.response.data.msg, id: loadingID })
      }
      else if (error.request) {
         console.log("Error while making a reservation, request was sent but no response", error.request)
         toast.error("Something Went Wrong", { description: "Please try again.", id: loadingID })
      }
      else {
         console.log("Error while making a reservation, request didn't setup: ", error)
         toast.error("Something Went Wrong", { description: "Please try again.", id: loadingID })
      }
   }

   else {
      console.log("Unexpected error while reserving a table: ", error)
      toast.error("Something Went Wrong.", { description: "Please try again Later.", id: loadingID })
   }
}
export { createReservation, handleCreateReservationErrors }