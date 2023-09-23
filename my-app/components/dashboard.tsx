"use client";
import { Note } from "@/lib/types";
import React, { useEffect, useState } from "react";
import NoteItem from "./note-item";
import { useContext } from "react";
import NoteContext from "@/lib/note-context";
import { VscAdd, VscLoading } from "react-icons/vsc";
import { create_note } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Dashboard = ({ notes }: { notes: Note[] }) => {
  const { note, setNote } = useContext(NoteContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setNote(notes);
  }, [notes, setNote]);
  const sortedArr = note?.sort((a, b) => Number(b.ID) - Number(a.ID));
  return (
    <div className="w-full my-10 px-4 flex flex-col items-center justify-center">
      <div className=" w-full px-2  mb-4 flex flex-col items-center justify-center">
        <span className="text-4xl w-full text-left font-bold">Dashboard</span>
        <div className="w-full flex items-center justify-between">
          <span className="my-2 text-left w-full text-lg opacity-90">
            Create and manage notes...
          </span>
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
                setNote(note?.concat(newNote) as Note[]);
                router.push(
                  `/dashboard/note/${newNote?.UserId}/${newNote?.ID}`
                );
              }
            }}
            className="text-lg flex items-center justify-center gap-x-2 dark:text-black dark:bg-white rounded-xl px-4 py-2"
          >
            {loading ? <VscLoading className="animate-spin" /> : <VscAdd />}
            New
          </button>
        </div>
      </div>
      <section className=" w-full gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {sortedArr?.map((data) => {
          return <NoteItem key={data?.ID} note={data} />;
        })}
      </section>
    </div>
  );
};

export default Dashboard;
