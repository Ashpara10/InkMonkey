"use client";

import { ArrowRight, Github } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { VscGithub, VscTwitter } from "react-icons/vsc";

const Page: FC = () => {
  return (
    <div className="w-full bg-gradient-to-tr   min-h-screen flex flex-col items-center justify-center ">
      <section className="max-w-4xl w-full  flex flex-col gap-3 items-center justify-center">
        <span className="rounded-3xl flex items-center justify-center gap-x-2 px-4 py-2 mb-2 dark:bg-dark-btn">
          <VscTwitter className="text-lg font-bold" /> Follow along on twitter
        </span>
        <h2 className="w-full  text-4xl md:text-6xl text-center font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-l  from-purple-600 via-indigo-500 to-blue-700  ">
            {" "}
            Modern & Minimal{" "}
          </span>{" "}
          Note
          <br className="hidden md:flex" /> taking and Management tool
        </h2>
        <p className="text-xl max-w-xl opacity-80 text-center ">
          A note taking and journaling app the that catters towards the needs of
          students
        </p>
        <div className="w-full px-8 mt-2 flex items-center justify-center">
          <button className="px-6 py-3 text-lg mx-4 rounded-3xl flex items-center justify-center  gap-x-2  bg-gradient-to-l from-purple-600 via-indigo-500 to-blue-500  ">
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
      <div
        className="w-full px-4 flex items-center justify-center "
        style={{ background: "url('/waves.svg') " }}
      >
        <video
          src="/app.mp4"
          // controls
          className="border-8 md:border-[12px] mt-8 md:max-w-4xl w-full dark:border-black rounded-3xl  mb-10"
        />
      </div>
    </div>
  );
};
export default Page;
