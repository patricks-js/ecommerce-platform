import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface GetProductByIdInput {
  productId: string;
}

export class GetProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ productId }: GetProductByIdInput) {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
