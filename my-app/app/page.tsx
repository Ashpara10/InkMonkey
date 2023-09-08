"use client";

import React, { FC } from "react";
import { VscGithub, VscTwitter } from "react-icons/vsc";

const Page: FC = () => {
  return (
    <div className="w-full  min-h-screen flex flex-col items-center justify-center ">
      <section className="max-w-4xl w-full  flex flex-col gap-3 items-center justify-center">
        <span className="rounded-3xl flex items-center justify-center gap-x-2 px-4 py-2 mb-2 dark:bg-dark-btn">
          <VscTwitter className="text-lg font-bold" /> Follow along on twitter
        </span>
        <h2 className="w-full  text-4xl md:text-6xl text-center font-bold">
          <span className="text-blue-600  "> Modern & Minimal </span> Note
          <br className="hidden md:flex" /> taking and Management tool
        </h2>

        <div className="w-full px-8 mt-2 flex items-center justify-center">
          <button className="p-4 text-lg mx-4 rounded-lg  dark:bg-blue-700">
            Get Started
          </button>
          <button className="p-4 text-lg mx-4 rounded-lg flex items-center justify-center gap-x-2 dark:bg-dark-btn">
            {" "}
            <VscGithub className="text-lg font-bold" /> Github
          </button>
        </div>
      </section>
    </div>
  );
};
export default Page;
