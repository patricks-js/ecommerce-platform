import type {
  CreateOrderDetailInput,
  OrderDetail,
} from "@/core/db/schema/order-details";

export interface OrderDetailRepository {
  createOrderDetail(data: CreateOrderDetailInput): Promise<OrderDetail>;
  getOrderDetailById(orderDetailId: string): Promise<OrderDetail | null>;
  getAllOrdersDetail(orderId: string): Promise<OrderDetail[] | null>;
  updateOrderDetail(
    orderDetailId: string,
    data: Partial<CreateOrderDetailInput>,
  ): Promise<OrderDetail | null>;
  deleteOrderDetail(orderDetailId: string): Promise<boolean>;
}
