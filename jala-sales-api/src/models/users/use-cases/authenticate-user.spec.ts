import { InMemoryUserRepository } from "@/models/users/repositories/in-memory/in-memory-user-repository.js";
import bcrypt from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUser } from "./authenticate-user";

describe("Use Case -> Authenticate User", () => {
  let userRepository: InMemoryUserRepository;
  let sut: AuthenticateUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUser(userRepository);
  });

  it("should be able to authenticate a user", async () => {
    const email = "email@mail.com";
    const password = "P@ssw0rd";
    const passwordHash = await bcrypt.hash(password, 7);

    await userRepository.create({
      name: "John Doe",
      email,
      passwordHash,
    });

    const result = await sut.execute({
      email,
      password,
    });

    expect(result).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
      }),
    });
  });

  it("should throw an error if the user is not found by email", async () => {
    const email = "email@mail.com";

    await expect(
      sut.execute({
        email,
        password: "P@ssw0rd",
      }),
    ).rejects.toThrow("Invalid Credentials");
  });

  it("should throw an error if the password does not match", async () => {
    const email = "email@mail.com";

    await userRepository.create({
      name: "John Doe",
      email,
      passwordHash: "passwordhashed",
    });

    await expect(
      sut.execute({
        email,
        password: "invalidpassword",
      }),
    ).rejects.toThrow("Invalid Credentials");
  });
});
