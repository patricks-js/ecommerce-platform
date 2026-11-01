import { DrizzleCategoryRepository } from "@/models/categories/repositories/drizzle/drizzle-category-repository";
import { CreateCategory } from "../use-cases/create-category";

export function makeCreateCategory() {
  const categoryRepository = new DrizzleCategoryRepository();
  return new CreateCategory(categoryRepository);
}
