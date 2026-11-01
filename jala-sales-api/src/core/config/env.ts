import { config } from "dotenv";

config({
  path: ".env.local",
});

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  AUTH_SECRET: z.string().min(10),
  AUTH_EXPIRES_IN: z.string(),
  PORT: z.coerce.number({ message: "PORT must be a number" }),
  HOST: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "Invalid environment variables:",
    _env.error.flatten().fieldErrors,
  );

  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
