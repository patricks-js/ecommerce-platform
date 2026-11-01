import { DrizzleCategoryRepository } from "../repositories/drizzle/drizzle-category-repository";
import { GetAllCategories } from "../use-cases/get-all-categories";

export function makeGetAllCategories() {
  const categoryRepository = new DrizzleCategoryRepository();
  return new GetAllCategories(categoryRepository);
}
