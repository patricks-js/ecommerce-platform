import { makeGetOrderById } from "@/models/order/factories/make-get-order-by-id";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateOrderDetail } from "../factories/make-create-order-detail";
export async function createOrderDetailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    orderId: z.string(),
    productId: z.string(),
    quantity: z.coerce.number(),
  });

  const data = bodySchema.parse(request.body);
  const { role: userRole } = request.user;
  if (!userRole || userRole !== "customer") {
    return reply.status(403).send({
      error: "Permission denied. Only customer can create order details.",
    });
  }

  const getOrderById = makeGetOrderById();
  const order = await getOrderById.execute({ orderId: data.orderId });
  if (order.customerId !== request.user.userId) {
    return reply.status(404).send({
      error:
        "Permission denied. Only user owner of the order can create the order details",
    });
  }

  const createOrderDetail = makeCreateOrderDetail();

  try {
    const orderDetails = await createOrderDetail.execute(data);
    return reply.status(200).send(orderDetails);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
