import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListProductByPrice } from "../factories/make-get-product-by-price";

export async function fetchProductsByPriceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    low_price: z.coerce.number(),
    high_price: z.coerce.number(),
  });
  const { low_price: low, high_price: high } = querySchema.parse(request.query);

  const listProductsByPrice = makeListProductByPrice();

  try {
    const products = await listProductsByPrice.execute(low, high);
    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
