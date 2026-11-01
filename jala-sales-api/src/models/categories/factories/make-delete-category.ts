import { DrizzleCategoryRepository } from "@/models/categories/repositories/drizzle/drizzle-category-repository";
import { DrizzleProductRepository } from "@/models/products/repositories/drizzle/drizzle-product-repository";
import { DeleteCategory } from "../use-cases/delete-category";

export function makeDeleteCategory() {
  const categoryRepository = new DrizzleCategoryRepository();
  const productRepository = new DrizzleProductRepository();
  return new DeleteCategory(categoryRepository, productRepository);
}
