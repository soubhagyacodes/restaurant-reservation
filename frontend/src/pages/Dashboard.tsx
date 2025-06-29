import useAuth from "@/hooks/useAuth"

export default function Dashboard() {
    const {user} = useAuth()

    return (
        <div>
            { JSON.stringify(user) }
        </div>
    )
}
