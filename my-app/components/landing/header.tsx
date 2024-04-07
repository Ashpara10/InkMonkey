"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { Variants, motion, useAnimation } from "framer-motion";
import Image from "next/image";

const mobileVariants: Variants = {
  init: { translateY: -400, opacity: 0, transition: { duration: 0.5 } },
  visible: { translateY: 0, opacity: 1 },
};

const LandingHeader = () => {
  const router = useRouter();
  const token = getCookie("token");
  const [open, setOpen] = useState(false);
  const controls = useAnimation();

  const handleLogout = async () => {
    deleteCookie("user");
    deleteCookie("token");
    window.location.reload();
  };

  useEffect(() => {
    if (open) controls.start("visible");
    else controls.start("init");
  }, [open]);

  return (
    <header className="w-full flex items-center justify-center">
      <nav className="md:hidden  top-0 z-10 fixed w-full flex items-center justify-end  px-4 py-3  ">
        <button onClick={() => setOpen(!open)}>
          <Menu className=" " />
        </button>
        {open && (
          <motion.div
            onClick={() => setOpen(false)}
            className="w-full h-screen fixed top-0 bottom-0 right-0 left-0 bg-black/30 z-20"
          />
        )}

        <motion.div
          variants={mobileVariants}
          initial={"init"}
          animate={controls}
          transition={{ type: "keyframes", duration: 0.35 }}
          className="h-[300px] fixed top-14 right-2 z-30 min-w-[250px] rounded-3xl bg-gray-50 px-4 border-gray-300/70 dark:bg-dark border dark:border-dark-btn flex flex-col items-center justify-between"
        >
          <ul className="w-full flex flex-col gap-y-2 items-center justify-start font-medium  my-6">
            <li className="w-full">Home</li>
            <li className="w-full">About</li>
            <li className="w-full">Pricing</li>
            <li className="w-full">Dashboard</li>
          </ul>
          <button
            onClick={handleLogout}
            className=" text-white py-3 rounded-full flex items-center justify-center mb-3 w-full font-medium dark:text-black dark:bg-white bg-black mx-3"
          >
            Logout
          </button>
        </motion.div>
      </nav>
      <nav className="hidden top-0 z-30 fixed w-full md:flex items-center justify-end  px-4 py-3 bg-transparent ">
        {/* <div className="overflow-hidden">
          <Image src={"/log.svg"} width={50} height={50} alt="" className="" />
        </div> */}
        <div className="flex items-center justify-center text-black dark:text-white">
          {token ? (
            <>
              <button
                className="font-medium opacity-90 hover:underline underline-offset-4 flex mx-3 gap-3   items-center justify-center 
                "
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="font-medium dark:bg-white px-5 py-3 dark:text-black text-white bg-black rounded-full flex mx-3 gap-3   items-center justify-center 
                "
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="rounded-3xl dark:bg-dark border border-gray-200 dark:border-dark-btn  gap-x-1 flex items-center justify-center px-4 py-1.5   "
            >
              Signup
              <ChevronRight className="opacity-80 p-0.5" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;
