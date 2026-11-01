import { HASH_SALT } from "@/core/config/constants";
import type { UseCase } from "@/core/types/use-case";
import type { UserRepository } from "@/models/users/repositories/user-repository";
import bcrypt from "bcryptjs";

export interface RegisterUserInput {
  name: string;
  email: string;
  password?: string;
  image?: string;
}

export interface RegisterUserOutput {
  userId: string;
}

export class RegisterUser
  implements UseCase<RegisterUserInput, RegisterUserOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const userExistsWithSameEmail = await this.userRepository.findByEmail(
      input.email,
    );

    if (userExistsWithSameEmail) {
      throw new Error("User already exists");
    }

    let passwordHash: string | null = null;

    if (input.password) {
      passwordHash = await bcrypt.hash(input.password, HASH_SALT);
    }

    const { id } = await this.userRepository.create({
      name: input.name,
      email: input.email,
      image: input.image,
      passwordHash,
    });

    return {
      userId: id,
    };
  }
}
