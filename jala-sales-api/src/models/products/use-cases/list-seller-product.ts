import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface ListSellerProductsInput {
  sellerId: string;
  limit?: number;
  offset?: number;
}

export class ListSellerProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ sellerId, limit = 10, offset = 0 }: ListSellerProductsInput) {
    return await this.productRepository.getProductsBySellerId(
      sellerId,
      limit,
      offset,
    );
  }
}
