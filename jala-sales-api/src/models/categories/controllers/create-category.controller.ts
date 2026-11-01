import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateCategory } from "../factories/make-create-category";

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const data = bodySchema.parse(request.body);
  const { role: userRole } = request.user;

  if (!userRole || userRole !== "admin") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only admins can create categories." });
  }

  const createCategory = makeCreateCategory();

  try {
    const category = await createCategory.execute(data);
    return reply.status(200).send(category);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
