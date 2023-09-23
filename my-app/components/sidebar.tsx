"use client";
import React from "react";
import { motion } from "framer-motion";
import useUser from "@/lib/useUser";
import { getCookie } from "cookies-next";

const Sidebar = ({ open }: { open: boolean }) => {
  const userId = getCookie("user");
  const { data, loading } = useUser(userId as string);
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
    >
      <div className=" flex items-center justify-start  w-full p-4">
        <div className="flex gap-x-3 items-center justify-between">
          <div className="w-12 h-12 rounded-full bg-white">.</div>
          <div className="flex flex-col items-center justify-start">
            <span className="text-left w-full text-lg font-bold">
              {data?.Email.split("@")[0].toUpperCase()}
            </span>
            <span className="text-sm opacity-80">{data?.Email}</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
