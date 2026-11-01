import { db } from "@/core/db";
import {
  order,
  type CreateOrderInput,
  type Order,
} from "@/core/db/schema/order";
import { eq } from "drizzle-orm";
import type { OrderRepository } from "../order-repository";

export class DrizzleOrderRepository implements OrderRepository {
  async createOrder(data: CreateOrderInput): Promise<Order> {
    try {
      const [createdOrder] = await db.insert(order).values(data).returning();

      if (!createdOrder) {
        throw new Error("Failed to create order.");
      }

      return createdOrder;
    } catch (error) {
      throw new Error(`Error creating order: ${(error as Error).message}`);
    }
  }
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const [returnOrder] = await db
        .select()
        .from(order)
        .where(eq(order.orderId, orderId));
      return returnOrder || null;
    } catch (error) {
      throw new Error(
        `Error retrieving order by ID: ${(error as Error).message}`,
      );
    }
  }
  async updateOrder(
    orderId: string,
    data: Partial<CreateOrderInput>,
  ): Promise<Order | null> {
    try {
      const [updateOrder] = await db
        .update(order)
        .set(data)
        .where(eq(order.orderId, orderId))
        .returning();
      if (!updateOrder) {
        throw new Error("Failed to update order.");
      }
      return updateOrder;
    } catch (error) {
      throw new Error(`Error updating order: ${(error as Error).message}`);
    }
  }
  async getAllOrdersByCustomerId(customerId: string): Promise<Order[] | null> {
    try {
      const orders = await db
        .select()
        .from(order)
        .where(eq(order.customerId, customerId));
      return orders || null;
    } catch (error) {
      throw new Error(
        `Error retrieving order by seller ID: ${(error as Error).message}`,
      );
    }
  }
}
