import React from "react";

const Loading = () => {
  return (
    <div className="w-full my-24 px-4  min-h-screen flex items-center justify-center">
      <section className=" w-full gap-3 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {[...Array(12)].map((_, i) => {
          return (
            <div
              className=" rounded-lg h-[300px] bg-gray-200 text-transparent dark:bg-dark-btn animate-pulse"
              key={i}
            >
              .
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Loading;
