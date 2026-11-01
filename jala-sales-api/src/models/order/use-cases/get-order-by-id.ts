import type { OrderRepository } from "../repositories/order-repository";

export interface GetOrderByIdInput {
  orderId: string;
}

export class GetOrderById {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ orderId }: GetOrderByIdInput) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }
}
