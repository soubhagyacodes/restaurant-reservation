import { Loader2 } from "lucide-react";

export default function LoadingPage() {
   return (
      <div className="h-screen flex justify-center items-center gap-2">
         <Loader2 size={40} className="animate-spin text-orange-400 mt-2"/> <p className='LOGO text-5xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
      </div>
   )
}
