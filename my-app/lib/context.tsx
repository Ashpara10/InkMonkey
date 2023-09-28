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
  setSelectedNotes: Dispatch<SetStateAction<Note[]>>;
  selectedNotes: Note[] | null;
}>({
  open: false,
  setOpen: () => null,
  selectedNotes: null,
  setSelectedNotes: () => null,
});
export default NavContext;

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Note[]>([]);
  return (
    <NavContext.Provider
      value={{
        open: show,
        setOpen: setShow,
        selectedNotes: selected,
        setSelectedNotes: setSelected,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
