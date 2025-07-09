import axios from '../config/axios'

type mailDetailsType = {
   tableNumber: number,
   seats: number,
   restaurantName: string | undefined,
   restaurantLocation: string | undefined,
   reservationDate: string,
   reservationTime: string,
   reservationDuration: number,
   username: string | undefined
}

function sendMail(values: mailDetailsType) {
   return axios.post("/mail", values, {withCredentials: true})
}

export { sendMail }