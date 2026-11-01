import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListProductsByCategory } from "../factories/make-get-products-by-category";

export async function fetchProductsByCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    categoryId: z.string().uuid(),
  });

  const { categoryId } = querySchema.parse(request.query);
  const listProductsByCategory = makeListProductsByCategory();

  try {
    const products = await listProductsByCategory.execute(categoryId);
    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
