import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, email: user.email });

    const res = NextResponse.json({ ok: true });

    res.cookies.set("token", token, {
  httpOnly: true,
  secure: true,          // ✅ força HTTPS
  sameSite: "none",      // ✅ necessário em produção serverless
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});


    return res;
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
