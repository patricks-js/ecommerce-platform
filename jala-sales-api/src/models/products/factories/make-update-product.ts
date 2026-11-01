import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { UpdateProduct } from "../use-cases/update-product";

export function makeUpdateProduct() {
  const productRepository = new DrizzleProductRepository();
  return new UpdateProduct(productRepository);
}
