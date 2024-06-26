import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const MockupSection = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <section className=" md:min-h-screen mt-10 px-4 md:p-0 w-full flex items-center justify-center flex-col">
      <div className="w-full flex items-center justify-center">
        <div className=" bg-white w-fit dark:bg-dark  flex items-center justify-center border rounded-lg border-gray-300 dark:border-dark-btn">
          <span
            onClick={() => setTheme("light")}
            className={`rounded-l-lg ${
              theme === "light" && "bg-gray-200 dark:bg-dark-btn"
            } p-2 border-r  border-gray-300 dark:border-dark-btn`}
          >
            <Sun />
          </span>
          <span
            onClick={() => setTheme("dark")}
            className={`rounded-r-lg ${
              theme === "dark" && "bg-gray-200 dark:bg-dark-btn"
            } p-2`}
          >
            <Moon />
          </span>
        </div>
      </div>
      <Image
        width={1200}
        height={1000}
        alt=""
        src={theme === "dark" ? "/app3.png" : "/app4.png"}
        className="mx-3 shadow  border-8 md:border-[10px] mt-8 md:max-w-4xl max-w-xl w-full border-black rounded-3xl  mb-10"
      />
    </section>
  );
};

export default MockupSection;
