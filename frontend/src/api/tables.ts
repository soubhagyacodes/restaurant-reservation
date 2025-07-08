import axios from "axios"

async function patchTable(id : string, data: {seats: number, isAvailable: boolean}){
   return axios.patch(`http://localhost:3000/api/tables/${id}`, data, {withCredentials: true})
}

export {patchTable}