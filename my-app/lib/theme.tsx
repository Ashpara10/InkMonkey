"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { NoteContextProvider } from "./note-context";

const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <NoteContextProvider>{children}</NoteContextProvider>
    </ThemeProvider>
  );
};

export default Theme;
