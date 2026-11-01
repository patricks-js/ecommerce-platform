import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListSortProducts } from "../factories/make-list-sort-products";

export async function fetchSortedProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    query: z.string().optional().default("name"),
    sort: z.string().optional().default("asc"),
  });

  let { query, sort } = querySchema.parse(request.query);

  const validQueryFilters = ["name", "price"];
  const validSortFilters = ["asc", "desc"];

  if (!validQueryFilters.includes(query)) {
    query = "name";
  }
  if (!validSortFilters.includes(sort)) {
    sort = "asc";
  }
  const listSortProducts = makeListSortProducts();

  try {
    const products = await listSortProducts.execute({ query, sort });
    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
