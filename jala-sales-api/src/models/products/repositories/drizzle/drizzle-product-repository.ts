import { db } from "@/core/db";
import {
  type CreateProductInput,
  type Product,
  products,
} from "@/core/db/schema";
import type { ProductRepository } from "@/models/products/repositories/product-repository";
import { and, asc, desc, eq, gt, ilike, lt } from "drizzle-orm";
export class DrizzleProductRepository implements ProductRepository {
  async createProduct(data: CreateProductInput): Promise<Product> {
    try {
      const [createdProduct] = await db
        .insert(products)
        .values(data)
        .returning();
      if (!createdProduct) {
        throw new Error("Failed to create product.");
      }
      return createdProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${(error as Error).message}`);
    }
  }

  async getProductById(productId: string): Promise<Product | null> {
    try {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));
      return product || null;
    } catch (error) {
      throw new Error(
        `Error retrieving product by ID: ${(error as Error).message}`,
      );
    }
  }

  async updateProduct(
    productId: string,
    data: Partial<CreateProductInput>,
  ): Promise<Product | null> {
    try {
      const [updatedProduct] = await db
        .update(products)
        .set(data)
        .where(eq(products.id, productId))
        .returning();
      if (!updatedProduct) {
        throw new Error("Failed to update product.");
      }
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product: ${(error as Error).message}`);
    }
  }

  async deleteProduct(productId: string): Promise<boolean> {
    try {
      const deletedRows = await db
        .delete(products)
        .where(eq(products.id, productId));
      return deletedRows.length > 0;
    } catch (error) {
      throw new Error(`Error deleting product: ${(error as Error).message}`);
    }
  }

  async getProductsBySellerId(sellerId: string): Promise<Product[]> {
    try {
      return await db
        .select()
        .from(products)
        .where(eq(products.sellerId, sellerId));
    } catch (error) {
      throw new Error(
        `Error retrieving products by seller ID: ${(error as Error).message}`,
      );
    }
  }

  async getProductsAndSort(sort: { query: string; sort: string }): Promise<
    Product[]
  > {
    try {
      if (sort.query === "price") {
        return db
          .select()
          .from(products)
          .orderBy(
            sort.sort === "asc" ? asc(products.price) : desc(products.price),
          );
      }
      return db
        .select()
        .from(products)
        .orderBy(
          sort.sort === "asc" ? asc(products.name) : desc(products.name),
        );
    } catch (error) {
      throw new Error(
        `Error retrieving products sort: ${(error as Error).message}`,
      );
    }
  }

  async getProductsByName(name: string): Promise<Product[]> {
    try {
      const result = await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${name}%`));
      return result;
    } catch (error) {
      throw new Error(
        `Error retrieving products by name: ${(error as Error).message}`,
      );
    }
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const result = await db.select().from(products);
      return result;
    } catch (error) {
      throw new Error(
        `Error retrieving products by category: ${(error as Error).message}`,
      );
    }
  }

  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    try {
      const result = await db
        .select()
        .from(products)
        .where(and(gt(products.price, minPrice), lt(products.price, maxPrice)));
      return result;
    } catch (error) {
      throw new Error(
        `Error retrieving products by price: ${(error as Error).message}`,
      );
    }
  }
}
