import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateProfile } from "../factories/make-update-profile";

export async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().url().optional(),
  });

  const { name, email, image } = bodySchema.parse(request.body);

  const getUserByEmail = makeUpdateProfile();

  await getUserByEmail.execute({
    id: request.user.userId,
    input: {
      email,
      name,
      image,
    },
  });

  return reply.status(204).send();
}
