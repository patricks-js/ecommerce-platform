import type { CreateOrderInput, Order } from "@/core/db/schema/order";

export interface OrderRepository {
  createOrder(data: CreateOrderInput): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  updateOrder(
    orderId: string,
    data: Partial<CreateOrderInput>,
  ): Promise<Order | null>;
  getAllOrdersByCustomerId(customerId: string): Promise<Order[] | null>;
}
