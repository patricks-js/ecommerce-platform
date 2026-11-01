import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { users } from "./user";

export const providerEnum = pgEnum("provider", ["credentials", "google"]);

export const sessions = pgTable("tb_sessions", (t) => ({
  id: t
    .varchar({ length: 24 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  userId: t
    .uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  provider: providerEnum().default("credentials").notNull(),
  accessToken: t.text("access_token").notNull(),
  expiresAt: t.date("expires_at", { mode: "date" }).notNull(),
  issuedAt: t.timestamp("issued_at").defaultNow().notNull(),
}));

export const sessionsRelations = relations(sessions, ({ one }) => {
  return {
    user: one(users, {
      fields: [sessions.userId],
      references: [users.id],
      relationName: "user_sessions",
    }),
  };
});

export const insertSessionSchema = createInsertSchema(sessions);
export type CreateSessionInput = z.infer<typeof insertSessionSchema>;

export const selectSessionSchema = createSelectSchema(sessions);
export type Session = z.infer<typeof selectSessionSchema>;
