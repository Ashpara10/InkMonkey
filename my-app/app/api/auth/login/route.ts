import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const res = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({
      status: false,
      // error: `Login using correct credentials`,
    });
  }
  return NextResponse.json({
    status: true,
    token: data?.token,
    data: data?.user,
  });
}
