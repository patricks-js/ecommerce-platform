import type { FastifyReply, FastifyRequest } from "fastify";
import { GetPendingSellers } from "../use-cases/get-pending-sellers";

export async function getPendingSellersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const role = request.user.role;
  if (!role || role !== "admin") {
    return reply.status(403).send({
      error: "Permission denied. Only admin can access pending sellers.",
    });
  }

  const getPendingSellers = new GetPendingSellers();
  try {
    const pendingSellers = await getPendingSellers.execute();
    return reply.status(200).send(pendingSellers);
  } catch (error) {
    return reply.status(404).send({ error: (error as Error).message });
  }
}
