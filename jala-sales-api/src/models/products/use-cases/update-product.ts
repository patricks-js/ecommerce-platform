import type { Product } from "@/core/db/schema";
import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface UpdateProductInput {
  productId: string;
  sellerId: string;
  data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt" | "sellerId">>;
}

export class UpdateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    productId,
    sellerId,
    data,
  }: UpdateProductInput): Promise<Product | null> {
    const product = await this.productRepository.getProductById(productId);
    if (!product || product.sellerId !== sellerId) {
      throw new Error("Product not found or not owned by seller");
    }

    const updatedProduct = await this.productRepository.updateProduct(
      productId,
      data,
    );
    return updatedProduct;
  }
}
