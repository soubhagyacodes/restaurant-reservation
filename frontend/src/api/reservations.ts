import { AxiosError } from "axios"
import axios from '../config/axios'
import { toast } from "sonner"

const createReservation = (values: { reservationTime: string, duration: number, tableId: string }) => {
   return axios.post("/api/reservations", values, { withCredentials: true })
}

const getUserReservations = () => {
   return axios.get("/api/reservations", {withCredentials: true})
}

const cancelReservation = (id: string) => {
   return axios.get(`/api/reservations/${id}`, {withCredentials: true})
}

const getTableReservations = (id: string | undefined) => {
   return axios.get(`/api/reservations/table/${id}`, {withCredentials: true})
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

const handleGetUserReservationsErrors = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.response) {
         console.log("Error while getting user reservations, response received: ", error.response.data.msg)
      }
      else if (error.request) {
         console.log("Error while getting user reservations, request was sent but no response: ", error.request)
      }
      else {
         console.log("Error while getting user reservations, request didn't setup: ", error)
      }
   }

   else {
      console.log("Unexpected error while getting user reservations: ", error)
   }
}


export { createReservation, handleCreateReservationErrors, getUserReservations, handleGetUserReservationsErrors,cancelReservation, getTableReservations }