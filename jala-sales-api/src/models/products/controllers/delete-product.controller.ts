import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteProduct } from "../factories/make-delete-product";

export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    productId: z.string(),
  });

  const { productId } = paramsSchema.parse(request.params);

  const { userId: sellerId } = request.user;
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "seller") {
    return reply
      .status(403)
      .send({ error: "Permission denied. Only sellers can create products." });
  }

  const deleteProduct = makeDeleteProduct();

  try {
    await deleteProduct.execute({ productId, sellerId });
    return reply.status(200).send("product deleted successfully");
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
