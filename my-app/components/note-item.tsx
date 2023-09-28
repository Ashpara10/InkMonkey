"use client";
import { Note } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Balancer } from "react-wrap-balancer";
import { Menu } from "./dropdown-menu";
import NavContext from "@/lib/context";

const NoteItem = ({ note }: { note: Note }) => {
  const { ID, Title, Tags, CreatedAt, UserId } = note;
  const [IsSelected, setIsSelected] = useState<boolean>();
  const date = new Date(CreatedAt as string).toDateString();
  const router = useRouter();
  const { selectedNotes, setSelectedNotes } = useContext(NavContext);
  useEffect(() => {
    if (IsSelected) {
      setSelectedNotes(selectedNotes?.concat(note) as Note[]);
    } else {
      const filteredSelectedNotes = selectedNotes?.filter(
        (a) => a.ID !== note.ID
      );
      setSelectedNotes(filteredSelectedNotes as Note[]);
    }
  }, [IsSelected]);
  return (
    <article
      onDoubleClick={() => {
        setIsSelected(!IsSelected);
      }}
      className={` ${
        IsSelected && " dark:border-blue-800 "
      } select-none w-full min-h-[300px] px-4 py-3 gap-3 flex flex-col items-center justify-between rounded-2xl border dark:border-dark-btn`}
    >
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white shadow-md" }}
        position="bottom-center"
      />
      <div className="w-full flex flex-col gap-2 ">
        <div className="w-full flex justify-end items-center">
          <Menu Id={String(note?.ID)}>
            <button className="rounded-lg bg-transparent p-0.5 ">
              <MoreHorizontal className="text-lg font-bold " />
            </button>
          </Menu>
        </div>

        <h2
          className="w-full text-left text-2xl font-bold"
          onClick={() => router.push(`/dashboard/note/${UserId}/${ID}`)}
        >
          <Balancer>{Title}</Balancer>
        </h2>
      </div>
      <div className="w-full flex items-center justify-between">
        <span>{date}</span>
        <span className={`dark:bg-dark-btn rounded-3xl py-1 px-3`}>{Tags}</span>
      </div>
    </article>
  );
};

export default NoteItem;
