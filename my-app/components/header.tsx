"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import Logo from "./logo";
import useUser from "@/lib/useUser";

const Header = () => {
  const router = useRouter();
  const token = getCookie("token");
  const user = getCookie("user");
  const { data, loading } = useUser(user as string);


  return (
    <header className="w-full  dark:bg-dark sticky top-0 z-20 px-6 py-2 flex items-center justify-center">
      <nav className="max-w-4xl w-full  flex items-center justify-between">
        <span className="flex items-center justify-center gap-x-2 ">
          <Logo />
          <span className="text-xl font-bold">InkMonkey</span>
        </span>
        <div className="flex items-center justify-center gap-x-3">
          <span>
            {loading ? (
              <div className="w-40 h-4 rounded-full dark:bg-dark-btn animate-pulse" />
            ) : (
              data?.Email
            )}
          </span>
          {typeof window !== "undefined" && !token ? (
            <button
              onClick={() => router.push("/user/login")}
              className="px-3 flex items-center justify-center gap-x-2 py-1.5 rounded-full bg-blue-700 text-white"
            >
              Signup <VscArrowRight />
            </button>
          ) : (
            <button
              onClick={() => {
                deleteCookie("user");
                deleteCookie("token");
                router.refresh();
              }}
              className="px-4 flex items-center justify-center gap-x-2 py-1.5 rounded-full bg-gray-300 text-black  
              dark:bg-dark-btn dark:text-white"
            >
              Signout <VscArrowRight />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
