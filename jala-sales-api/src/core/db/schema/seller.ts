import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { users } from "./user";

export const sellerStatusEnum = pgEnum("seller_status", [
  "pending",
  "approved",
  "rejected",
]);

export const seller = pgTable("tb_seller_applies", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  userId: t
    .uuid()
    .references(() => users.id)
    .notNull(),
  status: sellerStatusEnum().default("pending").notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));

export const sellerRelations = relations(seller, ({ one }) => {
  return {
    user: one(users, {
      fields: [seller.userId],
      references: [users.id],
      relationName: "seller_user",
    }),
  };
});

export const insertSellerSchema = createInsertSchema(seller);
export type CreateSellerInput = z.infer<typeof insertSellerSchema>;

export const selectSellerSchema = createSelectSchema(seller);
export type Seller = z.infer<typeof selectSellerSchema>;
