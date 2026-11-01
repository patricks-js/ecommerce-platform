import type { CategoryRepository } from "@/models/categories/repositories/category-repository";

export class ListCategoryByName {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(name: string) {
    return await this.categoryRepository.getCategoryByName(name);
  }
}
