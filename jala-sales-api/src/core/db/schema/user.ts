import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { order } from "./order";
import { sessions } from "./session";

export const roleEnum = pgEnum("role", ["customer", "seller", "admin"]);
export const statusEnum = pgEnum("status", ["active", "inactive"]);

export const users = pgTable("tb_users", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).unique().notNull(),
  passwordHash: t.text("password_hash"),
  image: t.text("image"),
  role: roleEnum().default("customer").notNull(),
  status: statusEnum().default("active").notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));

export const usersRelations = relations(users, ({ many }) => {
  return {
    sessions: many(sessions, {
      relationName: "user_sessions",
    }),
    orders: many(order),
  };
});

export const insertUserSchema = createInsertSchema(users);
export type CreateUserInput = z.infer<typeof insertUserSchema>;

export const selectUserSchema = createSelectSchema(users);
export type User = z.infer<typeof selectUserSchema>;
