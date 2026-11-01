import { InMemoryProductRepository } from "@/models/products/repositories/in-memory/in-memory-product-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ListSortProducts } from "./list-sort-products";

describe("User Case -> Sort products by name", () => {
  let productRepository: InMemoryProductRepository;
  let sut: ListSortProducts;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    sut = new ListSortProducts(productRepository);
  });

  it("should return the products sorted by name in ascending order", async () => {
    await productRepository.createProduct({
      name: "Smartphone",
      price: 2000,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });

    await productRepository.createProduct({
      name: "Books",
      price: 20,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });
    const products = await sut.execute({ query: "name", sort: "asc" });

    const simplifiedProducts = products.map(
      ({ name, price, stock, categoryId, sellerId }) => ({
        name,
        price,
        stock,
        categoryId,
        sellerId,
      }),
    );

    expect(simplifiedProducts).toEqual([
      {
        name: "Books",
        price: 20,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
      {
        name: "Smartphone",
        price: 2000,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
    ]);
  });
  it("should return the products sorted by name in decreasing order", async () => {
    await productRepository.createProduct({
      name: "Smartphone",
      price: 2000,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });

    await productRepository.createProduct({
      name: "Books",
      price: 20,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });
    const products = await sut.execute({ query: "name", sort: "desc" });

    const simplifiedProducts = products.map(
      ({ name, price, stock, categoryId, sellerId }) => ({
        name,
        price,
        stock,
        categoryId,
        sellerId,
      }),
    );

    expect(simplifiedProducts).toEqual([
      {
        name: "Smartphone",
        price: 2000,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
      {
        name: "Books",
        price: 20,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
    ]);
  });
  it("should return the products sorted by price in ascending order", async () => {
    await productRepository.createProduct({
      name: "Smartphone",
      price: 2000,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });

    await productRepository.createProduct({
      name: "Books",
      price: 20,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });
    const products = await sut.execute({ query: "price", sort: "asc" });

    const simplifiedProducts = products.map(
      ({ name, price, stock, categoryId, sellerId }) => ({
        name,
        price,
        stock,
        categoryId,
        sellerId,
      }),
    );

    expect(simplifiedProducts).toEqual([
      {
        name: "Books",
        price: 20,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
      {
        name: "Smartphone",
        price: 2000,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
    ]);
  });
  it("should return the products sorted by price in decreasing order", async () => {
    await productRepository.createProduct({
      name: "Smartphone",
      price: 2000,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });

    await productRepository.createProduct({
      name: "Books",
      price: 20,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller1",
    });
    const products = await sut.execute({ query: "price", sort: "desc" });

    const simplifiedProducts = products.map(
      ({ name, price, stock, categoryId, sellerId }) => ({
        name,
        price,
        stock,
        categoryId,
        sellerId,
      }),
    );

    expect(simplifiedProducts).toEqual([
      {
        name: "Smartphone",
        price: 2000,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
      {
        name: "Books",
        price: 20,
        stock: 5,
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
        sellerId: "seller1",
      },
    ]);
  });
});
