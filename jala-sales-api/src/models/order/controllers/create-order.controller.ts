import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateOrder } from "../factories/make-create-order";

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    customerId: z.string(),
    shippingAddress: z.string(),
  });

  const data = bodySchema.parse(request.body);
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "customer") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only customer can create orders." });
  }

  const createOrder = makeCreateOrder();

  try {
    const order = await createOrder.execute(data);
    return reply.status(200).send(order);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
