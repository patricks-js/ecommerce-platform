import type { CreateProductInput, Product } from "@/core/db/schema";

export interface ProductRepository {
  createProduct(data: CreateProductInput): Promise<Product>;
  getProductById(productId: string): Promise<Product | null>;
  updateProduct(
    productId: string,
    data: Partial<CreateProductInput>,
  ): Promise<Product | null>;
  deleteProduct(productId: string): Promise<boolean>;
  getProductsAndSort(sort: object): Promise<Product[]>;
  getProductsByName(name: string): Promise<Product[]>;
  getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductsBySellerId(
    sellerId: string,
    limit?: number,
    offset?: number,
  ): Promise<Product[]>;
}
