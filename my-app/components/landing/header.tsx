"use client";
import React from "react";
import Logo from "../logo";
import { ChevronRight, LayoutGrid, LogOut, Power } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

const LandingHeader = () => {
  const router = useRouter();
  const token = getCookie("token");

  return (
    <header className="w-full flex items-center justify-center">
      <nav className=" top-0 z-30  w-full flex items-center justify-between  px-4 py-2 dark:bg-dark ">
        <div className="flex items-center justify-center">
          <Logo />
          <span className="mx-4 hidden lg:flex text-xl ">NoteMonkey</span>
        </div>
        <div className="flex items-center justify-center text-black dark:text-white">
          {token ? (
            <>
              <button
                className=" rounded-full flex items-center justify-center px-6 py-2  gap-x-2  "
                onClick={() => router.push("/dashboard")}
              >
                <LayoutGrid />
                Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="rounded-3xl text-lg gap-x-2 flex items-center justify-center px-6 py-2   "
            >
              Signup
              <ChevronRight />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;
