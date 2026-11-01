import { db } from "@/core/db";
import {
  orderDetail,
  type CreateOrderDetailInput,
  type OrderDetail,
} from "@/core/db/schema/order-details";
import { makeGetOrderById } from "@/models/order/factories/make-get-order-by-id";
import { makeUpdateOrder } from "@/models/order/factories/make-update-order";
import { makeGetProductById } from "@/models/products/factories/make-get-product-by-id";
import { eq } from "drizzle-orm";
import type { OrderDetailRepository } from "./../order-detail-repository";
export class DrizzleOrderDetailRepository implements OrderDetailRepository {
  async createOrderDetail(data: CreateOrderDetailInput): Promise<OrderDetail> {
    try {
      const getProductById = makeGetProductById();
      const productId = data.productId;
      const product = await getProductById.execute({ productId });

      if (!product) {
        throw new Error("Product not found");
      }

      const getOrderById = makeGetOrderById();
      const orderId = data.orderId;
      const order = await getOrderById.execute({ orderId });

      if (!order) {
        throw new Error("Order not found");
      }

      const finalData = {
        ...data,
        totalPrice: product.price * (data.quantity || 1),
      };

      const [createdOrderDetail] = await db
        .insert(orderDetail)
        .values(finalData)
        .returning();

      if (!createdOrderDetail) {
        throw new Error("Failed to create order detail.");
      }

      order.totalAmount += createdOrderDetail.totalPrice;
      const updateOrder = makeUpdateOrder();
      await updateOrder.execute({
        orderId,
        data: { totalAmount: order.totalAmount },
      });

      return createdOrderDetail;
    } catch (error) {
      throw new Error(
        `Error creating order detail: ${(error as Error).message}`,
      );
    }
  }
  async getOrderDetailById(orderDetailId: string): Promise<OrderDetail | null> {
    try {
      const [returnOrderDetail] = await db
        .select()
        .from(orderDetail)
        .where(eq(orderDetail.orderDetailId, orderDetailId));
      return returnOrderDetail || null;
    } catch (error) {
      throw new Error(
        `Error retrieving order detail by ID: ${(error as Error).message}`,
      );
    }
  }
  async getAllOrdersDetail(orderId: string): Promise<OrderDetail[] | null> {
    try {
      const orders = await db
        .select()
        .from(orderDetail)
        .where(eq(orderDetail.orderId, orderId));
      return orders || null;
    } catch (error) {
      throw new Error(
        `Error retrieving order detail by order ID: ${(error as Error).message}`,
      );
    }
  }
  async updateOrderDetail(
    orderDetailId: string,
    data: Partial<CreateOrderDetailInput>,
  ): Promise<OrderDetail | null> {
    try {
      const [updateOrderDetail] = await db
        .update(orderDetail)
        .set(data)
        .where(eq(orderDetail.orderId, orderDetailId))
        .returning();

      if (!updateOrderDetail) {
        throw new Error("Failed to update order detail.");
      }
      return updateOrderDetail;
    } catch (error) {
      throw new Error(
        `Error updating order detail: ${(error as Error).message}`,
      );
    }
  }
  async deleteOrderDetail(orderDetailId: string): Promise<boolean> {
    try {
      const returnOrderDetail = await this.getOrderDetailById(orderDetailId);
      if (!returnOrderDetail) {
        throw new Error("Order detail not found.");
      }

      const getOrder = makeGetOrderById();
      const order = await getOrder.execute({
        orderId: returnOrderDetail.orderId,
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      order.totalAmount -= returnOrderDetail.totalPrice;

      const updateOrder = makeUpdateOrder();
      await updateOrder.execute({
        orderId: returnOrderDetail.orderId,
        data: { totalAmount: order.totalAmount },
      });

      const deletedRows = await db
        .delete(orderDetail)
        .where(eq(orderDetail.orderDetailId, orderDetailId));

      return deletedRows.length > 0;
    } catch (error) {
      throw new Error(
        `Error deleting order detail: ${(error as Error).message}`,
      );
    }
  }
}
