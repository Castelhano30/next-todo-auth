import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ authenticated: false });

  try {
    const payload = await verifyToken(token);
    return NextResponse.json({ authenticated: true, email: payload.email });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
