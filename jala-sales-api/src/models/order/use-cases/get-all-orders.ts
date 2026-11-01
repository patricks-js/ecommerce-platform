import type { OrderRepository } from "../repositories/order-repository";

export interface GetAllOrdersByCustomer {
  customerId: string;
}

export class GetAllOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({ customerId }: GetAllOrdersByCustomer) {
    const orders =
      await this.orderRepository.getAllOrdersByCustomerId(customerId);
    if (!orders) {
      throw new Error("Orders not found");
    }
    return orders;
  }
}
