import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateOrder } from "../factories/make-update-order";
export async function updateOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    orderId: z.string(),
  });
  const { orderId } = paramsSchema.parse(request.params);

  const bodySchema = z.object({
    totalAmount: z.coerce.number().optional(),
    status: z.enum(["pending", "sent", "delivered", "cancelled"]).optional(),
    shippingAddress: z.string().optional(),
  });
  const data = bodySchema.parse(request.body);

  const { role: userRole } = request.user;
  if (!userRole || userRole !== "customer") {
    return reply.status(403).send({
      error: "Permission denied. Only customer can update order",
    });
  }

  const updateOrder = makeUpdateOrder();

  try {
    const order = await updateOrder.execute({
      orderId,
      data,
    });
    return reply.status(200).send(order);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
