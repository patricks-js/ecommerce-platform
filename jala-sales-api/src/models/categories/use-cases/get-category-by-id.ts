import type { CategoryRepository } from "@/models/categories/repositories/category-repository";

export interface GetCategoryByIdInput {
  categoryId: string;
}

export class GetCategoryById {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId }: GetCategoryByIdInput) {
    const category = await this.categoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }
}
