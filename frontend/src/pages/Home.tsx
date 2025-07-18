import LoadingPage from "@/components/LoadingPage"
import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function Home() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        if (!loading) {

            if (!user) {
                navigate("/login")
            }

            else if (user.role === "CUSTOMER") {
                navigate("/restaurants")
            }

            else if (user.role === "OWNER") {
                navigate("/ownerhome")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading])

    if (loading) return <LoadingPage />

    return null;
}
