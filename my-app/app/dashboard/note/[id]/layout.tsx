import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col mt-14 mb-10 px-4 min-h-screen items-center justify-start">
      {children}
    </div>
  );
};

export default Layout;
