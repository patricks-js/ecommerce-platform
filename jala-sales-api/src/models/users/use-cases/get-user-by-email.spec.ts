import { InMemoryUserRepository } from "@/models/users/repositories/in-memory/in-memory-user-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserByEmail } from "./get-user-by-email";

describe("Use Case -> Get User By Email", () => {
  let userRepository: InMemoryUserRepository;
  let sut: GetUserByEmail;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserByEmail(userRepository);
  });

  it("should be able to get a user by email", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      passwordHash: "password123",
    });

    const user = await sut.execute("john.doe@example.com");

    expect(user).toBeTruthy();
    expect(user?.name).toBe("John Doe");
    expect(user?.email).toBe("john.doe@example.com");
  });

  it("should return null if user does not exist", async () => {
    const user = await sut.execute("john.doe@example.com");

    expect(user).toBeNull();
  });
});
