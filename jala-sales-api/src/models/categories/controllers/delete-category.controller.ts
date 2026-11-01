import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteCategory } from "../factories/make-delete-category";

export async function deleteCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    categoryId: z.string().uuid(),
  });

  const { categoryId } = paramsSchema.parse(request.params);
  const { role: userRole } = request.user;

  if (!userRole || userRole !== "admin") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only admins can delete categories." });
  }

  const deleteCategory = makeDeleteCategory();

  try {
    await deleteCategory.execute({ categoryId });
    return reply
      .status(200)
      .send({ message: "Category deleted successfully." });
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
