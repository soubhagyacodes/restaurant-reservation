import useAuth from '@/hooks/useAuth'

export default function OwnerNav() {
    const {user} = useAuth()

  return (
       <div className="bg-white h-24 flex items-center justify-between border-b-1 border-gray-200 shadow-sm font-[Rubik]">
            <div className="px-7">
                <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
            </div>

            <div className="mt-2 ml-auto mr-10 whitespace-nowrap">
                <p className="text-sm">Welcome</p>
                <p className="font-medium">{user?.name}</p>
            </div>
        </div>
  )
}
