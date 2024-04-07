"use client";
import React from "react";
import { motion } from "framer-motion";
import useUser from "@/lib/useUser";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Home, LayoutDashboard, LayoutGrid, LogOut, User } from "lucide-react";
import Logo from "./logo";
import { Note } from "@/lib/types";
import NoteItem from "./note-item";

type NoteData = {
  notes: Note[];
  isLoading: boolean;
  error: unknown;
};

const Sidebar = ({ open, notes }: { open: boolean; notes?: NoteData }) => {
  const { data, loading } = useUser();
  console.log({ data });
  const router = useRouter();
  const currentPath = usePathname();

  const routes = {
    "/": {
      name: "Home",
      icon: <Home />,
    },
    "/dashboard/account": {
      name: "Account",
      icon: <User />,
    },
    "/dashboard": {
      name: "Dashboard",
      icon: <LayoutGrid />,
    },
  };

  return (
    <motion.aside
      className="border-r bg-gray-100 dark:bg-dark absolute z-20 md:sticky top-0 dark:border-dark-btn overflow-hidden flex flex-col items-center justify-start  h-screen"
      initial={{
        width: 0,
      }}
      animate={{
        width: Number(open && 380),
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
      <div className="w-full flex items-center justify-start p-2">
        <div className="bg-dark-btn w-10 h-10 rounded-full" />
        <span className="flex items-center justify-center text-lg ml-2">
          {loading ? "Loading..." : data?.Email}
        </span>
      </div>
      <ul className="w-full mt-4   px-4 flex flex-col items-center justify-start gap-y-2"></ul>
      <button
        className="rounded-3xl w-full  flex mb-4 px-6 py-2  gap-x-2  "
        onClick={() => {
          deleteCookie("user");
          deleteCookie("token");
          router.refresh();
        }}
      >
        <LogOut className="opacity-90" />
        Logout
      </button>
    </motion.aside>
  );
};

export default Sidebar;
