import { app } from "@/core/config/app";
import { env } from "@/core/config/env";

const port = env.PORT;
const host = env.HOST ?? "0.0.0.0";

try {
  await app.listen({
    port,
    host,
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
