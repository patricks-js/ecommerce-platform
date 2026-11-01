import type { Seller } from "@/core/db/schema/seller";
import type { SellerRepository } from "@/models/seller/repositories/seller-repository";

export interface UpdateSellerInput {
  sellerId: string;
  data: Partial<Omit<Seller, "id" | "createdAt" | "updatedAt">>;
}

export class UpdateSeller {
  constructor(private readonly sellerRepository: SellerRepository) {}
  async execute({ sellerId, data }: UpdateSellerInput): Promise<Seller | null> {
    const seller = await this.sellerRepository.getById(sellerId);
    if (!seller) {
      throw new Error("Seller not found");
    }

    const updatedSeller = await this.sellerRepository.updateSeller(
      sellerId,
      data,
    );
    return updatedSeller;
  }
}
