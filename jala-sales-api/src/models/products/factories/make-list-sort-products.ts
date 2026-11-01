import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { ListSortProducts } from "../use-cases/list-sort-products";

export function makeListSortProducts() {
  const productRepository = new DrizzleProductRepository();
  return new ListSortProducts(productRepository);
}
