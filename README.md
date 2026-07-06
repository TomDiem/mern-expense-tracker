# Expense Tracker — MERN Monorepo

A minimal expense tracker built end-to-end in TypeScript on the MERN stack (MongoDB, Express 5, React 19, Node 24). Small in scope, production-shaped in structure: layered API, shared validation contracts, and a pnpm workspace that keeps a single source of truth across server and client.

## Stack

| Layer    | Tech                                     |
| -------- | ---------------------------------------- |
| Runtime  | Node.js 24 LTS, ESM, native `--env-file` |
| API      | Express 5, Mongoose 9, Zod 4             |
| Database | MongoDB 8 (Docker, named volume)         |
| Frontend | React 19, Vite 8, Tailwind CSS 4         |
| Tooling  | pnpm workspaces, TypeScript 6, Oxlint    |

## Architecture

```
expense-tracker/
├── server/                 # Express 5 REST API
│   └── src/
│       ├── index.ts        # composition root: pipeline + bootstrap, nothing else
│       ├── config/         # db connection
│       ├── middleware/     # request logger, centralized error handler
│       ├── routes/         # HTTP surface
│       ├── controllers/    # request handling (no try/catch — see decisions)
│       └── models/         # Mongoose schemas (persistence)
├── client/                 # React 19 SPA
│   └── src/
│       ├── api/            # typed fetch layer (components never call fetch)
│       ├── hooks/          # useExpenses: state + refetch-on-mutation
│       ├── components/     # presentational components
│       └── lib/            # client-only helpers
└── shared/                 # single source of truth: Zod schemas, types, categories
```

Request flow:

```
React component → useExpenses() → api/ → Vite proxy (/api, dev only)
  → requestLogger → express.json → router → controller
      → Zod parse (HTTP boundary) → Mongoose model (persistence boundary) → MongoDB
  → thrown errors auto-forward to errorHandler (Express 5) → HTTP status
```

## Getting started

```bash
docker compose up -d                    # MongoDB 8 on :27017
pnpm install                            # installs all workspace packages
cp server/.env.example server/.env
pnpm --filter server dev                # API on :3000
pnpm --filter client dev                # SPA on :5173
```

Open http://localhost:5173.

## API

| Method | Path                    | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/api/health`           | Liveness + DB connection state |
| GET    | `/api/expenses`         | List expenses (newest first)   |
| POST   | `/api/expenses`         | Create expense (Zod-validated) |
| GET    | `/api/expenses/summary` | Totals per category (`$group`) |
| GET    | `/api/expenses/:id`     | Get one expense                |
| PUT    | `/api/expenses/:id`     | Partial update                 |
| DELETE | `/api/expenses/:id`     | Delete expense                 |

Executable request examples (including error cases) live in [`server/expense.http`](server/expense.http) — runnable with the VS Code REST Client extension.

## Scripts

| Command                          | What it does                  |
| -------------------------------- | ----------------------------- |
| `pnpm lint`                      | Oxlint across all packages    |
| `pnpm --filter server typecheck` | `tsc --noEmit` on the API     |
| `pnpm --filter server build`     | Compile API to `server/dist`  |
| `pnpm --filter client build`     | Typecheck + production bundle |
