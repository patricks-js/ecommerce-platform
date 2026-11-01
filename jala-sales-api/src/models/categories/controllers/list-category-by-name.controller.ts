import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListCategoryByName } from "../factories/make-list-category-by-name";

export async function listCategoryByNameController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    name: z.string(),
  });

  const { name } = querySchema.parse(request.query);

  const listCategoryByName = makeListCategoryByName();

  try {
    const categories = await listCategoryByName.execute(name);
    return reply.status(200).send(categories);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
