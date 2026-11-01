import type { CreateUserInput, User } from "@/core/db/schema";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<{ id: string }>;
  update(
    id: string,
    input: Partial<Pick<User, "name" | "email" | "image">>,
  ): Promise<void>;
}
