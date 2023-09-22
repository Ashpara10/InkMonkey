"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { NoteContextProvider } from "./note-context";
import { ContextProviders } from "./context";

const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <ContextProviders>
        <NoteContextProvider>{children}</NoteContextProvider>
      </ContextProviders>
    </ThemeProvider>
  );
};

export default Theme;
