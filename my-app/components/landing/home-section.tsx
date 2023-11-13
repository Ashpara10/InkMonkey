import { ArrowRight, ChevronRight, Github, Twitter } from "lucide-react";
import React from "react";
import Balancer from "react-wrap-balancer";

const HomeSection = () => {
  return (
    <section className="max-w-4xl px-4  w-full mt-16 flex flex-col gap-3 items-center justify-start">
      <span className="rounded-3xl flex items-center justify-center gap-x-2 px-5 py-2 mb-2 borde dark:border-noner border-gray-300 dark:bg-dark-btn bg-gray-200 ">
        <Twitter className="text-lg font-bold" /> Follow along on twitter
      </span>
      <h2 className="  text-3xl sm:text-3xl lg:text-6xl  text-center font-bold">
        <Balancer ratio={0.75}>
          Modern & Minimal <br className="hidden md:flex" />
          Note taking and productivity tool 🐵✏️
        </Balancer>
      </h2>
      <p className="sm:text-xl opacity-80 text-center ">
        <Balancer>
          The minimal note-taking app for focused thinking and rapid insights.
        </Balancer>
      </p>
      <div className="w-full px-8 mt-2 flex items-center justify-center">
        <button className="px-6 py-3 md:text-lg mx-4 rounded-3xl flex items-center justify-center  gap-x-2   bg-indigo-700  text-white">
          Get Started <ChevronRight className=" font-bold " />
        </button>
        <button className="px-6 hidden  md:flex py-3 md:text-lg mx-4 rounded-3xl    items-center justify-center gap-x-2 bg-black text-white dark:text-black dark:bg-white">
          {" "}
          Github
          <Github className=" font-bold" />
        </button>
      </div>
    </section>
  );
};

export default HomeSection;
