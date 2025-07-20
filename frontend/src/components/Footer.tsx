import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router";

const linkedinLink = "https://www.linkedin.com/in/soubhagya2005/"
const githubLink = "https://github.com/soubhagyacodes"
const instagramLink = "https://www.instagram.com/soubhagya_0613/"

export default function Footer() {
  return (
    <>
      <div className="md:h-90 bg-orange-100 space-y-10 pt-10 pb-4 md:pb-0 px-4 md:p-15 md:grid md:grid-cols-12 text-gray-600/90 font-[Rubik]">
        <div className="md:col-span-7">
          <p className='LOGO md:text-5xl text-4xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
          <p className="mt-3 md:mt-4 text-md md:text-xl font-medium">For the ones who serve and the ones who savor.</p>
          <div className="flex items-center md:mt-9 mt-5 gap-3">
            <a href={linkedinLink} target="_blank"><Linkedin className="text-black/60 md:size-8 hover:fill-black hover:cursor-pointer" /></a>
            <a href={instagramLink} target="_blank">
              <Instagram className="text-black/60 md:size-8 hover:fill-pink-200 hover:cursor-pointer" />
            </a>
            <a href={githubLink} target="_blank">
              <Github className="text-black/60 md:size-8 hover:fill-black hover:cursor-pointer" />
            </a>
          </div>
          <p className="mt-7 hidden md:block">© Copyright. 2025</p>
        </div>
        <div className="md:col-span-5 h-full md:px-10 grid grid-cols-2 gap-5">
          <div>
            <h1 className="text-orange-400 font-medium md:text-xl mb-2">Site-Map</h1>
            <ul className="flex flex-col gap-1 text-sm md:text-base">
              <Link to="/restaurants" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <li className="hover:underline-offset-2 hover:underline inline">Restaurants</li>
              </Link>
              <Link to="/my-reservations" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <li className="hover:underline-offset-2 hover:underline inline">My Reservations</li>
              </Link>
              <Link to="/cust-profile" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <li className="hover:underline-offset-2 hover:underline inline">Profile</li>
              </Link>
            </ul>
          </div>
          <div>
            <h1 className="text-orange-400 font-medium md:text-xl mb-2">Creator's Socials</h1>
            <ul className="flex flex-col gap-1 text-sm md:text-base">
              <a href={githubLink} target="_blank">
                <li className="hover:underline-offset-2 hover:underline inline">Github</li>
              </a>
              <a href={linkedinLink} target="_blank">
                <li className="hover:underline-offset-2 hover:underline inline">Linkedin</li>
              </a>
              <a href={instagramLink} target="_blank">
                <li className="hover:underline-offset-2 hover:underline inline">Instagram</li>
              </a>
            </ul>
          </div>
        </div>
        <p className="mt-7 md:hidden text-sm">© Copyright. 2025</p>

      </div>
      <div className="bg-amber-500 h-11 flex items-center justify-center font-[Satoshi] font-medium gap-3 text-white">
        <p className="font-bold md:text-xl">Made by Soubhagya</p>
        <a href={githubLink} target="_blank">
          <Github className="text-white size-6 hover:fill-white hover:cursor-pointer" />
        </a>
        <a href={linkedinLink} target="_blank">
          <Linkedin className="text-white size-6 hover:fill-white hover:cursor-pointer" />
        </a>
      </div>
    </>
  )
}
