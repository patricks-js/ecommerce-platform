import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { role: userRole } = request.user;

  if (!userRole || userRole !== "admin") {
    return reply.status(403).send({
      statusCode: 403,
      error: "Forbidden",
      message: "Permission denied. Only admins are allowed.",
    });
  }
}
