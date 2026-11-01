# 🛍️ E-commerce Platform (Jala Sales)

Monorepo de um marketplace multi-vendedor: clientes compram produtos, vendedores
gerenciam catálogo e pedidos, e administradores moderam vendedores e categorias.

| Pacote | Caminho | Descrição |
| --- | --- | --- |
| `@sales/web` | [`jala-sales/`](./jala-sales) | Front-end em Next.js 15 (App Router) |
| `@sales/api` | [`jala-sales-api/`](./jala-sales-api) | API REST em Fastify 5 + Drizzle ORM + PostgreSQL |

> Este repositório substitui o antigo `marketplace-api`, que continha apenas o back-end.

---

## Arquitetura

```
                         ┌──────────────────────────────┐
                         │        Navegador             │
                         └──────────────┬───────────────┘
                                        │ HTTPS :443
                         ┌──────────────▼───────────────┐
                         │  Nginx (reverse proxy / TLS) │
                         └──────────────┬───────────────┘
                                        │
┌───────────────────────────────────────▼──────────────────────────────────────┐
│  jala-sales  (@sales/web — Next.js 15)                                       │
│                                                                              │
│  App Router ─ (marketplace) · (auth) · (dashboard)/seller · (dashboard)/admin│
│  Server Actions ─ login / sign-up                                            │
│  NextAuth ─ Credentials + Google  →  JWT emitido pela API                    │
│  TanStack Query ─ cache de dados no cliente                                  │
└───────────────┬───────────────────────────────────────────┬──────────────────┘
                │ REST (NEXT_PUBLIC_API_URL)                 │ Storage SDK
┌───────────────▼──────────────────────────────┐   ┌─────────▼─────────────────┐
│  jala-sales-api  (@sales/api — Fastify 5)    │   │  Supabase Storage         │
│                                              │   │  (bucket profile-image)   │
│  plugins: cors · jwt · swagger · scalar      │   └───────────────────────────┘
│  http/routes → controllers → use-cases       │
│               → repositories (Drizzle)       │
└───────────────┬──────────────────────────────┘
                │ postgres.js
┌───────────────▼──────────────────────────────┐
│  PostgreSQL 16                               │
└──────────────────────────────────────────────┘
```

### Fluxo de autenticação

1. O usuário faz login no front (e-mail/senha ou Google) via **NextAuth**.
2. O provider do NextAuth chama a API (`POST /api/users/auth/login` ou
   `POST /api/users/auth/google`).
3. A API valida as credenciais, registra a sessão (`tb_sessions`) e devolve um
   **JWT** assinado com `@fastify/jwt`.
4. O front guarda o token na sessão do NextAuth e o envia no header
   `Authorization: Bearer <token>` nas rotas protegidas.
5. Na API, os hooks `verifyJwt` e `verifyAdmin` (`src/http/middlewares`) protegem
   as rotas conforme o papel do usuário (`customer`, `seller`, `admin`).

---

## Back-end — `jala-sales-api`

**Stack:** Node.js 20 · TypeScript · Fastify 5 · Zod · Drizzle ORM · PostgreSQL 16 ·
Vitest · tsup · Biome

### Organização em camadas

O código é organizado por **módulo de domínio** (`src/models/<módulo>`), e cada
módulo segue a mesma separação em camadas — inspirada em Clean Architecture:

```
src/
├── server.ts                 # bootstrap (listen)
├── core/
│   ├── config/               # app Fastify, env (validado com Zod), constantes
│   ├── db/                   # conexão, migrator e schema Drizzle
│   ├── plugins/              # cors, jwt, swagger, scalar (docs da API)
│   ├── scripts/              # seeds (categorias, produtos)
│   └── types/
├── http/
│   ├── middlewares/          # verify-jwt, verify-admin
│   └── routes/               # registro de rotas por módulo
└── models/
    └── <módulo>/             # categories · order · order-detail · products · seller · users
        ├── controllers/      # adapta request/response HTTP, valida input com Zod
        ├── factories/        # composition root: injeta o repositório no use-case
        ├── use-cases/        # regras de negócio (+ testes *.spec.ts)
        └── repositories/
            ├── <x>-repository.ts   # contrato (interface)
            ├── drizzle/            # implementação com PostgreSQL
            └── in-memory/          # implementação para testes unitários
```

Fluxo de uma requisição:

```
route ─▶ [verifyJwt / verifyAdmin] ─▶ controller ─▶ factory.makeX() ─▶ UseCase.execute() ─▶ Repository (Drizzle) ─▶ PostgreSQL
```

Como os use-cases dependem apenas da interface do repositório, os testes
unitários usam os repositórios `in-memory`, sem banco de dados.

### Endpoints

Todas as rotas são prefixadas por `/api`. A documentação interativa (OpenAPI)
é servida pelo Scalar a partir do Swagger, e há uma coleção [Bruno](https://www.usebruno.com/)
em `jala-sales-api/collection`.

| Prefixo | Recursos |
| --- | --- |
| `/api/users` | cadastro, login (credenciais / Google), perfil |
| `/api/products` | CRUD, busca por nome, filtro por preço/categoria, ordenação, produtos do vendedor |
| `/api/seller` | candidatura a vendedor (`/apply`), moderação pelo admin |
| `/api/categories` | CRUD de categorias (escrita restrita a admin) |
| `/api/order` | criação, consulta e atualização de status de pedidos |
| `/api/order-detail` | itens de um pedido |

### Modelo de dados

| Tabela | Descrição |
| --- | --- |
| `tb_users` | usuários; `role` (`customer` · `seller` · `admin`), `provider` (`credentials` · `google`), `status` |
| `tb_sessions` | sessões/tokens emitidos |
| `tb_seller_applies` | candidaturas de vendedor e seu status de aprovação |
| `tb_categories` | categorias de produto |
| `tb_products` | produtos, com `product_status` e vínculo com vendedor e categoria |
| `tb_order` | pedidos, com `order_status` |
| `tb_order_detail` | itens de cada pedido (produto, quantidade, preço) |

As migrations ficam em `jala-sales-api/.drizzle` e são geradas com `drizzle-kit`.

---

## Front-end — `jala-sales`

**Stack:** Next.js 15 (App Router, Turbopack) · React 18 · TypeScript · Tailwind CSS ·
shadcn/ui (Radix) · TanStack Query · React Hook Form + Zod · NextAuth · Supabase ·
Recharts · Framer Motion · Biome

### Estrutura de rotas

O App Router usa *route groups* para separar as três áreas da aplicação, cada uma
com seu próprio layout:

```
src/app/
├── (marketplace)/            # loja pública
│   ├── products/[id]         # detalhe do produto
│   ├── checkout/
│   ├── seller-terms/         # termos + candidatura a vendedor
│   └── (customer)/           # área logada do cliente
│       ├── account/          #   profile · address · payment
│       ├── orders/
│       └── wishlist/
├── (auth)/                   # sign-in · sign-up
├── (dashboard)/
│   ├── seller/               # dashboard · products (+ edit/[id]) · orders
│   └── admin/
│       ├── (auth)/sign-in    # login do admin
│       └── (space)/          # dashboard · users · applies (moderação de vendedores)
├── actions/                  # Server Actions (login, sign-up)
└── api/auth/[...nextauth]/   # handler do NextAuth
```

### Demais pastas

```
src/
├── components/
│   ├── ui/          # primitives shadcn/ui (Radix + Tailwind)
│   ├── forms/       # formulários (React Hook Form + Zod)
│   └── icons/
├── hooks/           # use-toast, use-mobile, use-click-outside
├── lib/             # api.ts (cliente HTTP), auth.ts (NextAuth), env.ts (t3-env), supabase.ts
├── shared/          # providers (QueryClient)
└── types/           # tipos da API e augmentations do NextAuth
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 20 (`lts/iron`, ver `.nvmrc`)
- pnpm 9
- Docker e Docker Compose

### 1. API + banco

```bash
cd jala-sales-api
cp .env.example .env.local        # ajuste DATABASE_URL, AUTH_SECRET...
pnpm install
docker compose up -d jala-sales-db
pnpm db:migrate
pnpm dev                          # http://localhost:3333
```

Ou suba API e banco juntos com `docker compose up -d` (o `entrypoint.sh` aguarda o
PostgreSQL e roda as migrations antes de iniciar).

### 2. Front-end

```bash
cd jala-sales
cp .env.example .env.local        # NEXT_PUBLIC_API_URL, AUTH_*, SUPABASE_*
pnpm install
pnpm dev                          # http://localhost:3000
```

### Variáveis de ambiente

| Pacote | Variável | Descrição |
| --- | --- | --- |
| api | `PORT`, `HOST`, `NODE_ENV` | configuração do servidor |
| api | `DATABASE_URL` | string de conexão do PostgreSQL |
| api | `AUTH_SECRET`, `AUTH_EXPIRES_IN` | assinatura e expiração do JWT |
| web | `NEXT_PUBLIC_API_URL` | URL base da API (ex.: `http://localhost:3333/api`) |
| web | `AUTH_SECRET` | segredo do NextAuth |
| web | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | OAuth do Google |
| web | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_API_KEY` | Supabase Storage (avatares) |

---

## Scripts

| Pacote | Script | O que faz |
| --- | --- | --- |
| api | `pnpm dev` | servidor em watch mode (tsx) |
| api | `pnpm build` / `pnpm start` | build com tsup e execução de `dist/` |
| api | `pnpm test` / `test:coverage` | testes unitários com Vitest |
| api | `pnpm db:generate` / `db:migrate` / `db:studio` | Drizzle Kit |
| web | `pnpm dev` | Next.js com Turbopack |
| web | `pnpm build` / `pnpm start` | build e servidor de produção |
| ambos | `pnpm lint` / `pnpm format` | Biome |

## Qualidade e CI/CD

- **Biome** para lint e formatação; **Lefthook** roda o Biome no `pre-commit` e o
  **commitlint** (Conventional Commits) no `commit-msg`.
- **Vitest** para testes unitários dos use-cases da API.
- Pipelines GitLab CI (`.gitlab-ci.yml` em cada pacote): lint/build/test,
  quality gate no **SonarQube**, build e push de imagem Docker e deploy
  (blue/green no front). A infraestrutura da API é provisionada com
  **Ansible** (`jala-sales-api/playbooks`).
- Cada pacote tem seu próprio `Dockerfile` multi-stage; o front é servido atrás de
  um **Nginx** com TLS (`jala-sales/nginx`).
