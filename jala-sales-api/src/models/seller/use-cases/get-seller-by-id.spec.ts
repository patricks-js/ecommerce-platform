import type { CreateSellerInput } from "@/core/db/schema/seller";
import { beforeAll, describe, expect, it } from "vitest";
import { InMemorySellerRepository } from "../repositories/in-memory/in-memory-seller-repository";
import type { SellerRepository } from "../repositories/seller-repository";
import { CreateSeller } from "./apply-seller";
import { GetSellerById } from "./get-seller-by-id";

describe("Use case -: Get Seller By Id", () => {
  let sellerRepository: SellerRepository;
  let sut: GetSellerById;
  let sutCreate: CreateSeller;

  beforeAll(() => {
    sellerRepository = new InMemorySellerRepository();
    sut = new GetSellerById(sellerRepository);
    sutCreate = new CreateSeller(sellerRepository);
  });

  it("should retrieve an existing seller by ID", async () => {
    const newSeller: CreateSellerInput = {
      userId: "user-id-exemplo",
      status: "pending",
    };

    const createdSeller = await sutCreate.execute(newSeller);
    const foundSeller = await sut.execute({ sellerId: createdSeller.id });

    expect(foundSeller).toEqual(createdSeller);
  });

  it("should throw error when trying to retrieve a non-existent seller", async () => {
    const newSeller: CreateSellerInput = {
      userId: "user-id-exemplo",
      status: "pending",
    };

    await sutCreate.execute(newSeller);
    const invalidId = "id-invalido";

    await expect(sut.execute({ sellerId: invalidId })).rejects.toThrow(
      "Seller not found",
    );
  });
});
