import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetOrderById } from "../factories/make-get-order-by-id";
export async function getOrderByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    orderId: z.string(),
  });

  const { orderId } = paramsSchema.parse(request.params);

  const { role: userRole } = request.user;
  if (!userRole || userRole !== "customer") {
    return reply.status(403).send({
      error: "Permission denied. Only customer can get order by id",
    });
  }

  const getOrderById = makeGetOrderById();

  try {
    const order = await getOrderById.execute({ orderId });
    return reply.status(200).send(order);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
