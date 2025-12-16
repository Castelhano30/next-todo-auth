"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTasks() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/tasks", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error || "Failed to load tasks");
      setLoading(false);
      return;
    }

    setTasks(data.tasks || []);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
    const clean = title.trim();
    if (!clean) return;

    setSaving(true);
    setError("");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: clean }),
    });

    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Failed to create task");
      return;
    }

    setTitle("");
    await loadTasks();
  }

  async function deleteTask(id) {
    setError("");
    const res = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error || "Failed to delete task");
      return;
    }

    await loadTasks();
  }

  async function toggleDone(task) {
    setError("");

    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, done: !task.done }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error || "Failed to update task");
      return;
    }

    await loadTasks();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
          </div>

          <Button type="button" onClick={logout} >
            Deslogar
          </Button>
        </div>

        <div className="mt-6 flex gap-2">
  <Input
    placeholder="Digite a nova tarefa"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="
      bg-white 
      text-gray-900 
      placeholder:text-gray-500
      border-2 
      border-gray-400
      focus:border-blue-600 
      focus:ring-2 
      focus:ring-blue-200
    "
  />

  <Button
    type="button"
    onClick={addTask}
    disabled={saving}
    className="bg-blue-600 hover:bg-blue-700 text-white"
  >
    {saving ? "Adicionando..." : "Adicionar"}
  </Button>
</div>


        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-gray-800">Carregando...</p>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-gray-800">Sem tarefas aqui.</p>
          ) : (
            <div className="space-y-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => toggleDone(t)}
                      className="h-4 w-4"
                    />

                    <Link
                      href={`/tasks/${t.id}`}
                      className={[
                        "text-sm font-semibold text-gray-800 hover:underline",
                        t.done ? "line-through text-gray-800" : "",
                      ].join(" ")}
                    >
                      {t.title}
                    </Link>
                  </div>

                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition"
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
