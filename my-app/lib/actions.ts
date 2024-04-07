import { getCookie } from "cookies-next";
import { Note } from "./types";
import basepath from "./path";

const userId = getCookie("user");
const token = getCookie("token");

export const createNote = async () => {
  const res = await fetch(`${basepath}/api/v1/note/${userId}/createnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
    body: JSON.stringify({
      title: "Untitled Note....",
      content: "Content goes here",
      tags: "General",
      userid: userId,
    }),
  });
  const data = await res.json();
  console.log({ data: data?.data?.ID });
  return data?.data as Note;
};

export const getNotes = async (): Promise<Note[]> => {
  const res = await fetch(`${basepath}/api/v1/note/${userId}/getnotes`, {
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
  });
  const resp = await res.json();

  return resp?.data as Note[];
};

export const GetNoteByID = async (id: string) => {
  const res = await fetch(`${basepath}/api/v1/note/${userId}/getnote/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
  });
  const resp = await res.json();

  return resp?.data;
};
export const HandleUpdateNote = async (note: Note, ID: string) => {
  const res = await fetch(`${basepath}/api/v1/note/${userId}/update/${ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
    next: {
      tags: ["notes"],
    },
    body: JSON.stringify({
      title: note?.Title,
      content: note?.Content,
      tags: note?.Tags,
    }),
  });
  const data = await res.json();
  console.log(data);
  return {
    status: res.ok,
    data: data,
  };
};
export const HandleDeleteNote = async (ID: string) => {
  const res = await fetch(`${basepath}/api/v1/note/${userId}/delete/${ID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
  });
  const data = await res.json();
  console.log(data);
  return {
    data: data,
  };
};
