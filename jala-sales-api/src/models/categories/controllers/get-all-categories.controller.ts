import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllCategories } from "../factories/make-all-categories";
export async function getAllCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role: userRole } = request.user;

  if (!userRole || userRole !== "admin") {
    return reply.status(403).send({
      error: "Permission denied. Only admins can get all categories.",
    });
  }

  const getAllCategories = makeGetAllCategories();

  try {
    const categories = await getAllCategories.execute();
    return reply.status(200).send(categories);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
