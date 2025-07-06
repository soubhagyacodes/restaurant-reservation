import { useParams } from "react-router"

export default function OwnerSingleRestaurant() {
   const {id} = useParams()
   return (
      <div>
         {id}
      </div>
   )
}
