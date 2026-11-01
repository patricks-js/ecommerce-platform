import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateCategory } from "../factories/make-update.category";

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    categoryId: z.string().uuid(),
  });

  const bodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

  const { categoryId } = paramsSchema.parse(request.params);
  const data = bodySchema.parse(request.body);
  const { role: userRole } = request.user;

  if (!userRole || userRole !== "admin") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only admins can update categories." });
  }

  const updateCategory = makeUpdateCategory();

  try {
    const updatedCategory = await updateCategory.execute({ categoryId, data });
    return reply.status(200).send(updatedCategory);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
