"use client";
import { HandleUpdateNote } from "@/lib/actions";
import { queryClient } from "@/lib/theme";
import { Note } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { VscArrowLeft, VscLoading } from "react-icons/vsc";
import { useMutation } from "react-query";
import TextAreaAutoSize from "react-textarea-autosize";

const NotePage = ({ data }: { data: null | Note; status?: boolean }) => {
  const router = useRouter();
  const [updatedNote, setUpdatedNote] = useState<Note>({
    Title: data?.Title as string,
    Content: data?.Content as string,
    Tags: data?.Tags as string,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["update-note"],
    mutationFn: async ({
      updatedNote,
      id,
    }: {
      updatedNote: Note;
      id: string;
    }) => HandleUpdateNote(updatedNote, id),
    onError: (error) => {
      toast.error(error as any);
    },

    onSuccess: () => {
      queryClient.refetchQueries("notes");
      toast.success("saved ");
    },
  });

  const updateNote = async (id: string) => {
    setIsSaving(true);
    mutate({ updatedNote: updatedNote, id: id });
    setIsSaving(false);
  };

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-start">
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white shadow-md" }}
        position="bottom-center"
      />
      <div className="max-w-4xl w-full flex items-center justify-between ">
        <button
          onClick={() => router.back()}
          className="flex gap-x-2 items-center justify-center text-black text-lg border dark:hover:bg-dark-btn dark:border-dark-btn dark:text-white px-4 py-2 rounded-lg"
        >
          <VscArrowLeft className="text-lg font-bold " />
          Back
        </button>

        <button
          className="flex items-center justify-center border border-gray-200 dark:border-dark-btn bg-white  text-lg dark:bg-white text-black px-4 py-2 rounded-lg disabled:opacity-70"
          // disabled={
          //   data?.Title === updatedNote?.Title &&
          //   data?.Content === updatedNote?.Content
          // }
          onClick={() => updateNote(data?.ID as string)}
        >
          {isSaving ? (
            <>
              <VscLoading className="mx-2 animate-spin text-lg" />
              Saving
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </div>
      <article className="max-w-4xl w-full  rounded-2xl border mt-10 border-gray-200 bg-white dark:bg-dark  px-4 py-16  dark:border-dark-btn">
        <TextAreaAutoSize
          autoFocus
          placeholder="Title goes here..."
          name="Title"
          onChange={(e) =>
            setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value })
          }
          className="px-2 w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl md:text-5xl font-bold focus:outline-none"
          defaultValue={updatedNote.Title}
        />
      </article>
    </div>
  );
};

export default NotePage;
