import type { SellerRepository } from "@/models/seller/repositories/seller-repository";

export interface GetSellerByInput {
  sellerId: string;
}

export class GetSellerById {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute({ sellerId }: GetSellerByInput) {
    const seller = await this.sellerRepository.getById(sellerId);
    if (!seller) {
      throw new Error("Seller not found");
    }

    return seller;
  }
}
