import type { CreateOrderInput, Order } from "@/core/db/schema/order";
import type { OrderRepository } from "../repositories/order-repository";

export interface CreateOrderInputExtended extends CreateOrderInput {
  customerId: string;
}

export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(data: CreateOrderInputExtended): Promise<Order> {
    const order = await this.orderRepository.createOrder(data);
    return order;
  }
}
