import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface DeleteProductInput {
  productId: string;
  sellerId: string;
}

export class DeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ productId, sellerId }: DeleteProductInput): Promise<boolean> {
    const product = await this.productRepository.getProductById(productId);
    if (!product || product.sellerId !== sellerId) {
      throw new Error("Product not found or not owned by seller");
    }

    return await this.productRepository.deleteProduct(productId);
  }
}
