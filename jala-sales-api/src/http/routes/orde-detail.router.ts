import { createOrderDetailController } from "@/models/order-detail/controllers/create-order-detail.controller";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";

export default async function (app: FastifyInstance) {
  app.post("/", { onRequest: [verifyJwt] }, createOrderDetailController);
}
