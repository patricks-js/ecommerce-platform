import type { Category } from "@/core/db/schema";
import type { CategoryRepository } from "@/models/categories/repositories/category-repository";

export interface UpdateCategoryInput {
  categoryId: string;
  data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>;
}

export class UpdateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    categoryId,
    data,
  }: UpdateCategoryInput): Promise<Category | null> {
    const category = await this.categoryRepository.getCategoryById(categoryId);

    const updatedCategory = await this.categoryRepository.updateCategory(
      categoryId,
      data,
    );
    return updatedCategory;
  }
}
