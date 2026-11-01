import type { CreateUserInput, User } from "@/core/db/schema";
import type { UserRepository } from "@/models/users/repositories/user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
  #items: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.#items.find((item) => item.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.#items.find((item) => item.email === email) ?? null;
  }

  async create(input: CreateUserInput): Promise<{ id: string }> {
    const user: User = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash ?? "",
      role: input.role ?? "customer",
      status: input.status ?? "active",
      image: "",
      createdAt: input.createdAt ?? new Date(),
      updatedAt: input.updatedAt ?? new Date(),
    };

    this.#items.push(user);

    return {
      id: user.id,
    };
  }

  async update(
    id: string,
    input: Partial<Pick<User, "name" | "email" | "image">>,
  ): Promise<void> {
    const user = this.#items.find((item) => item.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    Object.assign(user, input);
  }
}
