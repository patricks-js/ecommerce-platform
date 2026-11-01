import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetUserByEmail } from "../factories/make-get-user-by-email";
import { makeRegisterUser } from "../factories/make-register-user";

export async function registerWithGoogleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string().url(),
  });

  const { name, email, image } = bodySchema.parse(request.body);

  const getUserByEmail = makeGetUserByEmail();

  const user = await getUserByEmail.execute(email);

  if (user) {
    return {
      userId: user.id,
    };
  }

  const registerUser = makeRegisterUser();

  const { userId } = await registerUser.execute({
    name,
    email,
    image,
  });

  return reply.status(201).send({ userId });
}
