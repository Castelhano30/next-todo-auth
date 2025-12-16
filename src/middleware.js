import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const protectPage = pathname.startsWith("/tasks");
  const protectApi = pathname.startsWith("/api/tasks");

  if (!protectPage && !protectApi) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (protectPage) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch {
    if (protectPage) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/tasks/:path*", "/api/tasks/:path*"],
};
