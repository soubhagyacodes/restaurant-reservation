import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router";

const linkedinLink = "https://www.linkedin.com/in/soubhagya2005/"
const githubLink = "https://github.com/soubhagyacodes"
const instagramLink = "https://www.instagram.com/soubhagya_0613/"

export default function Footer() {
  return (
    <>
      <div className="h-90 bg-orange-100 p-15 grid grid-cols-12 text-gray-600/90 font-[Rubik]">
        <div className="col-span-7">
          <p className='LOGO text-6xl font-[Satoshi] font-extrabold text-orange-400 select-none'>plated.</p>
          <p className="mt-4 text-xl font-medium">For the ones who serve and the ones who savor.</p>
          <div className="flex items-center mt-9 gap-3">
            <a href={linkedinLink} target="_blank"><Linkedin className="text-black size-8 hover:fill-black hover:cursor-pointer" /></a>
            <a href={instagramLink} target="_blank">
              <Instagram className="text-black size-8 hover:fill-pink-200 hover:cursor-pointer" />
            </a>
            <a href={githubLink} target="_blank">
              <Github className="text-black size-8 hover:fill-black hover:cursor-pointer" />
            </a>
          </div>
          <p className="mt-7">© Copyright. 2025</p>
        </div>
        <div className="col-span-5 h-full px-10 grid grid-cols-2 gap-5">
          <div>
            <h1 className="text-orange-400 font-medium text-xl mb-2">Site-Map</h1>
            <ul className="flex flex-col gap-1">
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
            <h1 className="text-orange-400 font-medium text-xl mb-2">Creator's Socials</h1>
            <ul className="flex flex-col gap-1">
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
      </div>
      <div className="bg-amber-500 h-11 flex items-center justify-center font-[Satoshi] font-medium gap-3 text-white">
        <p className="font-bold text-xl">Made by Soubhagya</p>
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
