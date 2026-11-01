import { DrizzleSessionRepository } from "@/models/users/repositories/drizzle/drizzle-session-repository";
import { DrizzleUserRepository } from "@/models/users/repositories/drizzle/drizzle-user-repository";
import { CreateUserSession } from "@/models/users/use-cases/create-user-session";

export function makeCreateUserSession() {
  const userRepository = new DrizzleUserRepository();
  const sessionRepository = new DrizzleSessionRepository();
  return new CreateUserSession(userRepository, sessionRepository);
}
