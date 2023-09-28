"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Note } from "./types";

const NavContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedNotes: Note[] | null;
}>({
  open: false,
  setOpen: () => null,
  selectedNotes: null,
});
export default NavContext;

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  let selectedArr: Note[] = [];
  return (
    <NavContext.Provider
      value={{
        open: show,
        setOpen: setShow,
        selectedNotes: selectedArr,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
