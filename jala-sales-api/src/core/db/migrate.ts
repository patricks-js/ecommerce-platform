import { env } from "@/core/config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(sql);
try {
  await migrate(db, { migrationsFolder: ".drizzle" });
  console.log("Database schema migrated successfully");
} catch (e) {
  console.log(e);
  process.exit(1);
} finally {
  await sql.end();
}
