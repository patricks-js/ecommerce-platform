import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { ListProductsByName } from "../use-cases/list-products-by-name";

export function makeListProductsByName() {
  const productRepository = new DrizzleProductRepository();
  return new ListProductsByName(productRepository);
}
