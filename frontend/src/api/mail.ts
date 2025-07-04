import axios from "axios"

type mailDetailsType = {
   tableNumber: number,
   seats: number,
   restaurantName: string | undefined,
   restaurantLocation: string | undefined,
   reservationDate: string,
   reservationTime: string,
   reservationDuration: number
}

function sendMail(values: mailDetailsType) {
   return axios.post("http://localhost:3000/mail", values, {withCredentials: true})
}

export { sendMail }