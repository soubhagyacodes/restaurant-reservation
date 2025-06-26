import { Link } from "react-router";
import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";


export default function SignUp() {
  return <>
    <div className='flex min-h-screen'>
      <div className='flex-3 min-h-screen flex flex-col'>
        <div className='heading'>
          <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 m-6'>plated.</p>
        </div>

        <div className='flex-1 flex flex-col justify-center items-center'>
          <div>
            <AuthForm name={"Sign up"} desc={"Sign up to enjoy the features of plated."} Form={SignUpForm}/>
            <p className="text-center font-[Rubik] text-sm mt-7">Already have an account? <Link to="/login"><span className="text-blue-600 underline cursor-pointer">Sign in</span></Link></p>
          </div>
        </div>

      </div>

      <div className='flex-4 min-h-screen p-2'>
        <div className='bg-purple-300 h-full rounded-4xl'></div>
      </div>
    </div>
  </>
  
}
