"use client";
import { Note } from "@/lib/types";
import React, { useState } from "react";
import NoteItem from "./note-item";
import { createNote } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/theme";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Dashboard = ({ notes, loading }: { notes: Note[]; loading: boolean }) => {
  const router = useRouter();
  const { data, mutate, isLoading } = useMutation(createNote, {
    onSuccess: () => {
      console.log({ new: data });
      queryClient.refetchQueries("notes");
      toast.success("Note successfully created");
      router.push(`/dashboard/note/${data?.UserId}/${data?.ID}`);
    },
  });

  return (
    <div className="w-full  my-10 px-4 flex flex-col items-center justify-center">
      <div className=" w-full px-2  mb-4 flex  items-center justify-center">
        <span className="text-4xl w-full text-left font-bold">Dashboard</span>

        <button
          onClick={() => mutate()}
          className="text-lg flex items-center justify-center gap-x-2 dark:text-black dark:bg-white rounded-xl px-4 py-2"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Plus />}
          New
        </button>
      </div>
      {notes?.length === 0 && (
        <div className="w-full h-[80vh] border dark:border-dark-btn rounded-3xl flex items-center justify-center m-3">
          No notes
        </div>
      )}
      <section className=" w-full gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {loading
          ? [...Array(12)].map((_, i) => {
              return (
                <div
                  className=" rounded-lg h-[300px] bg-gray-200 text-transparent dark:bg-dark-btn animate-pulse"
                  key={i}
                />
              );
            })
          : notes
              ?.sort((a, b) => Number(b.ID) - Number(a.ID))
              ?.map((data) => {
                return <NoteItem key={data?.ID} note={data} />;
              })}
      </section>
    </div>
  );
};

export default Dashboard;
