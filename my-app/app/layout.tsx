import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Theme from "../lib/theme";
import { Provider } from "react-wrap-balancer";
import LandingHeader from "@/components/landing/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inkmon",
  description:
    "Open source minimal note taking app created using golang and nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} min-h-screen flex flex-col w-full dark:bg-dark bg-gray-100`}
      >
        <Provider>
          {/* <LandingHeader /> */}
          <main className=" w-full  flex flex-col items-center justify-center ">
            <Theme>{children}</Theme>
          </main>
        </Provider>
      </body>
    </html>
  );
}
