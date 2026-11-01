import { DrizzleCategoryRepository } from "@/models/categories/repositories/drizzle/drizzle-category-repository";
import { UpdateCategory } from "../use-cases/update-category";

export function makeUpdateCategory() {
  const categoryRepository = new DrizzleCategoryRepository();
  return new UpdateCategory(categoryRepository);
}
