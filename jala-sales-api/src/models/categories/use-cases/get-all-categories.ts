import type { CategoryRepository } from "../repositories/category-repository";

export class GetAllCategories {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    const allCategories = await this.categoryRepository.getAllCategories();
    return allCategories;
  }
}
