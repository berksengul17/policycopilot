import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// redirect to the login page if not authenticated
export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Exclude _next, api, favicon, and common static files — and still skip "/"
  matcher:
    "/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)).+)",
};
