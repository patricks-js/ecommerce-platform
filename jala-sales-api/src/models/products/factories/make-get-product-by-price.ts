import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { ListProductsByPrice } from "../use-cases/get-product-by-price";

export function makeListProductByPrice() {
  const productRepository = new DrizzleProductRepository();
  return new ListProductsByPrice(productRepository);
}
