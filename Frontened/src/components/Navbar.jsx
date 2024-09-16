
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    (<nav className="flex items-center justify-between py-4 px-16 bg-gray-900 text-white">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          // Invert the logo color if it's originally dark
          className="mr-2 invert" />
        {/* <span className="text-xl font-bold">YourLogo</span> */}
      </div>
    <Link to="/login"><Button  variant="outline" className="text-slate-600 border-white hover:bg-slate-300">Login</Button></Link>
    </nav>)
  );
}