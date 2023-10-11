"use client";
import React from "react";
import Logo from "../logo";
import { ArrowRight, LayoutGrid, LogOut, Power } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

const LandingHeader = () => {
  const router = useRouter();
  const token = getCookie("token");

  return (
    <header className="w-full flex items-center justify-center">
      <nav className=" top-0 bg-gray-100 z-30  w-full flex items-center justify-between  px-4 py-2 dark:bg-dark ">
        <Logo />
        <div className="flex items-center justify-center text-black dark:text-white">
          {token ? (
            <>
              <button
                className="  flex items-center justify-center px-6 py-2  gap-x-2  "
                onClick={() => router.push("/dashboard")}
              >
                <LayoutGrid /> Dashboard
              </button>
              <button
                className="rounded-3xl  flex items-center justify-center px-6 py-2  gap-x-2 bg-gray-300 dark:bg-dark-btn "
                onClick={() => {
                  deleteCookie("user");
                  deleteCookie("token");
                  router.refresh();
                }}
              >
                Logout
                <LogOut />
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="rounded-3xl text-lg text-white flex items-center justify-center px-6 py-2   bg-[#7b03cc] "
            >
              Signup
              <ArrowRight />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;
