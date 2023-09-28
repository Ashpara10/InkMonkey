"use client";
import AuthForm from "@/components/form";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [type, setType] = useState<"login" | "register">();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full hidden md:flex overflow-hidden h-screen ">
        <Image
          alt=""
          src={"/login2.jpg"}
          width={1000}
          height={1000}
          className="aspect-square"
        />
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
