import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { order } from "./order";
import { products } from "./product";

export const orderDetail = pgTable("tb_order_detail", (t) => ({
  orderDetailId: t.uuid().defaultRandom().primaryKey().notNull(),
  orderId: t
    .uuid()
    .references(() => order.orderId)
    .notNull(),
  productId: t
    .uuid()
    .references(() => products.id)
    .notNull(),
  quantity: t.integer().default(1).notNull(),
  totalPrice: t.real("total_price").default(0).notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));

export const orderDetailsRelations = relations(orderDetail, ({ one }) => ({
  order: one(order, {
    fields: [orderDetail.orderId],
    references: [order.orderId],
  }),
  product: one(products, {
    fields: [orderDetail.productId],
    references: [products.id],
  }),
}));

export const insertOrderDetailSchema = createInsertSchema(orderDetail);
export type CreateOrderDetailInput = z.infer<typeof insertOrderDetailSchema>;

export const selectOrderDetailsSchema = createSelectSchema(orderDetail);
export type OrderDetail = z.infer<typeof selectOrderDetailsSchema>;
