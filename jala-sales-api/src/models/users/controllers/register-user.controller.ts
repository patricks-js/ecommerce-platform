import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUser } from "../factories/make-register-user";

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = bodySchema.parse(request.body);

  const registerUser = makeRegisterUser();

  await registerUser.execute({
    name,
    email,
    password,
  });

  return reply.status(201).send();
}
