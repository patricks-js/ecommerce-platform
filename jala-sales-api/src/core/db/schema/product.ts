import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { categories } from "./category";
import { orderDetail } from "./order-details";
import { users } from "./user";

export const productStatusEnum = pgEnum("product_status", [
  "available",
  "unavailable",
]);

export const products = pgTable("tb_products", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  description: t.text(),
  price: t.real().notNull(),
  stock: t.integer().notNull(),
  image: t.text(),
  categoryId: t
    .text()
    .references(() => categories.id)
    .notNull(),
  status: productStatusEnum().default("available").notNull(),
  sellerId: t
    .uuid()
    .references(() => users.id)
    .notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  seller: one(users, {
    fields: [products.sellerId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderDetails: many(orderDetail),
}));

export const insertProductSchema = createInsertSchema(products);
export type CreateProductInput = z.infer<typeof insertProductSchema>;

export const selectProductSchema = createSelectSchema(products);
export type Product = z.infer<typeof selectProductSchema>;
