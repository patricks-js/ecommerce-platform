import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error: unknown) {
    const message = {
      statusCode: 401,
      error: "Unauthorized",
      message: "You are not authorized to access this resource",
    };

    return reply.status(message.statusCode).send(message);
  }
}
