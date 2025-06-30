import useAuth from '@/hooks/useAuth'
import { Link, useLocation } from 'react-router'

export default function CustomerNav() {
    const {user} = useAuth()
    const {pathname} = useLocation()

  return (
       <div className=" h-24 grid grid-cols-3 items-center border-b-1 border-gray-200 shadow-sm font-[Rubik]">
            <div className="px-7">
                <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
            </div>

            <div className="flex items-center mt-2 gap-10 justify-center h-full">
                <Link to={"/restaurants"} className={"select-none font-medium text-gray-400 hover:text-orange-300 h-full items-center flex" + (pathname=="/restaurants"  ? " text-orange-400 underline-offset-20 underline hover:text-orange-400" : "")}>Restaurants</Link>
                <Link to={"/my-reservations"} className={"select-none font-medium text-gray-400 hover:text-orange-300 h-full items-center flex" + (pathname=="/my-reservations"  ? " text-orange-400 underline-offset-20 underline hover:text-orange-400" : "")}>My Reservations</Link>
                <Link to={"/cust-profile"} className={"select-none font-medium text-gray-400 hover:text-orange-300 h-full items-center flex" + (pathname=="/cust-profile"  ? " text-orange-400 underline-offset-20 underline hover:text-orange-400" : "")}>My Profile</Link>
            </div>

            <div className="mt-2 ml-auto mr-10 whitespace-nowrap">
                <p className="text-sm">Welcome</p>
                <p className="font-medium">{user?.name}</p>
            </div>
        </div>
  )
}
