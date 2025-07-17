import useAuth from '@/hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import axiosInstance from '@/config/axios'
import { toast } from 'sonner'

export default function CustomerNav() {
    const { user } = useAuth()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    async function handleLogout() {
        const id = toast.loading("Logging out...")
        try {
            await axiosInstance.get("/logout")
            navigate("/login")
            toast.dismiss(id)
        } catch (error) {
            console.log("error while logging out: ", error)
            toast.error("Something Went Wrong", {description: "Please try logging out after some time.", id})
        }
        
    }

    return (
        <div className="sticky top-0 z-50 bg-white h-24 grid grid-cols-3 items-center border-b-1 border-gray-200 shadow-sm font-[Rubik]">
            <div className="px-7">
                <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
            </div>

            <div className="flex items-center mt-2 gap-10 justify-center h-full">
                <Link to={"/restaurants"} className={"select-none font-medium text-gray-400 hover:text-orange-300 h-full items-center flex" + (pathname.startsWith("/restaurants") ? " text-orange-400 underline-offset-20 underline hover:text-orange-400" : "")} onClick={() => { scrollTo({ behavior: "smooth", top: 0 }) }}>Restaurants</Link>
                <Link to={"/my-reservations"} className={"select-none font-medium text-gray-400 hover:text-orange-300 h-full items-center flex" + (pathname.startsWith("/my-reservations") ? " text-orange-400 underline-offset-20 underline hover:text-orange-400" : "")} onClick={() => { scrollTo({ behavior: "smooth", top: 0 }) }}>My Reservations</Link>
                <Link to={"/cust-profile"} className={"select-none font-medium text-gray-400 hover:text-orange-300 h-full items-center flex" + (pathname.startsWith("/cust-profile") ? " text-orange-400 underline-offset-20 underline hover:text-orange-400" : "")} onClick={() => { scrollTo({ behavior: "smooth", top: 0 }) }}>My Profile</Link>
            </div>

            <div className="mt-2 ml-auto mr-10 whitespace-nowrap flex gap-4 items-center">
                <div>
                    <p className="text-sm">Welcome</p>
                    <p className="font-medium break-words">{user?.name}</p>
                </div>

                <Button className='flex flex-col gap-1 h-fit cursor-pointer text-orange-400 border-2 border-orange-400 bg-white hover:bg-orange-400/80 hover:border-orange-400/60 hover:text-white text-xs' onClick={handleLogout}><LogOut className='self-start size-5' />Logout</Button>

            </div>

        </div>
    )
}
