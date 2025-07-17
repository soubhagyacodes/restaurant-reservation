import axiosInstance from '@/config/axios'
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

export default function OwnerNav() {
    const { user } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        const id = toast.loading("Logging out...")
        try {
            await axiosInstance.get("/logout")
            navigate("/login")
            toast.dismiss(id)
        } catch (error) {
            console.log("error while logging out: ", error)
            toast.error("Something Went Wrong", { description: "Please try logging out after some time.", id })
        }

    }

    return (
        <div className="bg-white h-24 flex items-center justify-between border-b-1 border-gray-200 shadow-sm font-[Rubik]">
            <div className="px-7">
                <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
            </div>

            <div className="mt-2 ml-auto mr-10 whitespace-nowrap flex gap-7 items-center">
                <div>
                    <p className="text-sm">Welcome</p>
                    <p className="font-medium break-words">{user?.name}</p>
                </div>

                <Button className='flex gap-1 h-fit cursor-pointer text-orange-400 border-2 border-orange-400 bg-white hover:bg-orange-400/80 hover:border-orange-400/60 hover:text-white text-sm' onClick={handleLogout}><LogOut className='self-start size-5' />Logout</Button>

            </div>
        </div>
    )
}
