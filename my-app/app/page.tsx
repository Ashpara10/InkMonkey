"use client";

import React, { FC, useEffect, useState } from "react";

const Page: FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <section className="max-w-4xl w-full flex flex-col gap-3 items-center justify-center">
        <h2 className="w-full  text-5xl text-center font-bold">
          <span className="text-blue-600  ">Simple & Minimal </span> Note
          <br className="hidden md:flex" /> taking and Management tool
        </h2>
        <p className="text-xl max-w-sm text-gray-700 dark:text-gray-300">
          Open Source Management Tool created using Nextjs Golang and Vercel
        </p>
      </section>
    </div>
  );
};
export default Page;
