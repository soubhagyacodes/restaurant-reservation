import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoadingPage() {

   const [delayed, setDelayed] = useState(false);
   const timeout = 3200;

   setTimeout(() => {
      setDelayed(true);
   }, timeout);

   return (
      <div className="h-screen flex justify-center items-center gap-2">
         <div className="flex flex-col items-center">
            <div className="flex gap-1 transition duration-100 ease-in-out">
               <Loader2 size={40} className="animate-spin text-orange-400 mt-2"/> <p className='LOGO text-5xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
            </div>
            <div className={clsx("mt-8 transition-all duration-600 ease-out", delayed ? "opacity-100 translate-y-0": "opacity-0 translate-y-2")}>
               <p className="text-center">Waking up Server...</p>
               <p className="text-sm text-orange-400 font-semibold mt-1 max-w-xl text-center">
                  This project's backend is hosted on Render's free tier. <br />
                  The first request may take 5–10 seconds while the server wakes up. <br />
                  Subsequent requests will be significantly faster.
               </p>
            </div>
         </div>
      </div>
   )
}
