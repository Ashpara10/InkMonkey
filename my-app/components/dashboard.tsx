"use client";
import { Note } from "@/lib/types";
import React, { useState } from "react";
import NoteItem from "./note-item";
import { create_note } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Loader2Icon, Plus, PlusIcon } from "lucide-react";

const Dashboard = ({ notes }: { notes: Note[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const sortedArr = notes?.sort((a, b) => Number(b.ID) - Number(a.ID));
  return (
    <div className="w-full  my-10 px-4 flex flex-col items-center justify-center">
      <div className=" w-full px-2  mb-4 flex  items-center justify-center">
        <span className="text-4xl w-full text-left font-bold">Dashboard</span>

        <button
          onClick={async () => {
            setLoading(true);
            const { note: newNote, status } = await create_note({
              Title: "Untitled....",
              Content: "Content goes here",
              Tags: "General",
            });
            if (status) {
              setLoading(false);
              toast.success("Note successfully created");
              router.refresh();
              router.push(`/dashboard/note/${newNote?.UserId}/${newNote?.ID}`);
            }
          }}
          className="text-lg flex items-center justify-center gap-x-2 dark:text-black dark:bg-white rounded-xl px-4 py-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Plus />}
          New
        </button>
      </div>
      {sortedArr?.length === 0 ? (
        <div className="w-full h-[80vh] border dark:border-dark-btn rounded-3xl flex items-center justify-center m-3">
          No notes
        </div>
      ) : (
        <section className=" w-full gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {sortedArr?.map((data) => {
            return <NoteItem key={data?.ID} note={data} />;
          })}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
