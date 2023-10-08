import { ArrowRight, Github, Twitter } from "lucide-react";
import React from "react";

const HomeSection = () => {
  return (
    <section className="max-w-4xl h-[70vh] w-full mt-16 flex flex-col gap-3 items-center justify-center">
      <span className="rounded-3xl flex items-center justify-center gap-x-2 px-4 py-2 mb-2 dark:bg-dark-btn bg-gray-200 ">
        <Twitter className="text-lg font-bold" /> Follow along on twitter
      </span>
      <h2 className="w-full  text-4xl md:text-6xl text-center font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-l  from-purple-600 via-indigo-500 to-blue-700  ">
          {" "}
          Modern & Minimal{" "}
        </span>{" "}
        Note
        <br className="hidden md:flex" /> taking and Journaling tool
      </h2>
      <p className="text-xl max-w-xl opacity-80 text-center ">
        A note taking and journaling app the that catters towards the needs of
        students
      </p>
      <div className="w-full px-8 mt-2 flex items-center justify-center">
        <button className="px-6 py-3 text-lg mx-4 rounded-3xl flex items-center justify-center  gap-x-2  bg-[#7b03cc]  ">
          Get Started{" "}
          <ArrowRight className="text-lg font-bold group-hover:visible" />
        </button>
        <button className="px-6 py-3 text-lg mx-4 rounded-3xl   flex items-center justify-center gap-x-2 dark:bg-dark-btn">
          {" "}
          Github
          <Github className="text-lg font-bold" />
        </button>
      </div>
    </section>
  );
};

export default HomeSection;
