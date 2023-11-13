"use client";
import AuthForm from "@/components/form";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [type, setType] = useState<"login" | "register">();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full bg-gray-200   hidden md:flex dark:bg-dark-btn overflow-hidden h-screen ">
        {/* <Image
          alt=""
          src={"/auth.svg"}
          width={1000}
          height={1000}
          // className="aspect-square rounded-3xl p-2"
        /> */}
      </div>
      <div className="max-w-xl w-full h-screen flex flex-col items-center justify-center">
        <AuthForm type={type === "login" ? "login" : "register"} />
        <div className="flex items-center justify-center mt-3">
          {type === "login" ? (
            <span>
              Don't have an account yet?{" "}
              <button
                onClick={() => setType("register")}
                className="text-indigo-600 hover:underline"
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?
              <button
                onClick={() => setType("login")}
                className="text-indigo-600 hover:underline"
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
