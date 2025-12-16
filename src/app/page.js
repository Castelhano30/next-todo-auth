import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">Lista de tarefas (TO-DO)</h1>
        <p className="mt-2 text-gray-600">
          Projeto simples de lista de tarefas com autenticação, rotas de API protegidas e banco de dados.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/register"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Criar conta
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
          >
            Logar
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Feature title="Rotas" desc="Página inicial, login/cadastro e páginas de tarefas" />
        <Feature title="Auth" desc="JWT + httpOnly cookies" />
        <Feature title="API" desc="Endpoints de API protegidos, disponíveis apenas para usuários Logados." />
      </div>
    </section>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
