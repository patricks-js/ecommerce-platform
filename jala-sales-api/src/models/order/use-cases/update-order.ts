import type { Order } from "@/core/db/schema/order";
import type { OrderRepository } from "../repositories/order-repository";

export interface UpdateOrderInput {
  orderId: string;
  data: Partial<Omit<Order, "id" | "createdAt" | "updatedAt">>;
}

export class UpdateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ orderId, data }: UpdateOrderInput): Promise<Order | null> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    const updatedOrder = await this.orderRepository.updateOrder(orderId, data);
    return updatedOrder;
  }
}
