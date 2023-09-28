"use client";
import React from "react";
import { motion } from "framer-motion";
import useUser from "@/lib/useUser";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Sidebar = ({ open }: { open: boolean }) => {
  const userId = getCookie("user");
  const { data, loading } = useUser(userId as string);
  const router = useRouter();
  return (
    <motion.aside
      className="border-r dark:bg-dark z-10 absolute md:sticky top-0 dark:border-dark-btn overflow-hidden flex items-start justify-center  h-screen"
      initial={{
        width: 0,
      }}
      animate={{
        width: Number(open && 280),
        transition: {
          delay: 0.03,
          type: "easeInOut",
        },
      }}
      exit={{
        opacity: Number(!open && 0.3),
        transition: {
          delay: 0.5,
        },
      }}
    >
      <div className=" flex h-screen flex-col items-center justify-between  w-full p-4">
        <div className="flex gap-x-3 items-center justify-between">
          <div className="flex flex-col items-center justify-start">
            <span className="text-left w-full text-lg font-bold">
              {data?.Username}
            </span>
            <span className="text-sm opacity-80">{data?.Email}</span>
          </div>
        </div>
        <button
          onClick={async () => {
            deleteCookie("user");
            deleteCookie("token");
            router.refresh();
          }}
        >
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
