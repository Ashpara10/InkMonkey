"use client";
import { GetNoteByID, HandleUpdateNote } from "@/lib/actions";
import { ChevronLeft, Loader2, MoreVertical, Pin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Textarea from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import { useRouter } from "next/navigation";
import { Note } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/theme";

export const EDITOR_TOOLS = {
  header: Header,
};

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["note-by-id", params?.id],
    queryFn: () => GetNoteByID(params?.id),
    refetchOnMount: false,
    onSuccess(data) {
      setUpdatedNote({
        Title: data?.Title as string,
        Content: data?.Content as string,
        Tags: data?.Tags as string,
      });
    },
  });
  const { mutate, isLoading: loading } = useMutation({
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

  const router = useRouter();
  const ref = useRef<EditorJS>();
  const [updatedNote, setUpdatedNote] = useState<Note>({
    Title: "",
    Content: "",
    Tags: "",
  });

  useEffect(() => {
    if (!ref?.current) {
      const editor = new EditorJS({
        holder: "editor",
        tools: EDITOR_TOOLS,
        async onChange(api, event) {
          const data = await api.saver.save();
          console.log({ data });
          data?.blocks &&
            setUpdatedNote({
              ...updatedNote,
              Content: JSON.stringify(data.blocks),
            });
        },
      });
      ref.current = editor;
    }
    return () => {
      if (ref?.current && ref.current.destroy) {
        ref?.current?.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-2xl px-6 rounded-2xl py-3 min-h-screen  border w-full flex flex-col items-start justify-start dark:border-dark-btn">
      <Toaster
        toastOptions={{ className: "dark:bg-dark dark:text-white shadow-md" }}
        position="bottom-center"
      />
      {isLoading ? (
        <div className="flex items-center justify-center w-full mt-5">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="px-2 flex mb-4 mt-2  items-center justify-between w-full">
            <button
              onClick={() => router.back()}
              className="border rounded-full dark:border-dark-btn p-1"
            >
              <ChevronLeft />
            </button>
            <div className="flex items-center justify-center space-x-4">
              <span
                onClick={async () => {
                  mutate({ updatedNote: updatedNote, id: data?.ID });
                }}
              >
                {loading ? "saving " : " save"}
              </span>
              <button className="">
                <Pin />
              </button>
              <button className="">
                <MoreVertical />
              </button>
            </div>
          </div>

          <Textarea
            autoFocus
            placeholder="Title goes here..."
            name="Title"
            className="px-2 w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl  font-bold focus:outline-none"
            defaultValue={updatedNote?.Title}
            onChange={(e) =>
              setUpdatedNote({
                ...updatedNote,
                [e.target.name]: e.target.value,
              })
            }
          />
          <span className="px-2 opacity-80 mt-2">
            {new Date(data?.CreatedAt as string).toDateString()}
          </span>
        </>
      )}
      <div className="w-full px-2 mt-3 " id="editor" />
    </div>
  );
};

export default Page;
