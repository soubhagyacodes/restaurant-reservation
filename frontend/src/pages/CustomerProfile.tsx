import useAuth from "@/hooks/useAuth"

export default function CustomerProfile() {
   const {user} = useAuth()
   return (
      <div className="min-h-110 p-15 font-[Satoshi] space-y-18">
         <div className="space-y-3">
            <h1 className="text-6xl font-extrabold">{user?.name}</h1>
            <p className="text-2xl">{user?.email}</p>
         </div>

         <div className="">
            <p className="text-4xl font-bold">Details</p>
            <div className="mt-5 text-xl">
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
               ].map(({id, title, value}) => <div className="grid-cols-12 grid" key={id}><span className="col-span-2 font-bold">{title}</span><span className="col-span-10">{value}</span></div>)}
            </div>
         </div>
      </div>
   )
}
