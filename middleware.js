import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("adminToken")?.value;

  if (request.nextUrl.pathname.startsWith("/createproduct") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/createproduct"],
};
