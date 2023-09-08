import basepath from "@/lib/path";
import { Note } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = Number(req.cookies.get("user"));
  const token = req.cookies.get("token")?.value.toString() 
  const res = await fetch(
    `${basepath}/api/v1/note/${user}/getnotes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token as string,
      },
    }
  );
  const resp = await res.json();
  return NextResponse.json({ status: true, data: "Hello World" });
}
