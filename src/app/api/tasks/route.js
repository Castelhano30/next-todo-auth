import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

async function getUserIdFromRequest(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}

// GET /api/tasks -> listar tasks do usuário logado
export async function GET(req) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ tasks });
}

// POST /api/tasks -> criar task
export async function POST(req) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const title = (body.title || "").trim();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: { title, userId },
  });

  return NextResponse.json({ task }, { status: 201 });
}

// DELETE /api/tasks?id=123 -> deletar task
export async function DELETE(req) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // garante que só apaga task do próprio usuário
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}

// PATCH /api/tasks -> alternar done
export async function PATCH(req) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const id = body.id;
  const done = body.done;

  if (!id || typeof done !== "boolean") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // garante que só altera task do próprio usuário
  const existing = await prisma.task.findFirst({ where: { id, userId } });
  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const updated = await prisma.task.update({
    where: { id },
    data: { done },
  });

  return NextResponse.json({ task: updated });
}
