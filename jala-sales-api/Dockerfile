FROM node:20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:20-slim AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.drizzle ./.drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN apt-get update && apt-get install -y postgresql-client

RUN npm install -g pnpm
RUN pnpm install --prod

RUN chmod +x /app/entrypoint.sh

EXPOSE 3333

CMD ["/app/entrypoint.sh"]