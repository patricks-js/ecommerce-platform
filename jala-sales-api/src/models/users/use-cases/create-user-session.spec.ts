import { InMemorySessionRepository } from "@/models/users/repositories/in-memory/in-memory-session-repository";
import { InMemoryUserRepository } from "@/models/users/repositories/in-memory/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserSession } from "./create-user-session";

describe("Use Case -> Create User Session", () => {
  let userRepository: InMemoryUserRepository;
  let sessionRepository: InMemorySessionRepository;
  let sut: CreateUserSession;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sessionRepository = new InMemorySessionRepository();
    sut = new CreateUserSession(userRepository, sessionRepository);
  });

  it("should be able to create a new user session", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      passwordHash: "password123",
    });

    const user = await userRepository.findByEmail("john.doe@example.com");

    if (!user) {
      return;
    }

    const session = await sut.execute({
      userId: user.id,
      accessToken: "accessToken",
      provider: "credentials",
      expiresAt: new Date().getTime() + 1000 * 60 * 60,
    });

    expect(session).toBeTruthy();
    expect(session.userId).toBe(user.id);
    expect(session.accessToken).toBe("accessToken");
    expect(session.provider).toBe("credentials");
  });
});
