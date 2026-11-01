import { DrizzleOrderRepository } from "../repositories/drizzle/drizzle-order-repository";
import { UpdateOrder } from "../use-cases/update-order";

export function makeUpdateOrder() {
  const orderRepository = new DrizzleOrderRepository();
  return new UpdateOrder(orderRepository);
}
