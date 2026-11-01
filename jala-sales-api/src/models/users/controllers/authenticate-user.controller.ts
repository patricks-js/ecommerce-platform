import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUser } from "../factories/make-authenticate-user";

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = bodySchema.parse(request.body);

  const authenticateUser = makeAuthenticateUser();

  const { user } = await authenticateUser.execute({
    email,
    password,
  });

  const token = await reply.jwtSign({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user,
  };
}
