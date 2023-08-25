"use client";
import NoteItem from "@/components/note-item";
import { HandleCreateNote, getNotes } from "@/lib/actions";
import { Note } from "@/lib/types";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { VscListUnordered, VscNewFile, VscTable } from "react-icons/vsc";
import { HiViewGrid } from "react-icons/hi";
import { toast } from "react-hot-toast";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Page = () => {
  const user = Number(getCookie("user"));
  const token = String(getCookie("token"));
  const [view, setView] = useState<"grid" | "list">("grid");
  const [data, setData] = useState<Note[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const skeletonarr = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    const getNotesById = async () => {
      setLoading(true);
      const { notes } = await getNotes(user, token);
      await delay(2000);
      setData(notes);
      setLoading(false);
    };
    getNotesById();
  }, []);

  return (
    <div className="w-full mt-10 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl mb-4 w-full gap-3 flex  items-center justify-between">
        <input
          placeholder="Create Note Title..."
          className="w-[80%] focus-visible:outline-none rounded-lg border px-3 py-2 dark:border-dark-btn dark:bg-[#282828]"
        />
        <button
          onClick={async () => {
            const { data, status } = await HandleCreateNote({
              Title: "Hello World",
              Content: "",
              Tags: "Test",
            });
            status && toast.success("Note successfully created");
            console.log(data, status);
          }}
          className="px-3 py-2 w-[20%]  gap-x-2 flex items-center justify-center rounded-lg dark:bg-white dark:text-black"
        >
          <VscNewFile className="text-lg font-bold" />
          Add Note
        </button>
      </div>
      <section
        className={`max-w-3xl gap-3 w-full flex flex-col md:grid grid-cols-2 
         items-center justify-center`}
      >
        {loading
          ? skeletonarr?.map((e) => {
              return (
                <div
                  key={e}
                  className="w-full rounded-lg h-36 dark:bg-dark-btn animate-pulse"
                />
              );
            })
          : data?.map((n: Note) => {
              return <NoteItem key={n?.ID} note={n} />;
            })}
      </section>
    </div>
  );
};

export default Page;
