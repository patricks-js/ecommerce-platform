import type { FastifyReply, FastifyRequest } from "fastify";
import { GetAllUsers } from "../use-cases/get-all-users";

export async function getAllUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllUsers = new GetAllUsers();
  const { users } = await getAllUsers.execute();

  return users;
}
