"use client";
import { Leaf } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center p-2.5 rounded-2xl bg-indigo-700">
      <Leaf className="text-white text-bold text-xl" />
    </div>
  );
};

export default Logo;
