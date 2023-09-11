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
  const id = getCookie("user");
  const { data, loading } = useUser(id as string);

  return (
    <header
      suppressHydrationWarning
      className="w-full  dark:bg-dark sticky top-0 z-20 px-6 py-2 flex items-center justify-center"
    >
      <nav className="max-w-4xl w-full  flex items-center justify-between">
        <span className="flex items-center justify-center gap-x-2 ">
          <Logo />
          <span className="text-xl font-bold md:flex hidden">Inkmon</span>
        </span>
        <div className="flex items-center justify-center gap-x-3">
          <span>
            {loading ? (
              <div className="w-40 h-4 rounded-full dark:bg-dark-btn animate-pulse" />
            ) : (
              data?.Email
            )}
          </span>
          <button
            onClick={() => {
              if (typeof window !== "undefined" && !token) {
                router.push("/user/login");
              } else {
                deleteCookie("user");
                deleteCookie("token");
                router.refresh();
              }
            }}
            className={`px-4 flex items-center justify-center gap-x-2 py-1.5 rounded-full ${
              typeof window !== "undefined" && !token
                ? "bg-blue-700 text-white"
                : "bg-gray-300 text-black dark:bg-dark-btn dark:text-white"
            }`}
          >
            {typeof window !== "undefined" && !token ? (
              <>
                {" "}
                Signup <VscArrowRight />
              </>
            ) : (
              <>
                {" "}
                Signout <VscArrowRight />
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
