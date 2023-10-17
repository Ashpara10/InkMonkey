"use client";
import Dashboard from "@/components/dashboard";
import { getNotes } from "@/lib/actions";
import { Note } from "@/lib/types";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useQuery } from "react-query";

const Page = () => {
  const { data } = useQuery("notes", getNotes);
  return <Dashboard notes={data as Note[]} />;
};

export default Page;
