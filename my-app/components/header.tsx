"use client";
import React, { useContext, useEffect, useState } from "react";
import Logo from "./logo";
import { Menu, Moon, Sun, Trash, Trash2, XIcon } from "lucide-react";
import NavContext from "@/lib/context";
import { useTheme } from "next-themes";

const Header = () => {
  const { open, setOpen, selectedNotes } = useContext(NavContext);
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log(selectedNotes);
  }, [selectedNotes]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="w-full static z-10 top-0 border-b px-4 py-1.5 bg-white dark:bg-dark dark:border-dark-btn flex items-center justify-between">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex gap-x-4 items-center justify-between">
        <div className="px-3">
          {selectedNotes?.length !== 0 && (
            <button className=" flex items-center justify-center gap-x-2  dark:bg-dark-btn rounded-md px-3 py-2">
              <Trash /> Delete ({selectedNotes?.length})
            </button>
          )}
        </div>
        <button
          className={` p-2 rounded-xl  ${
            theme === "light"
              ? "bg-purple-500 text-white"
              : "bg-orange-200 text-black"
          }`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {mounted && theme === "dark" ? <Sun /> : <Moon />}
        </button>
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
