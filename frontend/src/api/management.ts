import axios from "axios"

async function assignStatus(id: string, status : string){
   return axios.patch(`http://localhost:3000/api/reservations/${id}`, {status}, {withCredentials: true})
}


export {assignStatus}