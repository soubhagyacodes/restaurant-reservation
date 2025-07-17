import  { AxiosError } from "axios";
import axios from '../config/axios'
import { useEffect, useState } from "react"
import type { JSX } from "react/jsx-runtime";
import AuthContext from "./Authcontext";
import { toast } from "sonner";

type User = { 
    name: string, 
    email: string, 
    role: string, 
    id: string 
}

export default function AuthProvider({ children }: { children: JSX.Element }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        axios.get("/api/auth/me", { withCredentials: true })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                if(error instanceof AxiosError){
                    if(error.response){
                        console.log("Unauthorized User, Login First: ", error)
                    }
                    else if(error.request){
                        toast.error("Something went wrong", {description: "Try Again Later."})
                        console.log("Error while fetching the user details from the server (server didn't respond): ", error)
                    }
                    else{
                        console.log("Error while setting up the request for fetching the user details: ", error)
                    }
                }
                else{
                    console.log("Something went wrong when finding the user details: ", error)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <AuthContext.Provider value={ {user, setUser, loading, setLoading} }>
            {children}
        </AuthContext.Provider>
    )
}
