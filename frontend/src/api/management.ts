import axios from '../config/axios'

async function assignStatus(id: string, status : string){
   return axios.patch(`/api/reservations/${id}`, {status}, {withCredentials: true})
}


export {assignStatus}