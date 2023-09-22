"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, Download, Share2 } from "lucide-react";
import { HandleDeleteNote } from "@/lib/actions";
import toast, { Toaster } from "react-hot-toast";
import { Note } from "@/lib/types";
import NoteContext from "@/lib/note-context";

export function Menu({
  children,
  notes,
  Id,
}: {
  children: React.ReactNode;
  notes: Note[];
  Id: string;
}) {
  const { setNote } = React.useContext(NoteContext);
  return (
    <DropdownMenu>
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white shadow-md" }}
        position="bottom-center"
      />
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-dark py-3 px-2 border dark:border-dark-btn">
        <DropdownMenuItem
          onClick={async () => {
            const { data, status } = await HandleDeleteNote(Id as string);
            const filteredArray = notes?.filter((e) => {
              return e.ID !== Id;
            });
            console.log(filteredArray);
            setNote(filteredArray as Note[]);
            status && toast.success("Note successfully deleted");
          }}
          className="dark:hover:dark:bg-red-500 rounded-lg w-full"
        >
          <Trash className="mr-2" /> Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:hover:bg-dark-btn rounded-lg w-full">
          <Share2 className=" mr-2" /> Share
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:hover:bg-dark-btn rounded-lg w-full">
          <Download className=" mr-2" /> Download
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
