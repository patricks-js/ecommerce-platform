import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { orderDetail } from "./order-details";
import { users } from "./user";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "sent",
  "delivered",
  "cancelled",
]);

export const order = pgTable("tb_order", (t) => ({
  orderId: t.uuid().defaultRandom().primaryKey().notNull(),
  customerId: t
    .uuid("customer")
    .references(() => users.id)
    .notNull(),
  orderDate: t.timestamp("order_at").defaultNow().notNull(),
  totalAmount: t.real("total_amount").default(0).notNull(),
  status: orderStatusEnum().default("pending").notNull(),
  shippingAddress: t.text("shipping_address").notNull(),
}));

export const orderRelations = relations(order, ({ one, many }) => ({
  customer: one(users, {
    fields: [order.customerId],
    references: [users.id],
  }),
  orderDetail: many(orderDetail),
}));

export const insertOrderSchema = createInsertSchema(order);
export type CreateOrderInput = z.infer<typeof insertOrderSchema>;

export const selectOrderSchema = createSelectSchema(order);
export type Order = z.infer<typeof selectOrderSchema>;
