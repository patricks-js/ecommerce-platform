import { InMemoryProductRepository } from "@/models/products/repositories/in-memory/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateProduct } from "./create-product";
import { ListSellerProducts } from "./list-seller-product";

describe("Use Case -> List Seller Products", () => {
  let productRepository: InMemoryProductRepository;
  let listSellerProducts: ListSellerProducts;
  let createProduct: CreateProduct;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    listSellerProducts = new ListSellerProducts(productRepository);
    createProduct = new CreateProduct(productRepository);
  });

  it("should list products for a seller successfully", async () => {
    const productData1 = {
      name: "Product 1",
      description: "First product",
      price: 50.0,
      stock: 20,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
    };
    const productData2 = {
      name: "Product 2",
      description: "Second product",
      price: 75.0,
      stock: 10,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
    };
    await createProduct.execute(productData1);
    await createProduct.execute(productData2);

    const result = await listSellerProducts.execute({ sellerId: "seller123" });

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Product 1" }),
        expect.objectContaining({ name: "Product 2" }),
      ]),
    );
  });

  it("should return an empty list if seller has no products", async () => {
    const result = await listSellerProducts.execute({
      sellerId: "nonexistent-seller",
    });
    expect(result).toEqual([]);
  });
});
