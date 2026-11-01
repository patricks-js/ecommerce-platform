import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { CreateProduct } from "../use-cases/create-product";

export function makeCreateProduct() {
  const productRepository = new DrizzleProductRepository();
  return new CreateProduct(productRepository);
}
