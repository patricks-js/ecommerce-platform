import type { CreateSellerInput } from "@/core/db/schema/seller";
import { beforeAll, describe, expect, it } from "vitest";
import { InMemorySellerRepository } from "../repositories/in-memory/in-memory-seller-repository";
import type { SellerRepository } from "../repositories/seller-repository";
import { CreateSeller } from "./apply-seller";
import { GetAllSellers } from "./get-all-sellers";

describe("Use case -> Get all sellers", () => {
  let sellerRepository: SellerRepository;
  let sut: GetAllSellers;
  let sutCreate: CreateSeller;

  beforeAll(() => {
    sellerRepository = new InMemorySellerRepository();
    sut = new GetAllSellers(sellerRepository);
    sutCreate = new CreateSeller(sellerRepository);
  });

  it("should return all registered sellers", async () => {
    const seller1: CreateSellerInput = {
      userId: "user-id-1",
      status: "pending",
    };
    const seller2: CreateSellerInput = {
      userId: "user-id-2",
      status: "approved",
    };

    await sutCreate.execute(seller1);
    await sutCreate.execute(seller2);

    const allSellers = await sut.execute();

    expect(allSellers).toBeDefined();
    expect(allSellers).toHaveLength(2);

    expect(allSellers[0]).toBeDefined();
    expect(allSellers[1]).toBeDefined();

    if (allSellers[0] && allSellers[1]) {
      expect(allSellers[0].userId).toBe(seller1.userId);
      expect(allSellers[1].userId).toBe(seller2.userId);
    }
  });
});
