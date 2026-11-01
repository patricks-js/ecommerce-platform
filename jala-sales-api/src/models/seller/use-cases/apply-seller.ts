import type { CreateSellerInput, Seller } from "@/core/db/schema/seller";
import type { SellerRepository } from "@/models/seller/repositories/seller-repository";

export interface CreateSellerInputExtended extends CreateSellerInput {
  userId: string;
}

export class CreateSeller {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(data: CreateSellerInputExtended): Promise<Seller> {
    const seller = await this.sellerRepository.applySeller(data);
    return seller;
  }
}
