"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const NavContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({ open: false, setOpen: () => null });
export default NavContext;

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <NavContext.Provider value={{ open: show, setOpen: setShow }}>
      {children}
    </NavContext.Provider>
  );
};
