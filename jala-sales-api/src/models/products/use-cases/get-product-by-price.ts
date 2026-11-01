import type { ProductRepository } from "@/models/products/repositories/product-repository";

export class ListProductsByPrice {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(low: number, high: number) {
    return await this.productRepository.getProductsByPriceRange(low, high);
  }
}
