import { db } from "@/core/db";
import { users, type User } from "@/core/db/schema";
import type { UseCase } from "@/core/types/use-case";

export interface UpdateProfileOutput {
  users: User[];
}

export class GetAllUsers implements UseCase<void, UpdateProfileOutput> {
  async execute(): Promise<UpdateProfileOutput> {
    const returnedUsers = await db.select().from(users);

    return {
      users: returnedUsers,
    };
  }
}
