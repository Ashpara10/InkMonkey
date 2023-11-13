"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, Download, Share2, Loader2 } from "lucide-react";
import { HandleDeleteNote } from "@/lib/actions";
import toast, { Toaster } from "react-hot-toast";
import { Note } from "@/lib/types";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/theme";

export function Menu({
  children,
  notes,
  Id,
}: {
  children: React.ReactNode;
  notes?: Note[];
  Id: string;
}) {
  const { mutate, error } = useMutation({
    mutationFn: (note_id: string) => {
      return HandleDeleteNote(note_id);
    },
    onError: () => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      toast.success("Note successfully deleted");
      queryClient.refetchQueries("notes");
    },
  });

  return (
    <DropdownMenu>
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white " }}
        position="bottom-center"
      />

      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-dark py-3 px-2 border dark:border-dark-btn">
        <DropdownMenuItem
          onClick={async () => {
            mutate(Id);
          }}
          className=" hover:bg-red-400 hover:text-white dark:hover:bg-red-500 rounded-lg w-full"
        >
          <Trash className="mr-2" />
          Delete
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
