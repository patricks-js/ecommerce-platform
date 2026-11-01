import type { CreateSellerInput } from "@/core/db/schema/seller";
import { beforeAll, describe, expect, it } from "vitest";
import { InMemorySellerRepository } from "../repositories/in-memory/in-memory-seller-repository";
import type { SellerRepository } from "../repositories/seller-repository";
import { CreateSeller } from "./apply-seller";
import { UpdateSeller } from "./update-seller";

describe("Use case -> Update seller", () => {
  let sellerRepository: SellerRepository;
  let sutCreate: CreateSeller;
  let sutUpdate: UpdateSeller;

  beforeAll(() => {
    sellerRepository = new InMemorySellerRepository();
    sutUpdate = new UpdateSeller(sellerRepository);
    sutCreate = new CreateSeller(sellerRepository);
  });

  it("should not change seller data when updating with empty object", async () => {
    const newSeller: CreateSellerInput = {
      userId: "user-id-exemplo",
      status: "pending",
    };

    const createdSeller = await sutCreate.execute(newSeller);

    await expect(
      sutUpdate.execute({
        sellerId: createdSeller.id,
        data: {},
      }),
    ).rejects.toThrow("Data object is empty");
  });
});
