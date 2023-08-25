import { getCookie } from "cookies-next";

import * as z from "zod";
import { Note } from "./types";

export const formSchemaSignup = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email ID is mandatory",
  }),
  password: z.string().min(6, {
    message: "Email ID is mandatory",
  }),
});
export const formSchemaLogin = z.object({
  email: z.string().email({
    message: "Email ID is mandatory",
  }),
  password: z.string().min(6, {
    message: "Invalid Password",
  }),
});

export const HandleCreateNote = async (note: Note) => {
  const userId = getCookie("user");
  const token = getCookie("token");
  const res = await fetch(
    `http://localhost:8000/api/v1/note/${userId}/createnote`,
    {
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
    }
  );
  const data = await res.json();
  console.log(data);
  return {
    status: res.ok,
    data: data,
  };
};
export const HandleUserSignUp = async (
  user: z.infer<typeof formSchemaSignup>
) => {
  const res = await fetch("http://localhost:8000/api/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
    }),
  });
  const data = await res.json();
  console.log(data);
  return {
    status: res.ok,
    data: data,
  };
};
export const HandleUserLogin = async (
  user: z.infer<typeof formSchemaLogin>
) => {
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
  const data = await res.json();
  console.log(data);
  return {
    status: res.ok,
    data: data,
  };
};

export const getNotes = async (
  id: number,
  token: string
): Promise<{ notes: Note[] }> => {
  const res = await fetch(`http://localhost:8000/api/v1/note/${id}/getnotes`, {
    headers: {
      "Content-Type": "application/json",
      "Auth-Token": String(token),
    },
  });
  const resp = await res.json();
  return { notes: resp?.data };
};
export const GetNoteByID = async (id: string) => {
  const token = getCookie("token");
  const userId = getCookie("user");

  const res = await fetch(
    `http://localhost:8000/api/v1/note/${userId}/getnote/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": String(token),
      },
    }
  );
  const resp = await res.json();
  console.log(resp);
  return resp?.data;
};
const HandleUpdateNote = async (note: Note, ID: string) => {
  const userId = getCookie("user");
  const token = getCookie("token");
  const res = await fetch(
    `http://localhost:8000/api/v1/note/${userId}/update/${ID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": String(token),
      },
      body: JSON.stringify({
        title: note?.Title,
        content: note?.Content,
        tags: note?.Tags,
      }),
    }
  );
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
  const res = await fetch(
    `http://localhost:8000/api/v1/note/${userId}/delete/${ID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": String(token),
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return {
    status: res.ok,
    data: data,
  };
};
