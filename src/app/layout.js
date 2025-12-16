import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Lista de Tarefas - Next.js",
  description: "Aplicação de lista de tarefas com autenticação",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <main className="mx-auto w-full max-w-4xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
