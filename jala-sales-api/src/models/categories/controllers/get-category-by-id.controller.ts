import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetCategoryById } from "../factories/make-get-category-by-id";

export async function getCategoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    categoryId: z.string().uuid(),
  });

  const { categoryId } = paramsSchema.parse(request.params);

  const getCategoryById = makeGetCategoryById();

  try {
    const category = await getCategoryById.execute({ categoryId });
    return reply.status(200).send(category);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
