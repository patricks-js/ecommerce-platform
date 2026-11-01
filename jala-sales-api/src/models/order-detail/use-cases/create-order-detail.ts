import type { OrderDetail } from "@/core/db/schema/order-details";
import type { OrderDetailRepository } from "../repositories/order-detail-repository";
import type { CreateOrderDetailInput } from "./../../../core/db/schema/order-details";

export interface CreateOrderDetailInputExtend extends CreateOrderDetailInput {
  orderId: string;
  productId: string;
}

export class CreateOrderDetail {
  constructor(private readonly orderDetailRepository: OrderDetailRepository) {}

  async execute(data: CreateOrderDetailInputExtend): Promise<OrderDetail> {
    const orderDetail =
      await this.orderDetailRepository.createOrderDetail(data);
    return orderDetail;
  }
}
