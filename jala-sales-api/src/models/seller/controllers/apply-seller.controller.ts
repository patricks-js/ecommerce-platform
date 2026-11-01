import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateSeller } from "../factories/make-apply-seller";

export async function applySellerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "customer") {
    return reply.status(403).send({
      error: "Permission denied. Only customer can apply from seller",
    });
  }

  const createSeller = makeCreateSeller();

  try {
    const seller = await createSeller.execute({ userId: request.user.userId });
    return reply.status(200).send(seller);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
