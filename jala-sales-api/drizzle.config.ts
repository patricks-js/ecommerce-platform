import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/core/db/schema",
  out: ".drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://docker:docker@jala-sales-db:5432/jala_sales_db",
  },
});
