import useAuth from "@/hooks/useAuth"

export default function CustomerProfile() {
   const {user} = useAuth()
   return (
      <div className="md:p-15 pt-16 px-4 pb-10 font-[Satoshi] md:space-y-18 space-y-10">
         <div className="md:space-y-3">
            <h1 className="md:text-6xl text-4xl font-extrabold">{user?.name}</h1>
            <p className="md:text-2xl text-xl">{user?.email}</p>
         </div>

         <div className="">
            <p className="md:text-4xl text-3xl font-bold">Details</p>
            <div className="mt-5 md:text-xl text-lg md:space-y-0 space-y-3">
               {[
                  {
                     id: 1,
                     title: "Role",
                     value: "Customer"
                  },
                  {
                     id: 2,
                     title: "Customer id",
                     value: user?.id
                  },
               ].map(({id, title, value}) => <div className="grid-cols-12 md:grid flex flex-col" key={id}><span className="col-span-2 font-bold">{title}</span><span className="col-span-10">{value}</span></div>)}
            </div>
         </div>
      </div>
   )
}
