"use client";
import { Note } from "@/lib/types";
import React, { useContext } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { Balancer } from "react-wrap-balancer";
import NoteContext from "@/lib/note-context";
import { Button } from "@/components/ui/button";
import { DropdownMenuCheckboxes } from "./dropdown-menu";

const NoteItem = ({ note }: { note: Note }) => {
  const { ID, Title, Tags, CreatedAt, UserId } = note;
  const date = new Date(CreatedAt as string).toDateString();
  const router = useRouter();
  const { note: notes, setNote } = useContext(NoteContext);
  return (
    <article className="w-full min-h-[300px] px-4 py-3 gap-3 flex flex-col items-center justify-between rounded-2xl border dark:border-dark-btn">
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white shadow-md" }}
        position="bottom-center"
      />
      <div className="w-full flex flex-col items-center gap-x-2 ">
        <DropdownMenuCheckboxes>
          <button className="rounded-lg bg-transparent">
            <VscEllipsis className="text-lg font-bold " />
          </button>
        </DropdownMenuCheckboxes>
        {/* <DropdownMenu>
          <div className="w-full flex items-center justify-end">
            <DropdownMenuTrigger>
              <button className="p-1 hover:dark:bg-dark-btn rounded-lg">
                <VscEllipsis className="text-lg font-bold " />
              </button>
            </DropdownMenuTrigger>
          </div>
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
                const filteredArray = notes?.filter((e) => {
                  return e.ID !== note.ID;
                });
                setNote(filteredArray as Note[]);
                status && toast.success("Note successfully deleted");
              }}
              className="hover:dark:bg-red-500 dark:text-white flex items-center justify-between gap-x-3"
            >
              Delete <VscTrash className="text-xl" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
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
