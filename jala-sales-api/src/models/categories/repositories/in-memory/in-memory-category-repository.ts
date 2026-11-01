import type { Category, CreateCategoryInput } from "@/core/db/schema";
import type { CategoryRepository } from "@/models/categories/repositories/category-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCategoryRepository implements CategoryRepository {
  #categories: Category[] = [];

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const category: Category = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description ?? null,
    };
    this.#categories.push(category);
    return category;
  }

  async getAllCategories(): Promise<Category[] | null> {
    return this.#categories || null;
  }

  async getCategoryByName(name: string): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    return (
      this.#categories.find((category) => category.id === categoryId) ?? null
    );
  }

  async updateCategory(
    categoryId: string,
    data: Partial<CreateCategoryInput>,
  ): Promise<Category | null> {
    const categoryIndex = this.#categories.findIndex(
      (category) => category.id === categoryId,
    );
    if (categoryIndex === -1) return null;

    const currentCategory = this.#categories[categoryIndex];
    if (!currentCategory) return null;

    this.#categories[categoryIndex] = {
      ...currentCategory,
      name: data.name ?? currentCategory.name,
      description: data.description ?? currentCategory.description,
      updatedAt: new Date(),
    };

    return this.#categories[categoryIndex];
  }

  async deleteCategory(categoryId: string): Promise<boolean> {
    const categoryIndex = this.#categories.findIndex(
      (category) => category.id === categoryId,
    );
    if (categoryIndex === -1) return false;

    this.#categories.splice(categoryIndex, 1);
    return true;
  }

  async getCategoriesByName(name: string): Promise<Category[]> {
    return this.#categories.filter((category) =>
      category.name.toLowerCase().includes(name.toLowerCase()),
    );
  }
}
