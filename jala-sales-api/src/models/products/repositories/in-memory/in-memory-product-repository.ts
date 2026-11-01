import type { CreateProductInput, Product } from "@/core/db/schema";
import type { ProductRepository } from "@/models/products/repositories/product-repository";
import { randomUUID } from "node:crypto";

export class InMemoryProductRepository implements ProductRepository {
  #products: Product[] = [];
  #MAX_NAME_LENGTH = 255;

  async getProductsByName(name: string): Promise<Product[]> {
    return this.#products.filter((product) => product.name === name);
  }

  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    return this.#products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.#products.filter(
      (product) => product.categoryId === categoryId,
    );
  }

  async createProduct(data: CreateProductInput): Promise<Product> {
    if (data.name.length > this.#MAX_NAME_LENGTH) {
      throw new Error(
        `Product name exceeds ${this.#MAX_NAME_LENGTH} characters.`,
      );
    }

    if (data.price <= 0) {
      throw new Error("Product price must be greater than zero.");
    }

    const product: Product = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description ?? null,
      image: data.image ?? null,
      status: data.status ?? "available",
    };
    this.#products.push(product);
    return product;
  }

  async getProductById(productId: string): Promise<Product | null> {
    const product = this.#products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async updateProduct(
    productId: string,
    data: Partial<CreateProductInput>,
  ): Promise<Product | null> {
    const productIndex = this.#products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex === -1) return null;

    const currentProduct = this.#products[productIndex];
    if (!currentProduct) return null;

    this.#products[productIndex] = {
      ...currentProduct,
      name: data.name ?? currentProduct.name,
      price: data.price ?? currentProduct.price,
      stock: data.stock ?? currentProduct.stock,
      categoryId: data.categoryId ?? currentProduct.categoryId,
      sellerId: currentProduct.sellerId,
      updatedAt: new Date(),
      description: data.description ?? currentProduct.description,
      image: data.image ?? currentProduct.image,
      status: data.status ?? currentProduct.status,
    };

    return this.#products[productIndex];
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const productIndex = this.#products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex === -1) return false;

    this.#products.splice(productIndex, 1);
    return true;
  }

  async getProductsBySellerId(sellerId: string): Promise<Product[]> {
    return this.#products.filter((product) => product.sellerId === sellerId);
  }

  async getProductsAndSort(sort: { query: string; sort: string }): Promise<
    Product[]
  > {
    try {
      const sortedProducts = [...this.#products];
      sortedProducts.sort((a, b) => {
        if (sort.query === "price") {
          return sort.sort === "asc"
            ? Number(a.price) - Number(b.price)
            : Number(b.price) - Number(a.price);
        }

        if (sort.query === "name") {
          return sort.sort === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }

        return 0;
      });
      return sortedProducts;
    } catch (error) {
      throw new Error(
        `Error retrieving and sorting products: ${(error as Error).message}`,
      );
    }
  }
}
