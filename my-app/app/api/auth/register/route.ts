import basepath from "@/lib/path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  const res = await fetch(`${basepath}/api/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({
      status: false,
    });
  }
  console.log(data);
  return NextResponse.json({
    status: true,
    token: data?.token,
    data: data?.user,
  });
}

// {status: true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzQ…6Mjd9._301heKhNaJnGcDnjPsTZ183tMj8ASwx_nEAUwuX9O4', data: {…}}
// data
// :
// {ID: 27, CreatedAt: '2023-09-27T19:49:57.4852913+05:30', UpdatedAt: '2023-09-27T19:49:57.4852913+05:30', DeletedAt: null, Username: 'mike', …}
// status
// :
// true
// token
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzQXQiOjkwMDAwMDAwMDAwMCwidXNlciI6Mjd9._301heKhNaJnGcDnjPsTZ183tMj8ASwx_nEAUwuX9O4"
