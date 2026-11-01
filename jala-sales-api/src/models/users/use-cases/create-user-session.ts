import type { UseCase } from "@/core/types/use-case";
import type { SessionRepository } from "@/models/users/repositories/session-repository";
import type { UserRepository } from "@/models/users/repositories/user-repository";

export interface CreateUserSessionInput {
  userId: string;
  accessToken: string;
  expiresAt: number;
  provider: "credentials" | "google";
}

export interface CreateUserSessionOutput {
  userId: string;
  accessToken: string;
  provider: "credentials" | "google";
  expiresAt: Date;
  id: string;
  issuedAt: Date;
}

export class CreateUserSession
  implements UseCase<CreateUserSessionInput, CreateUserSessionOutput>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute({
    userId,
    accessToken,
    provider,
    expiresAt,
  }: CreateUserSessionInput): Promise<CreateUserSessionOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const session = await this.sessionRepository.save({
      userId,
      accessToken,
      provider,
      expiresAt: new Date(expiresAt),
    });

    return session;
  }
}
