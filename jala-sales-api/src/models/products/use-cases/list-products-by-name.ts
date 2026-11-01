import type { ProductRepository } from "@/models/products/repositories/product-repository";

export class ListProductsByName {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(name: string) {
    return await this.productRepository.getProductsByName(name);
  }
}
