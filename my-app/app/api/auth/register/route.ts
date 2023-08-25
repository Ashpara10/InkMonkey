import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  let ErrorMessage;
  const res = await fetch(`http://localhost:8000/api/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).catch((err) => (ErrorMessage = err));
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({
      status: false,
      error: `An unexpected Error occured ${ErrorMessage}`,
    });
  }
  return NextResponse.json({
    status: true,
    token: data?.token,
    data: data?.user,
  });
}
