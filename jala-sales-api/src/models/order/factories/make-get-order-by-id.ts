import { DrizzleOrderRepository } from "../repositories/drizzle/drizzle-order-repository";
import { GetOrderById } from "../use-cases/get-order-by-id";

export function makeGetOrderById() {
  const orderRepository = new DrizzleOrderRepository();
  return new GetOrderById(orderRepository);
}
