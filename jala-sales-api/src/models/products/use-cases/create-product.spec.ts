import { InMemoryProductRepository } from "@/models/products/repositories/in-memory/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import type { ProductRepository } from "../repositories/product-repository";
import { CreateProduct } from "./create-product";

describe("Use Case -> Create Product", () => {
  let productRepository: ProductRepository;
  let sut: CreateProduct;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    sut = new CreateProduct(productRepository);
  });

  it("should create a new product", async () => {
    const productData = {
      name: "Sample Product",
      description: "A description for sample product",
      price: 100.0,
      stock: 50,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/image.jpg",
    };

    const result = await sut.execute(productData);

    expect(result).toEqual(
      expect.objectContaining({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        categoryId: productData.categoryId,
        sellerId: productData.sellerId,
        image: productData.image,
        status: "available",
      }),
    );
  });

  it("should create a product with an unavailable status", async () => {
    const productData = {
      name: "Unavailable Product",
      description: "This product is not available",
      price: 150.0,
      stock: 0,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/unavailable.jpg",
      status: "unavailable" as const,
    };

    const result = await sut.execute(productData);

    expect(result.status).toBe("unavailable");
  });

  it("should create a product with zero stock", async () => {
    const productData = {
      name: "Out of Stock Product",
      description: "This product is out of stock",
      price: 75.0,
      stock: 0,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/out-of-stock.jpg",
    };

    const result = await sut.execute(productData);

    expect(result.stock).toBe(0);
  });

  it("should create a product with minimum price", async () => {
    const productData = {
      name: "Cheap Product",
      description: "A very affordable product",
      price: 0.01,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/cheap.jpg",
    };

    const result = await sut.execute(productData);

    expect(result.price).toEqual(0.01);
  });

  it("should create a product with a high price", async () => {
    const productData = {
      name: "Expensive Product",
      description: "A very expensive product",
      price: 99999.99,
      stock: 2,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/expensive.jpg",
    };

    const result = await sut.execute(productData);

    expect(result.price).toEqual(99999.99);
  });

  it("should create a product without description and image", async () => {
    const productData = {
      name: "Minimal Product",
      price: 100.0,
      stock: 10,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
    };

    const result = await sut.execute(productData);

    expect(result).toEqual(
      expect.objectContaining({
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        categoryId: productData.categoryId,
        sellerId: productData.sellerId,
        description: null,
        image: null,
        status: "available",
      }),
    );
  });

  it("should throw an error when creating a product with an excessively long name", async () => {
    const excessiveName = "A".repeat(256);
    const productData = {
      name: excessiveName,
      description: "A description for a sample product",
      price: 100.0,
      stock: 50,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/image.jpg",
    };

    await expect(sut.execute(productData)).rejects.toThrow(
      "Product name exceeds 255 characters.",
    );
  });

  it("should create a product when the name length is within the limit", async () => {
    const validName = "A".repeat(255);
    const productData = {
      name: validName,
      description: "A description for a sample product",
      price: 100.0,
      stock: 50,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/image.jpg",
    };

    const result = await sut.execute(productData);

    expect(result).toEqual(
      expect.objectContaining({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        categoryId: productData.categoryId,
        sellerId: productData.sellerId,
        image: productData.image,
        status: "available",
      }),
    );
  });

  it("should throw an error when creating a product with a zero price", async () => {
    const productData = {
      name: "Sample Product",
      description: "A description for a sample product",
      price: 0,
      stock: 50,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/image.jpg",
    };

    await expect(sut.execute(productData)).rejects.toThrow(
      "Product price must be greater than zero.",
    );
  });

  it("should throw an error when creating a product with a negative price", async () => {
    const productData = {
      name: "Sample Product",
      description: "A description for a sample product",
      price: -10,
      stock: 50,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
      image: "http://example.com/image.jpg",
    };

    await expect(sut.execute(productData)).rejects.toThrow(
      "Product price must be greater than zero.",
    );
  });
});
