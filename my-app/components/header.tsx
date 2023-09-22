"use client";
import React, { useContext } from "react";
import Logo from "./logo";
import { Menu, XIcon } from "lucide-react";
import NavContext from "@/lib/context";

const Header = () => {
  const { open, setOpen } = useContext(NavContext);
  return (
    <header className="w-full static top-0 border-b px-4 py-1.5 dark:border-dark-btn flex items-center justify-between">
      <div className="flex items-center justify-center">
        <Logo />
        {/* <span className="text-xl font-bold">Inkmon</span> */}
      </div>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`p-1.5 delay-75 border dark:border-dark-btn rounded-lg ${
            open && "dark:bg-dark-btn"
          }`}
        >
          {open ? <XIcon /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
