# 📋 Projeto – Lista de Tarefas com Next.js

Este projeto foi desenvolvido como **Projeto de Disciplina da Pós-Graduação**, com o objetivo de aplicar, de forma prática, os conceitos aprendidos sobre **Next.js**, **rotas**, **autenticação**, **API Routes**, **Server Side** e **deploy em ambiente serverless**.

A aplicação consiste em um **sistema de lista de tarefas (To-Do App)**, onde usuários podem se cadastrar, realizar login e gerenciar suas próprias tarefas de forma segura.

---

## 🚀 Tecnologias Utilizadas

- **Next.js (App Router)**
- **React**
- **JavaScript**
- **Tailwind CSS**
- **Prisma ORM**
- **SQLite** (ambiente de desenvolvimento)
- **JWT (JSON Web Token)** para autenticação
- **Cookies HTTP Only**
- **Vercel** (deploy)
- **GitHub** (versionamento)

---

## 🧱 Arquitetura da Aplicação

- Aplicação construída com **Next.js App Router**
- Separação clara entre:
  - **Pages**
  - **Componentes**
  - **API Routes**
  - **Camada de autenticação**
- Uso de **Server Components** e **Client Components**
- Banco de dados relacional gerenciado pelo **Prisma ORM**

---

## 🔐 Autenticação e Segurança

- Cadastro de usuários com **hash de senha (bcrypt)**
- Login com geração de **JWT**
- Token armazenado em **cookie httpOnly**
- Sessão segura baseada em cookies
- Proteção de rotas com **Middleware do Next.js**
- Endpoints da API acessíveis **somente por usuários autenticados**

---

## 🗂 Funcionalidades do Sistema

### 👤 Usuário
- Cadastro de usuário
- Login
- Logout
- Sessão persistente via cookie

### ✅ Tarefas
- Criar nova tarefa
- Listar tarefas do usuário logado
- Marcar tarefa como concluída / não concluída
- Excluir tarefa
- Visualizar detalhes da tarefa em **rota dinâmica**

---

## 🧭 Rotas da Aplicação

### Rotas Públicas
- `/` – Página inicial
- `/register` – Cadastro de usuário
- `/login` – Login

### Rotas Protegidas
- `/tasks` – Lista de tarefas do usuário autenticado
- `/tasks/[id]` – Detalhes da tarefa (rota dinâmica)
- `/profile` – Página server-side com leitura segura de cookies

---

## 🔁 API Routes

### Autenticação
- `POST /api/auth/register` – Cadastro de usuário
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout
- `GET /api/auth/me` – Verifica usuário autenticado

### Tarefas (Protegidas)
- `GET /api/tasks` – Lista tarefas do usuário
- `POST /api/tasks` – Cria nova tarefa
- `PATCH /api/tasks` – Atualiza status da tarefa
- `DELETE /api/tasks` – Remove tarefa

---

## 🧠 Server Side e Server Functions

O projeto utiliza recursos **server-side** do Next.js, como:

- **Server Components**
- Leitura segura de cookies no servidor
- Middleware para proteção de rotas
- Busca de dados no banco diretamente no servidor

Exemplos:
- Página `/tasks/[id]` utiliza **Server Component** para buscar dados da tarefa no servidor.
- Página `/profile` demonstra leitura de sessão no servidor.

---

## 🗃 Banco de Dados

- Banco de dados relacional gerenciado com **Prisma ORM**
- Modelos principais:
  - `User`
  - `Task`
- Relacionamento **1:N** (um usuário possui várias tarefas)

---

## 🌐 Deploy

A aplicação foi publicada em ambiente **serverless** utilizando a plataforma **Vercel**.

- Integração direta com repositório GitHub
- Variáveis de ambiente configuradas no painel da Vercel
- Build automático a cada push na branch principal

---

## 📄 Requisitos do Enunciado – Checklist

| Requisito | Implementado |
|----------|--------------|
| Rota principal (Home) | ✅ |
| Rotas dinâmicas | ✅ |
| Formulário de cadastro | ✅ |
| Formulário de login | ✅ |
| Sessão e autenticação | ✅ |
| Login / Logout | ✅ |
| API Routes protegidas | ✅ |
| Server Side / Server Functions | ✅ |
| Componentização | ✅ |
| Design responsivo | ✅ |
| Banco de dados | ✅ |
| Deploy serverless | ✅ |

---

## ▶️ Como executar o projeto localmente

```bash
# instalar dependências
npm install

# rodar migrações do banco
npx prisma migrate dev

# iniciar o servidor
npm run dev
 ```

 ## 📌 Observações Finais

Este projeto foi desenvolvido com foco em:

Simplicidade

Clareza de arquitetura

Segurança

Atendimento integral aos requisitos acadêmicos

## 👤 Autor
Felipe Castelhano
Projeto acadêmico – Pós-Graduação em Desenvolvimento Full Stack
