import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllSeller } from "../factories/make-get-all-sellers";

export async function getAllSellerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "admin") {
    return reply.status(403).send({
      error: "Permission denied. Only admin can get all sellers",
    });
  }

  const getAllSeller = makeGetAllSeller();
  try {
    const sellers = await getAllSeller.execute();
    return reply.status(200).send(sellers);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
