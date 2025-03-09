import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("adminToken")?.value;

  // Define protected routes
  const protectedRoutes = ["/createproduct", "/orders", "/"];

  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    ) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Corrected matcher config
export const config = {
  matcher: ["/createproduct", "/orders/:path*", "/"],
};
