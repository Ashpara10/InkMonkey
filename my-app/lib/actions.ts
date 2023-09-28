import { getCookie } from "cookies-next";
import { Note } from "./types";
import basepath from "./path";

export const create_note = async (
  note: Note
): Promise<{ note: Note; status: boolean }> => {
  const userId = getCookie("user");
  const token = getCookie("token");
  const res = await fetch(`${basepath}/api/v1/note/${userId}/createnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
    body: JSON.stringify({
      title: note?.Title,
      content: note?.Content,
      tags: note?.Tags,
      userid: userId,
    }),
  });
  const data = await res.json();
  return {
    status: res.ok,
    note: data?.data as Note,
  };
};

export const getNotes = async (
  id: string,
  token: string
): Promise<{ notes: Note[] }> => {
  const res = await fetch(`${basepath}/api/v1/note/${id}/getnotes`, {
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
    next: {
      revalidate: 5,
    },
  });
  const resp = await res.json();
  return { notes: resp?.data };
};

export const GetNoteByID = async (
  id: string
): Promise<{ note: Note | null; status: boolean }> => {
  const token = getCookie("token");
  const userId = getCookie("user");
  const res = await fetch(`${basepath}/api/v1/note/21/getnote/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
    cache: "no-cache",
  });
  const resp = await res.json();
  if (!res.ok) {
    return { status: false, note: null };
  }
  return { status: true, note: resp?.data };
};
export const HandleUpdateNote = async (note: Note, ID: string) => {
  const userId = getCookie("user");
  const token = getCookie("token");
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
  const userId = getCookie("user");
  const token = getCookie("token");
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
    status: res.ok,
    data: data,
  };
};
