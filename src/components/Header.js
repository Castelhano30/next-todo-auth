"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [auth, setAuth] = useState({ loading: true, authenticated: false });

  async function loadAuth() {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    setAuth({ loading: false, authenticated: !!data.authenticated });
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-gray-900">
          ✅ Lista de Tarefas
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/">Início</NavLink>
          <NavLink href="/tasks">Tarefas</NavLink>

          {!auth.loading && !auth.authenticated && (
            <>
              <NavLink href="/register">Cadastro</NavLink>
              <NavLink href="/login">Login</NavLink>
            </>
          )}

          {!auth.loading && auth.authenticated && (
            <button
              onClick={logout}
              className="rounded-md px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
