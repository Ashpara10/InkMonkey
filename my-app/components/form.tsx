"use client";
import { User } from "@/lib/types";
import { setCookie } from "cookies-next";
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
    <div className="flex flex-col  items-center shadow-lg shadow-stone-500 dark:shadow-[#151515] rounded-xl justify-center max-w-sm w-full">
      <Toaster position="top-center" />
      <div className="w-full  flex items-center justify-center mt-10 mb-4">
        <span className="w-full text-center text-4xl  font-bold">
          {type === "register" ? "Signup" : "Login"}
        </span>
      </div>
      <form
        className=" w-full px-6 pb-8 pt-4 flex flex-col gap-y-4 items-center justify-center"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          const res = await fetch(
            `/api/auth/${type === "register" ? "register" : "login"}`,
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
          if (res.ok) {
            const { data, token } = await res.json();
            console.log(data);
            setCookie("token", token);
            setCookie("user", data?.ID);
            setIsLoading(false);
            toast.success(
              `${
                type === "login"
                  ? "SignedIn successfully"
                  : "User successfully created"
              }`
            );
            router.push("/dashboard");
          } else {
            const { status } = await res.json();
            !status && toast.error(`Error: Login with correct credentials`);
            console.log({ form: status });
          }
        }}
      >
        {type === "register" && (
          <input
            placeholder="Create Username"
            className="form-input"
            name="Username"
            type="text"
            value={user?.Username}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
          />
        )}
        <input
          placeholder="Jhondoe@gmail.com"
          className="form-input"
          name="Email"
          type="email"
          value={user?.Email}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <input
          placeholder="***********"
          className="form-input"
          name="Password"
          type="password"
          value={user?.Password}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <button
          className="bg-blue-700 text-white w-full rounded-lg px-2.5 py-2"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <VscLoading className="w-full text-xl font-bold text-center animate-spin " />
          ) : type === "register" ? (
            "Register Account"
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
