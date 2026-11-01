import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListProductsByName } from "../factories/make-get-products-by-name";

export async function fetchProductsByNameController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    name: z.string(),
  });

  const { name } = querySchema.parse(request.query);
  const listProductsByName = makeListProductsByName();
  try {
    const products = await listProductsByName.execute(name);
    if (products.length === 0) {
      return reply.status(404).send("No products found with this name.");
    }
    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
