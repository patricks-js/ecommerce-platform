import { DrizzleCategoryRepository } from "@/models/categories/repositories/drizzle/drizzle-category-repository";
import { GetCategoryById } from "../use-cases/get-category-by-id";

export function makeGetCategoryById() {
  const categoryRepository = new DrizzleCategoryRepository();
  return new GetCategoryById(categoryRepository);
}
