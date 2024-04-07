"use client";
import basepath from "@/lib/path";
import { User } from "@/lib/types";
import { setCookie } from "cookies-next";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    Username: "",
    Email: "",
    Password: "",
  });
  return (
    <div className="flex flex-col mx-4 items-center rounded-xl justify-center max-w-lg w-full">
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white shadow-md" }}
        position="bottom-center"
      />
      <div className="w-full  flex items-center justify-center mt-10 mb-4">
        <span className="w-full text-center text-5xl  font-bold">
          {type === "register" ? "Signup" : "Login"}
        </span>
      </div>
      <form
        className=" w-full px-6  pt-4 flex flex-col  items-center justify-center"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          const res = await fetch(
            `${
              type === "register" ? "/api/auth/register" : `${basepath}/login`
            }`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body:
                type === "register"
                  ? JSON.stringify({
                      username: user?.Username,
                      email: user?.Email,
                      password: user?.Password,
                    })
                  : JSON.stringify({
                      email: user?.Email,
                      password: user?.Password,
                    }),
            }
          );
          const data = await res.json();
          if (!data?.token) {
            setIsLoading(false);
            toast.error(data?.error);
            return;
          }
          console.log(data);
          setCookie("token", data?.token);
          setCookie("user", data?.user?.ID);
          setIsLoading(false);
          toast.success(
            `${
              type === "login"
                ? "SignedIn successfully"
                : "User successfully created"
            }`
          );
          router.push("/dashboard");
        }}
      >
        {type === "register" && (
          <>
            <label
              className="w-full px-0.5 text-left mt-3 mb-1 font-medium"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              className="form-input"
              name="Username"
              type="text"
              value={user?.Username}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          </>
        )}
        <label
          className="w-full px-0.5 text-left mt-3 mb-1 font-medium"
          htmlFor="email"
        >
          Email Address
        </label>

        <input
          id="email"
          className="form-input"
          name="Email"
          type="email"
          value={user?.Email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <label
          className="w-full px-0.5 mt-3 mb-1 text-left font-medium"
          htmlFor="password"
        >
          Password
        </label>

        <input
          id="password"
          className="form-input"
          name="Password"
          type="password"
          value={user?.Password}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <button
          className="bg-indigo-600 mt-3 text-lg text-white w-full rounded-lg px-2.5 py-2"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <Loader2Icon className="w-full text-lg font-bold text-center animate-spin " />
          ) : type === "register" ? (
            "Register "
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
