import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateProduct } from "../factories/make-create-product";

export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.coerce.number().positive(),
    stock: z.number(),
    categoryId: z.string(),
    image: z.string().optional(),
    sellerId: z.string(),
  });

  const data = bodySchema.parse(request.body);
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "seller") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only sellers can create products." });
  }

  const createProduct = makeCreateProduct();

  try {
    const product = await createProduct.execute(data);
    return reply.status(200).send(product);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
