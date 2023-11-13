"use client";
import Dashboard from "@/components/dashboard";
import { getNotes } from "@/lib/actions";
import { Note } from "@/lib/types";
import { useQuery } from "react-query";

const Page = () => {
  const { data, isLoading } = useQuery("notes", getNotes);
  return <Dashboard loading={isLoading} notes={data as Note[]} />;
};

export default Page;
