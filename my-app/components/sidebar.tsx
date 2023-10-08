"use client";
import React from "react";
import { motion } from "framer-motion";
import useUser from "@/lib/useUser";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Home, LayoutDashboard, LayoutGrid, User } from "lucide-react";

const Sidebar = ({ open }: { open: boolean }) => {
  const userId = getCookie("user");
  const { data, loading } = useUser(userId as string);
  const router = useRouter();
  const currentPath = usePathname();

  const routes = {
    "/": {
      name: "Home",
      icon: <Home />,
    },
    "/profile": {
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
      className="border-r bg-white dark:bg-dark absolute z-20 md:sticky top-0 dark:border-dark-btn overflow-hidden flex items-start justify-center  h-screen"
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
      <ul className="w-full mt-4 px-4 flex flex-col items-center justify-start gap-y-2">
        {Object.entries(routes).map(([path, { name, icon }]) => {
          const isActive = path === currentPath;

          return (
            <li
              className={`w-full opacity-95 px-3 py-1.5 flex items-center justify-start gap-x-2 ${
                isActive && "rounded-lg  dark:bg-dark-btn bg-gray-200"
              }`}
              key={path}
              onClick={() => router.push(path)}
            >
              {icon}
              {name}
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
