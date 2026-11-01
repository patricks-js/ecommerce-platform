import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetProductById } from "../factories/make-get-product-by-id";

export async function getProductByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    productId: z.string(),
  });

  const { productId } = paramsSchema.parse(request.params);
  const getProductById = makeGetProductById();

  const product = await getProductById.execute({ productId });
  return reply.status(200).send(product);
}
