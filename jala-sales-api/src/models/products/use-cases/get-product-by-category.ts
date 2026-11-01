import type { ProductRepository } from "@/models/products/repositories/product-repository";

export class ListProductsByCategory {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(category: string) {
    return await this.productRepository.getProductsByCategory(category);
  }
}
