import type { CreateSellerInput } from "@/core/db/schema/seller";
import { beforeAll, describe, expect, it } from "vitest";
import { InMemorySellerRepository } from "../repositories/in-memory/in-memory-seller-repository";
import type { SellerRepository } from "../repositories/seller-repository";
import { CreateSeller } from "./apply-seller";

describe("Use Case -> Create seller", () => {
  let sellerRepository: SellerRepository;
  let sut: CreateSeller;

  beforeAll(() => {
    sellerRepository = new InMemorySellerRepository();
    sut = new CreateSeller(sellerRepository);
  });

  it("should apply a new seller successfully", async () => {
    const newSeller: CreateSellerInput = {
      userId: "user-id-exemplo",
      status: "pending",
    };

    const result = await sut.execute(newSeller);
    expect(result).toHaveProperty("id");
    expect(result.status).toBe("pending");
    expect(result.userId).toBe(newSeller.userId);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });
});
