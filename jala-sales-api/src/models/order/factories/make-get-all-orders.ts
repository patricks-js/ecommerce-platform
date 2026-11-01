import { DrizzleOrderRepository } from "../repositories/drizzle/drizzle-order-repository";
import { GetAllOrders } from "../use-cases/get-all-orders";

export function makeGetAllOrdersByCustomerId() {
  const orderRepository = new DrizzleOrderRepository();
  return new GetAllOrders(orderRepository);
}
