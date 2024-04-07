"use client";
import React, { useContext, useEffect, useState } from "react";
import { Menu, Moon, Plus, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useMutation } from "react-query";
import { createNote } from "@/lib/actions";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/theme";
import { motion } from "framer-motion";
import { DrawerContext } from "@/app/dashboard/layout";
import { useRouter } from "next/navigation";

const Header = () => {
  const { open, setOpen } = useContext(DrawerContext);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { mutate, error } = useMutation(createNote, {
    onError: () => {
      toast.error(error as any);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries("notes");

      toast.success("Note successfully created");
      router.push(`/dashboard/note/${data?.ID}`);
    },
  });

  return (
    <header className="w-full flex items-center justify-center  ">
      <div className="max-w-md w-full dark:bg-dark/40  rounded-full backdrop-blur-md bg-white/40 z-50 bottom-5 fixed px-6 py-2  flex gap-x-4 items-center justify-end">
        <div className="flex items-center justify-center space-x-5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={` p-2 rounded-xl ${
                theme === "dark"
                  ? "bg-orange-200 text-black"
                  : "bg-purple-600 text-white"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="opacity-80" />
              ) : (
                <Moon className="opacity-80" />
              )}
            </button>
          )}
          <button
            onClick={async () => {
              mutate();
            }}
            className="text-lg flex items-center justify-center gap-x-2   dark:text-white/80 rounded-lg"
          >
            <Plus className="opacity-80" />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-lg  flex items-center justify-center gap-x-2 "
          >
            <Menu className="opacity-80" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
