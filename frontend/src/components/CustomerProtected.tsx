import useAuth from '@/hooks/useAuth'
import { Loader2Icon } from 'lucide-react'
import { useEffect, type JSX } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function CustomerProtected({ children }: { children: JSX.Element }) {
    const navigate = useNavigate()
    const { user, loading } = useAuth()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate("/login")
                toast.error("Unauthorized Access", { description: "Login Again." })
            }

            else if (user.role !== "CUSTOMER") {
                navigate("/login")
                toast.error("Unauthorized Access", { description: "Login again as a Customer to get access." })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading])

    if (loading) {
        return <div className='text-3xl font-[Ubuntu] flex min-h-screen items-center justify-center gap-3'>
            <Loader2Icon className='animate-spin size-7' /> <p>Loading...</p>
        </div>
    }

    if (!user || user.role !== "CUSTOMER") {
        return null
    }

    return (
        <>
            {children}
        </>
    )
}
