import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { GetProductById } from "../use-cases/get-product-by-id";

export function makeGetProductById() {
  const productRepository = new DrizzleProductRepository();
  return new GetProductById(productRepository);
}
