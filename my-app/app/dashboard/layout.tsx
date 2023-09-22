"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NavContext from "@/lib/context";
import { useContext } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useContext(NavContext);
  return (
    <div className="flex h-screen w-full">
      <Sidebar open={open} />
      <main className="w-full flex flex-col flex-grow max-h-screen overflow-y-scroll">
        <Header />
        {children}
      </main>
    </div>
  );
}
