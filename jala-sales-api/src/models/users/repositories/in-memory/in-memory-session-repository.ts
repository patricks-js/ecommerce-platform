import type { CreateSessionInput, Session } from "@/core/db/schema";
import { createId } from "@paralleldrive/cuid2";
import type { SessionRepository } from "../session-repository";

export class InMemorySessionRepository implements SessionRepository {
  #items: Session[] = [];

  async save(input: CreateSessionInput): Promise<Session> {
    const session: Session = {
      id: input.id ?? createId(),
      userId: input.userId,
      accessToken: input.accessToken,
      provider: input.provider ?? "credentials",
      expiresAt: input.expiresAt,
      issuedAt: input.issuedAt ?? new Date(),
    };

    this.#items.push(session);

    return session;
  }
}
