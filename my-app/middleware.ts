import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path == "/") {
    return NextResponse.next();
  }
  const token = req.cookies.get("token");
  if (!token && path == "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if ((token && path == "/login") || path == "/user/register") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
