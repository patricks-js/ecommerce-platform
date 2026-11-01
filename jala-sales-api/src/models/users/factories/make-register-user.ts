import { DrizzleUserRepository } from "@/models/users/repositories/drizzle/drizzle-user-repository";
import { RegisterUser } from "@/models/users/use-cases/register-user";

export function makeRegisterUser() {
  const userRepository = new DrizzleUserRepository();
  return new RegisterUser(userRepository);
}
