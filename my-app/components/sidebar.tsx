"use client";
import React from "react";
import { motion } from "framer-motion";
const Sidebar = ({ open }: { open: boolean }) => {
  return (
    <motion.aside
      className="border-r dark:bg-dark z-10 absolute md:sticky top-0 dark:border-dark-btn overflow-hidden  h-screen"
      initial={{
        width: 0,
      }}
      animate={{
        width: Number(open && 240),
        transition: {
          delay: 0.03,
          type: "easeInOut",
        },
      }}
    >
      sidebar
      {/* <nav className="relative top-0 bottom-0 left-0"></nav> */}
    </motion.aside>
  );
};

export default Sidebar;
