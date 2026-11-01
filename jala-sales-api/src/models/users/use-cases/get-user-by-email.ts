import type { User } from "@/core/db/schema";
import type { UseCase } from "@/core/types/use-case";
import type { UserRepository } from "@/models/users/repositories/user-repository";

export class GetUserByEmail implements UseCase<string, User | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
