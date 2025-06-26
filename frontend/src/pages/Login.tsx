import AuthForm from "../components/AuthForm";
import SignInForm from "../components/SignInForm";
import { Link } from "react-router";



export default function Login() {
  return <>
    <div className='flex min-h-screen'>
      <div className='flex-3 min-h-screen flex flex-col'>
        <div className='heading'>
          <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 m-6 select-none'>plated.</p>
        </div>

        <div className='flex-1 flex flex-col justify-center items-center'>
          <div>
            <AuthForm name={"Sign in"} desc={"Please login to continue to your account."} Form={SignInForm}/>
            <p className="text-center font-[Rubik] text-sm mt-7">Need an account? <Link to="/signup"><span className="text-blue-600 underline cursor-pointer">Create one</span></Link></p>
          </div>
        </div>

      </div>

      <div className='flex-4 min-h-screen p-2'>
        <div className='bg-purple-300 h-full rounded-4xl'></div>
      </div>
    </div>
  </>
  
}
