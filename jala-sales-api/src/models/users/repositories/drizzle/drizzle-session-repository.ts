import { db } from "@/core/db";
import {
  sessions,
  type CreateSessionInput,
  type Session,
} from "@/core/db/schema";
import type { SessionRepository } from "../session-repository";

export class DrizzleSessionRepository implements SessionRepository {
  async save(input: CreateSessionInput): Promise<Session> {
    const [session] = await db.insert(sessions).values(input).returning();

    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  }
}
