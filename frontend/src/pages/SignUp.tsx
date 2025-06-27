import { Link } from "react-router";
import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";


export default function SignUp() {
  return <>
    <div className='flex'>
      <div className='flex-3 min-h-screen flex flex-col'>
        <div className='heading sticky top-0 left-0 bg-white'>
          <p className='LOGO text-4xl font-[Satoshi] font-extrabold text-orange-400 m-6 select-none'>plated.</p>
        </div>

        <div className='flex-1 flex flex-col justify-center items-center mt-20'>
          <div>
            <AuthForm name={"Sign up"} desc={"Sign up to enjoy the features of plated."} Form={SignUpForm}/>
            <p className="text-center font-[Rubik] text-sm my-7">Already have an account? <Link to="/login"><span className="text-blue-600 underline cursor-pointer">Sign in</span></Link></p>
          </div>
        </div>

      </div>

      <div className='flex-4 p-1 sticky top-0 h-screen'>
        <div className='bg-[radial-gradient(ellipse_at_center,_#fcd34d,_#fb7185,_#a855f7)] opacity-95 rounded-4xl h-full'></div>
      </div>
    </div>
  </>
  
}
