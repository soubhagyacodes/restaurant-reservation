import useAuth from "@/hooks/useAuth"

export default function Dashboard() {
    const { user } = useAuth()
    
    if(!user) return null
    const {  id, name, email, role } = user

    return (
        <div className="p-7">
            <h5 className="text-md text-gray-500">id: {id}</h5>
            <h1 className="text-4xl font-bold">{name}</h1>
            <h2 className="text-3xl">{email}</h2>
            <h3 className="text-2xl">{role}</h3>
        </div>
    )
}