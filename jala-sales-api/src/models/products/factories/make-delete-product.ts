import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { DeleteProduct } from "../use-cases/delete-product";

export function makeDeleteProduct() {
  const productRepository = new DrizzleProductRepository();
  return new DeleteProduct(productRepository);
}
