"use client";

import LandingHeader from "@/components/landing/header";
import HomeSection from "@/components/landing/home-section";
import MockupSection from "@/components/landing/mockup-section";
import React, { FC } from "react";

const Page: FC = () => {
  return (
    <div className="w-full bg-gradient-to-tr   min-h-screen flex flex-col items-center justify-center ">
      <LandingHeader />
      <HomeSection />
      <MockupSection />
    </div>
  );
};
export default Page;
