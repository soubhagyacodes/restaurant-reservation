import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function Home() {
    const {user, loading} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        if(loading) return

        if(!user){
            navigate("/login")
        }

        else if(user.role === "CUSTOMER"){
            navigate("/dashboard")
        }

        else if(user.role === "OWNER"){
            console.log("reached here")
            navigate("/ownerhome")
        }
    }, [user, loading])

  return (
    <div>
        
    </div>
  )
}
