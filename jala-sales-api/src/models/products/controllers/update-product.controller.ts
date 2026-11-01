import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateProduct } from "../factories/make-update-product";

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    productId: z.string(),
  });

  const bodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.coerce.number().optional(),
    stock: z.number().optional(),
    categoryId: z.string().uuid(),
    image: z.string().optional(),
    status: z.enum(["available", "unavailable"]).optional(),
  });

  const { productId } = paramsSchema.parse(request.params);
  const data = bodySchema.parse(request.body);

  const { userId: sellerId } = request.user;
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "seller") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only sellers can create products." });
  }

  const updateProduct = makeUpdateProduct();

  try {
    const product = await updateProduct.execute({
      productId,
      sellerId,
      data,
    });
    return reply.status(200).send(product);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
