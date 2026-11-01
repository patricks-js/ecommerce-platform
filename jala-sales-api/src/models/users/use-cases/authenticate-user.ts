import type { User } from "@/core/db/schema";
import type { UseCase } from "@/core/types/use-case";
import type { UserRepository } from "@/models/users/repositories/user-repository";
import bcrypt from "bcryptjs";

export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export interface AuthenticateUserOutput {
  user: User;
}

export class AuthenticateUser
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new Error("Invalid Credentials");
    }

    if (!existingUser.passwordHash) {
      throw new Error("Invalid Login Method");
    }

    const isPasswordCorrect = await bcrypt.compare(
      input.password,
      existingUser.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }

    return {
      user: {
        ...existingUser,
        passwordHash: null,
      },
    };
  }
}
