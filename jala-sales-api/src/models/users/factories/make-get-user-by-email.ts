import { DrizzleUserRepository } from "@/models/users/repositories/drizzle/drizzle-user-repository";
import { GetUserByEmail } from "@/models/users/use-cases/get-user-by-email";

export function makeGetUserByEmail() {
  const userRepository = new DrizzleUserRepository();
  return new GetUserByEmail(userRepository);
}
