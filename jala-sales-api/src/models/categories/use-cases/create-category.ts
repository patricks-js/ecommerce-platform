import type { Category, CreateCategoryInput } from "@/core/db/schema";
import type { CategoryRepository } from "@/models/categories/repositories/category-repository";

export interface CreateCategoryInputExtended extends CreateCategoryInput {}

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: CreateCategoryInputExtended): Promise<Category> {
    const category = await this.categoryRepository.createCategory(data);
    return category;
  }
}
