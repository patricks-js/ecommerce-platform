import { DrizzleOrderRepository } from "../repositories/drizzle/drizzle-order-repository";
import { CreateOrder } from "../use-cases/create-order";

export function makeCreateOrder() {
  const orderRepository = new DrizzleOrderRepository();
  return new CreateOrder(orderRepository);
}
