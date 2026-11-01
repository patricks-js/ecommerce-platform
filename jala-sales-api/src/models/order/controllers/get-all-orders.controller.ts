import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllOrdersByCustomerId } from "../factories/make-get-all-orders";
export async function getAllOrdersByCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "customer") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only customer can get orders." });
  }

  const getAllOrdersByCustomer = makeGetAllOrdersByCustomerId();

  try {
    const orders = await getAllOrdersByCustomer.execute({
      customerId: request.user.userId,
    });
    return reply.status(200).send(orders);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
