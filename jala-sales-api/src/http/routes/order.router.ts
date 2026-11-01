import { createOrderController } from "@/models/order/controllers/create-order.controller";
import { getAllOrdersByCustomerController } from "@/models/order/controllers/get-all-orders.controller";
import { getOrderByIdController } from "@/models/order/controllers/get-order-by-id.controller";
import { updateOrderController } from "@/models/order/controllers/update-order.controller";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";

export default async function (app: FastifyInstance) {
  app.post("/", { onRequest: [verifyJwt] }, createOrderController);
  app.get("/", { onRequest: [verifyJwt] }, getAllOrdersByCustomerController);
  app.put("/:orderId", { onRequest: [verifyJwt] }, updateOrderController);
  app.get("/:orderId", { onRequest: [verifyJwt] }, getOrderByIdController);
}
