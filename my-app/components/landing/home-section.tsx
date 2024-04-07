import { ArrowRight, ChevronRight, Github, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import Balancer from "react-wrap-balancer";

const HomeSection = () => {
  return (
    <section className="max-w-4xl px-4  w-full mt-16 flex flex-col gap-3 items-center justify-start">
      <div className="absolute inset-0  -z-50 h-full w-full opacity-100 dark:opacity-10    bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <Image
        src={"/log.svg"}
        width={60}
        height={60}
        sizes=""
        alt=""
        className="aspect-square  mb-4"
      />

      <Balancer
        as={"h2"}
        className="  text-4xl md:text-6xl leading-tight lg:text-7xl tracking-tight text-center font-semibold"
      >
        Modern & Seamless <br /> approach to note taking
      </Balancer>

      {/* <p className="md:text-xl leading-tight  max-w-lg mt-2 opacity-80 text-center ">
        <Balancer>
          Capture ideas seamlessly, organize with ease, and access your notes
          anytime, anywhere.
        </Balancer>
      </p> */}
      {/*
      <div className="w-full flex items-center justify-center">
        <button className=" w-fit px-3 py-2 md:px-6 md:py-3  mx-4 rounded-2xl flex items-center justify-center border dark:border-dark-btn dark:bg-white gap-x-1  bg-black text-white dark:text-black font-medium">
          Get Started <ChevronRight className=" font-bold " />
        </button>

        <button className="px-6 flex py-3 mx-4 rounded-2xl    items-center justify-center gap-x-1 border  border-gray-300 dark:border-dark-btn dark:bg-dark  dark:text-white bg-gray-200  ">
          {" "}
          Github
          <Github className=" font-bold" />
        </button>
      </div> */}
    </section>
  );
};

export default HomeSection;
