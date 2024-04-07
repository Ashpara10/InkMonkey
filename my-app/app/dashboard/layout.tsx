"use client";
import NoteDrawer from "@/components/drawer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { getNotes } from "@/lib/actions";
import NavContext from "@/lib/context";
import { Note } from "@/lib/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export const DrawerContext = createContext<{
  open: boolean | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({
  open: null,
  setOpen: () => null,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { open } = useContext(NavContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <DrawerContext.Provider value={{ open, setOpen }}>
        <NoteDrawer
          open={open}
          // trigger={
          //   <button
          //     className={`p-1.5 delay-75 border rounded-lg dark:border-dark-btn  ${
          //       open && "dark:bg-dark-btn"
          //     }`}
          //   >
          //     Menu
          //   </button>
          // }
        />
        <main className="w-full flex flex-col flex-grow min-h-screen  overflow-y-scroll">
          <Header />
          {children}
        </main>
      </DrawerContext.Provider>
    </div>
  );
}
