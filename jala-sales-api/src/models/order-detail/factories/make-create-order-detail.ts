import { DrizzleOrderDetailRepository } from "../repositories/drizzle/drizzle-order-detail-repository";
import { CreateOrderDetail } from "../use-cases/create-order-detail";

export function makeCreateOrderDetail() {
  const orderDetailRepository = new DrizzleOrderDetailRepository();
  return new CreateOrderDetail(orderDetailRepository);
}
