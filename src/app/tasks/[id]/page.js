import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import Link from "next/link";

async function getUserId() {
  const cookieStore = await cookies(); // ✅ Next 16 / Turbopack
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}


export default async function TaskDetailsPage({ params }) {
  const userId = await getUserId();
  const id = params.id;

  // Segurança extra: se não estiver logado, nem mostra
  if (!userId) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-red-600">Unauthorized.</p>
        <Link className="underline" href="/login">
          Go to login
        </Link>
      </div>
    );
  }

  // Só pode ver task que pertence ao usuário
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
        <p className="text-sm text-red-600">Tarefa não Encontrada</p>
        <Link className="underline" href="/tasks">
          Voltar para Tarefas
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
      <h1 className="text-2xl font-bold text-gray-800">Detalhes da Tarefa</h1>
      <p className="text-sm text-gray-800">Rota dinâmica: /tasks/[id]</p>

      <div className="rounded-xl border bg-gray-800 p-4">
        <p className="text-sm">
          <span className="font-semibold">Título:</span> {task.title}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Concluída:</span> {task.done ? "Sim" : "Não"}
        </p>
      </div>

      <Link className="underline text-blue-800" href="/tasks">
        Voltar para Tarefas
      </Link>
    </div>
  );
}
