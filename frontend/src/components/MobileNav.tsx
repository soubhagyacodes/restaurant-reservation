import clsx from "clsx";
import { Calendar1, HomeIcon, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export default function MobileNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="h-21 border-t-gray-400/50 border-1 fixed bottom-0 select-none w-full md:hidden shadow-2xl bg-white grid grid-cols-3 px-1 items-center place-items-center gap-x-2">
      {[
        {
          id: 1,
          icon: <HomeIcon />,
          title: "Restaurants",
          navigation: "/restaurants"
        },
        {
          id: 2,
          icon: <Calendar1 />,
          title: "My Reservations",
          navigation: "/my-reservations"
        },
        {
          id: 3,
          icon: <User />,
          title: "Profile",
          navigation: "/cust-profile"
        },
      ].map(({id, icon, title, navigation}) => <div className={clsx("flex flex-col justify-center items-center gap-[1px]", pathname.startsWith(navigation) ? "text-orange-400" : "text-gray-500")} key={id} onClick={() => {navigate(navigation); scrollTo({ behavior: "smooth", top: 0 })}}>
        <div>{icon}</div>
        <p className={clsx("text-center text-sm", pathname.startsWith(navigation) ? "font-bold" : "font-semibold" )}>{title}</p>
      </div>)}
    </div>
  )
}
