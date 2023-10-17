"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

import { ContextProviders } from "./context";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();
const Theme = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <ContextProviders>{children}</ContextProviders>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Theme;
