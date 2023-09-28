"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

import { ContextProviders } from "./context";

const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <ContextProviders>{children}</ContextProviders>
    </ThemeProvider>
  );
};

export default Theme;
