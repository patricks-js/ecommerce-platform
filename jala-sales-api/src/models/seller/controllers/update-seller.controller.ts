import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateSeller } from "../factories/make-update-sellet";

export async function updateSellerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    sellerId: z.string(),
  });
  const { sellerId } = paramsSchema.parse(request.params);

  const bodySchema = z.object({
    status: z.enum(["pending", "approved", "rejected"]),
  });
  const data = bodySchema.parse(request.body);

  const { role: userRole } = request.user;
  if (!userRole || userRole !== "admin") {
    return reply.status(403).send({
      error: "Permission denied. Only admin can update seller",
    });
  }

  const updateSeller = makeUpdateSeller();

  try {
    const seller = await updateSeller.execute({
      sellerId,
      data,
    });
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
