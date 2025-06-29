import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import type { JSX } from "react/jsx-runtime";
import AuthContext from "./Authcontext";

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
        axios.get("http://localhost:3000/api/auth/me", { withCredentials: true })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                if(error instanceof AxiosError){
                    if(error.response){
                        console.log("Unauthorized User: ", error)
                    }
                    else if(error.request){
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
