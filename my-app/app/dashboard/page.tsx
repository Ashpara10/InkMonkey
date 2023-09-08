"use client";
import NoteItem from "@/components/note-item";
import { HandleCreateNote, getNotes } from "@/lib/actions";
import { Note } from "@/lib/types";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Page = () => {
  const user = Number(getCookie("user"));
  const token = String(getCookie("token"));
  const [data, setData] = useState<Note[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const skeletonarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const router = useRouter()
  useEffect(() => {
    const getNotesById = async () => {
      setLoading(true);
      const { notes } = await getNotes(user, token);
      await delay(500);
      setData(notes);
      setLoading(false);
    };
    getNotesById();
  }, []);

  return (
    <div className="w-full my-10 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl mb-4 w-full gap-3 flex flex-col items-center justify-between">
        <h2 className="w-full text-left text-4xl font-bold">Notes</h2>
        <div className="w-full flex  items-center justify-between ">
          <span className="text-lg opacity-75">Create and Manage your notes</span>
          <button
            onClick={async () => {
              const { note, status } = await HandleCreateNote({
                Title: "BCA Maths Semester 1 Set Theory",
                Content: "",
                Tags: "Uni",
              });
              status && toast.success("Note successfully created");
              router.push(`/dashboard/note/${user}/${note?.ID}`)
              // console.log("router push")
              // console.log("toast")
            }}
            className="px-3 py-2 w-[20%]  gap-x-2 flex items-center justify-center rounded-lg dark:bg-white dark:text-black"
          >
            <VscAdd className="text-lg font-bold" />
            Add Note
          </button>
        </div>
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
