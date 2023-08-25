import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
