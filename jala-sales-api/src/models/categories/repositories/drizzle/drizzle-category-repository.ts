import { db } from "@/core/db";
import {
  type Category,
  type CreateCategoryInput,
  categories,
} from "@/core/db/schema";
import type { CategoryRepository } from "@/models/categories/repositories/category-repository";
import { eq, ilike } from "drizzle-orm";

export class DrizzleCategoryRepository implements CategoryRepository {
  async createCategory(data: CreateCategoryInput): Promise<Category> {
    try {
      const [createdCategories] = await db
        .insert(categories)
        .values(data)
        .returning();
      if (!createdCategories) {
        throw new Error("Failed to create category.");
      }
      return createdCategories;
    } catch (error) {
      throw new Error(`Error creating category: ${(error as Error).message}`);
    }
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    try {
      const [category] = await db
        .select()
        .from(categories)
        .where(eq(categories.id, categoryId));
      return category || null;
    } catch (error) {
      throw new Error(
        `Error retrieving category by ID: ${(error as Error).message}`,
      );
    }
  }

  async updateCategory(
    categoryId: string,
    data: Partial<CreateCategoryInput>,
  ): Promise<Category | null> {
    try {
      const [updatedCategory] = await db
        .update(categories)
        .set(data)
        .where(eq(categories.id, categoryId))
        .returning();
      if (!updatedCategory) {
        throw new Error("Failed to category product.");
      }
      return updatedCategory;
    } catch (error) {
      throw new Error(`Error updating category: ${(error as Error).message}`);
    }
  }

  async deleteCategory(categoryId: string): Promise<boolean> {
    try {
      const deletedRows = await db
        .delete(categories)
        .where(eq(categories.id, categoryId));
      return deletedRows.length > 0;
    } catch (error) {
      throw new Error(`Error deleting category: ${(error as Error).message}`);
    }
  }

  async getCategoryByName(name: string): Promise<Category[]> {
    try {
      const result = await db
        .select()
        .from(categories)
        .where(ilike(categories.name, `%${name}%`));
      return result;
    } catch (error) {
      throw new Error(
        `Error retrieving categories by name: ${(error as Error).message}`,
      );
    }
  }

  async getAllCategories(): Promise<Category[] | null> {
    try {
      const returnCategories = await db.select().from(categories);
      return returnCategories || null;
    } catch (error) {
      throw new Error(
        `Error retrieving all categories: ${(error as Error).message}`,
      );
    }
  }
}
