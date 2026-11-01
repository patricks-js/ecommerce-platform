import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { ListSellerProducts } from "../use-cases/list-seller-product";

export function makeListSellerProducts() {
  const productRepository = new DrizzleProductRepository();
  return new ListSellerProducts(productRepository);
}
