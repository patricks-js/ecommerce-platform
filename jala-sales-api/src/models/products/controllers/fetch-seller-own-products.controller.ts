import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListSellerProducts } from "../factories/make-list-seller-products";

export async function fetchSellerOwnProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    sellerId: z.string(),
  });

  const querySchema = z.object({
    limit: z.number().optional().default(10),
    offset: z.number().optional().default(0),
  });

  const { sellerId } = paramsSchema.parse(request.params);
  const { limit, offset } = querySchema.parse(request.query);
  const listSellerProducts = makeListSellerProducts();

  try {
    const products = await listSellerProducts.execute({
      sellerId,
      limit,
      offset,
    });
    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
