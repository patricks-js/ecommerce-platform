import type { CreateProductInput, Product } from "@/core/db/schema";
import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface CreateProductInputExtended extends CreateProductInput {
  sellerId: string;
}

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductInputExtended): Promise<Product> {
    const product = await this.productRepository.createProduct(data);
    return product;
  }
}
