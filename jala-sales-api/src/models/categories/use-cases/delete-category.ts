import type { CategoryRepository } from "@/models/categories/repositories/category-repository";
import type { ProductRepository } from "@/models/products/repositories/product-repository";

export interface DeleteCategoryInput {
  categoryId: string;
}

export class DeleteCategory {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ categoryId }: DeleteCategoryInput): Promise<boolean> {
    const products =
      await this.productRepository.getProductsByCategory(categoryId);
    if (products.length > 0) {
      throw new Error("Cannot delete category with associated products.");
    }

    return await this.categoryRepository.deleteCategory(categoryId);
  }
}
