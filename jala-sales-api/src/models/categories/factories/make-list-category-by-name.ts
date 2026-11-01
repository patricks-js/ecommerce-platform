import { DrizzleCategoryRepository } from "@/models/categories/repositories/drizzle/drizzle-category-repository";
import { ListCategoryByName } from "../use-cases/list-category-by-name";

export function makeListCategoryByName() {
  const categoryRepository = new DrizzleCategoryRepository();
  return new ListCategoryByName(categoryRepository);
}
