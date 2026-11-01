import type { CreateSessionInput, Session } from "@/core/db/schema";

export interface SessionRepository {
  save: (input: CreateSessionInput) => Promise<Session>;
}
