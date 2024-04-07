"use client";
import { Note } from "@/lib/types";
import React, { useState } from "react";
import NoteItem from "./note-item";

import { useRouter } from "next/navigation";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Dashboard = ({ notes, loading }: { notes: Note[]; loading: boolean }) => {
  const router = useRouter();

  return (
    <div className="w-full  my-10 px-4 flex flex-col items-center justify-center">
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
