import { db } from "@/core/db";
import { type CreateUserInput, type User, users } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import type { UserRepository } from "../user-repository";

export class DrizzleUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    return user ?? null;
  }

  async create(input: CreateUserInput): Promise<{ id: string }> {
    const [user] = await db.insert(users).values(input).returning({
      id: users.id,
    });

    if (!user) {
      throw new Error("Something went wrong");
    }

    return {
      id: user.id,
    };
  }

  async update(
    id: string,
    input: Partial<Pick<User, "name" | "email" | "image">>,
  ): Promise<void> {
    await db.update(users).set(input).where(eq(users.id, id));
  }
}
