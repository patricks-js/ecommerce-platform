import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUserSession } from "../factories/make-create-user-session";

export async function createUserSessionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    provider: z.enum(["credentials", "google"]),
  });

  const { provider } = bodySchema.parse(request.body);
  const { userId, exp } = request.user;
  const accessToken = request.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    const message = {
      statusCode: 401,
      error: "Unauthorized",
      message: "You are not authorized to access this resource",
    };

    return reply.status(message.statusCode).send(message);
  }

  const createUserSession = makeCreateUserSession();

  const session = await createUserSession.execute({
    userId,
    accessToken,
    provider,
    expiresAt: exp * 1000,
  });

  return {
    session,
  };
}
