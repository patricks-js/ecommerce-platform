import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetSellerById } from "../factories/make-get-seller-by-id";

export async function getSellerByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    sellerId: z.string(),
  });
  const { sellerId } = paramsSchema.parse(request.params);

  const { role: userRole } = request.user;
  if (!userRole || userRole !== "admin") {
    return reply.status(403).send({
      error: "Permission denied. Only admin can get seller by id",
    });
  }

  const getSellerById = makeGetSellerById();

  try {
    const seller = await getSellerById.execute({ sellerId });
    return reply.status(200).send(seller);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
