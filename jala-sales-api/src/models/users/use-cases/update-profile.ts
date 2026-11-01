import type { User } from "@/core/db/schema";
import type { UseCase } from "@/core/types/use-case";
import type { UserRepository } from "@/models/users/repositories/user-repository";

export interface UpdateProfileInput {
  id: string;
  input: Partial<Pick<User, "name" | "email" | "image">>;
}

export interface UpdateProfileOutput {
  userId: string;
}

export class UpdateProfile
  implements UseCase<UpdateProfileInput, UpdateProfileOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateProfileInput): Promise<UpdateProfileOutput> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new Error("User not found");
    }

    this.userRepository.update(input.id, {
      name: input.input.name,
      email: input.input.email,
      image: input.input.image,
    });

    return {
      userId: user.id,
    };
  }
}
