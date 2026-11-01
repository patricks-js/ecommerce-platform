import { InMemoryProductRepository } from "@/models/products/repositories/in-memory/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateProduct } from "./create-product";
import { DeleteProduct } from "./delete-product";

describe("Use Case -> Delete Product", () => {
  let productRepository: InMemoryProductRepository;
  let deleteProduct: DeleteProduct;
  let createProduct: CreateProduct;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    deleteProduct = new DeleteProduct(productRepository);
    createProduct = new CreateProduct(productRepository);
  });

  it("should delete a product successfully", async () => {
    const productData = {
      name: "Product to delete",
      description: "This product will be deleted",
      price: 100.0,
      stock: 10,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
    };
    const createdProduct = await createProduct.execute(productData);

    const result = await deleteProduct.execute({
      productId: createdProduct.id,
      sellerId: "seller123",
    });

    expect(result).toBe(true);
  });

  it("should throw an error if product does not exist", async () => {
    await expect(
      deleteProduct.execute({
        productId: "nonexistent-id",
        sellerId: "seller123",
      }),
    ).rejects.toThrowError("Product not found");
  });

  it("should throw an error if sellerId does not match product owner", async () => {
    const productData = {
      name: "Product with wrong seller",
      description: "This product cannot be deleted by a different seller",
      price: 150.0,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "correctSellerId",
    };
    const createdProduct = await createProduct.execute(productData);

    await expect(
      deleteProduct.execute({
        productId: createdProduct.id,
        sellerId: "incorrectSellerId",
      }),
    ).rejects.toThrowError("Product not found or not owned by seller");
  });
});
