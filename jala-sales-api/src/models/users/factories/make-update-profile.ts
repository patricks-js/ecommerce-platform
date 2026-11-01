import { DrizzleUserRepository } from "../repositories/drizzle/drizzle-user-repository";
import { UpdateProfile } from "../use-cases/update-profile";

export function makeUpdateProfile() {
  const userRepository = new DrizzleUserRepository();
  return new UpdateProfile(userRepository);
}
