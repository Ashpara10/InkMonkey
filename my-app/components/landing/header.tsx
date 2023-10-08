import React from "react";
import Logo from "../logo";
import { ArrowRight } from "lucide-react";

const LandingHeader = () => {
  return (
    <header className="w-full flex items-center justify-center">
      <nav className=" top-0 bg-gray-100 z-30  w-full flex items-center justify-between  px-4 py-2 dark:bg-dark ">
        <Logo />
        <div>
          <button className="rounded-3xl text-lg text-white flex items-center justify-center px-6 py-2 bg-gradient-to-l via-purple-600  bg-[#7b03cc] to-blue-500">
            Signup
            <ArrowRight />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;
