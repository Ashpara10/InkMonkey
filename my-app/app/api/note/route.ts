import { Note } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = Number(req.cookies.get("user"));
  const token = String(req.cookies.get("token"));
  console.log({ user, token });
  const res = await fetch(
    `http://localhost:8000/api/v1/note/${user}/getnotes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token,
      },
    }
  );
  const resp = await res.json();
  return NextResponse.json({ status: true, data: "Hello World" });
}
