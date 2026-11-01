import type { SellerRepository } from "../repositories/seller-repository";

export class GetAllSellers {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute() {
    return await this.sellerRepository.getAllSeller();
  }
}
