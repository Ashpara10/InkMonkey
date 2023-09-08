"use client"
import { Note } from "@/lib/types";
import React from "react";
import { VscEdit, VscEllipsis, VscTrash } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HandleDeleteNote } from "@/lib/actions";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const NoteItem = ({ note }: { note: Note }) => {
  const { ID, Title, Tags, CreatedAt,UserId } = note;
  const date = new Date(CreatedAt as string).toLocaleDateString();
  const router=useRouter()

  return (
    <article className="w-full px-4 py-3 gap-3 flex flex-col items-center justify-center rounded-lg border dark:border-dark-btn">
      <Toaster position="bottom-left" />
      <div className="w-full flex items-center justify-between">
        <h2 className="w-full text-left text-2xl font-bold" onClick={()=>router.push(`/dashboard/note/${UserId}/${ID}`)}>{Title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="p-1 hover:dark:bg-dark-btn rounded-lg">
              <VscEllipsis className="text-lg font-bold " />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-dark">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:dark:bg-dark-btn flex  items-center justify-between gap-x-3">
              Edit
              <VscEdit className="text-xl" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const { data, status } = await HandleDeleteNote(ID as string);
                console.log(data);
                status && toast.success("Note successfully deleted");
              }}
              className="hover:dark:bg-red-500 dark:text-white flex items-center justify-between gap-x-3"
            >
              Delete <VscTrash className="text-xl" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex items-center justify-between">
        <span>{date}</span>
        <span className={`dark:bg-dark-btn rounded-3xl py-1 px-3`}>{Tags}</span>
      </div>
    </article>
  );
};

export default NoteItem;
