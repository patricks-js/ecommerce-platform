import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { ListProductsByCategory } from "../use-cases/get-product-by-category";

export function makeListProductsByCategory() {
  const productRepository = new DrizzleProductRepository();
  return new ListProductsByCategory(productRepository);
}
