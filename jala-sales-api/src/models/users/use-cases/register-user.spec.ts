import { InMemoryUserRepository } from "@/models/users/repositories/in-memory/in-memory-user-repository";
import type { UserRepository } from "@/models/users/repositories/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUser } from "./register-user";

describe("Use Case -> Register User", () => {
  let userRepository: UserRepository;
  let sut: RegisterUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUser(userRepository);
  });

  it("should be able to register a new user", async () => {
    await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    const user = await userRepository.findByEmail("john.doe@example.com");

    expect(user).toBeTruthy();
    expect(user?.name).toBe("John Doe");
    expect(user?.email).toBe("john.doe@example.com");
  });

  it("should throw an error if user already exists with same email", async () => {
    await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    await expect(
      sut.execute({
        name: "John Smith",
        email: "john.doe@example.com",
        password: "123password",
      }),
    ).rejects.toThrow("User already exists");
  });
});
