import type { Category, CreateCategoryInput } from "@/core/db/schema";

export interface CategoryRepository {
  createCategory(data: CreateCategoryInput): Promise<Category>;
  getCategoryById(categoryId: string): Promise<Category | null>;
  updateCategory(
    categoryId: string,
    data: Partial<CreateCategoryInput>,
  ): Promise<Category | null>;
  deleteCategory(categoryId: string): Promise<boolean>;
  getCategoryByName(name: string): Promise<Category[]>;
  getAllCategories(): Promise<Category[] | null>;
}
