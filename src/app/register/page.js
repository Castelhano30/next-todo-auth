"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Register failed");
      return;
    }

    router.push("/login");
  }

  return (
    <section className="mx-auto max-w-md">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Cadastro</h1>
        <p className="mt-1 text-sm text-gray-600">
          Crie sua conta para gerenciar suas tarefas.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Nome</label>
            <Input name="name" placeholder="Seu nome" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input name="email" type="email" placeholder="you@email.com" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Senha</label>
            <Input name="password" type="password" placeholder="••••••••" />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </Button>
        </form>
      </div>
    </section>
  );
}
