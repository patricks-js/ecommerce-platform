import { DrizzleUserRepository } from "@/models/users/repositories/drizzle/drizzle-user-repository";
import { AuthenticateUser } from "@/models/users/use-cases/authenticate-user";

export function makeAuthenticateUser() {
  const userRepository = new DrizzleUserRepository();
  return new AuthenticateUser(userRepository);
}
