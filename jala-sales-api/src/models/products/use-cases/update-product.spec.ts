import { InMemoryProductRepository } from "@/models/products/repositories/in-memory/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateProduct } from "./create-product";
import { UpdateProduct } from "./update-product";

describe("Use Case -> Update Product", () => {
  let productRepository: InMemoryProductRepository;
  let updateProduct: UpdateProduct;
  let createProduct: CreateProduct;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    updateProduct = new UpdateProduct(productRepository);
    createProduct = new CreateProduct(productRepository);
  });

  it("should update a product successfully", async () => {
    const productData = {
      name: "Original Product",
      description: "Original description",
      price: 100.0,
      stock: 20,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
    };
    const createdProduct = await createProduct.execute(productData);

    const updateData = {
      name: "Updated Product",
      description: "Updated description",
      price: 150.0,
    };
    const result = await updateProduct.execute({
      productId: createdProduct.id,
      sellerId: "seller123",
      data: updateData,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: createdProduct.id,
        name: "Updated Product",
        description: "Updated description",
        price: 150.0,
      }),
    );
  });

  it("should throw an error if product does not exist", async () => {
    await expect(
      updateProduct.execute({
        productId: "nonexistent-id",
        sellerId: "seller123",
        data: { name: "New Name" },
      }),
    ).rejects.toThrowError("Product not found");
  });

  it("should throw an error if sellerId does not match product owner", async () => {
    const productData = {
      name: "Product with incorrect seller",
      description: "This product cannot be updated by a different seller",
      price: 200.0,
      stock: 5,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "correctSellerId",
    };
    const createdProduct = await createProduct.execute(productData);

    await expect(
      updateProduct.execute({
        productId: createdProduct.id,
        sellerId: "incorrectSellerId",
        data: { name: "Attempted Update" },
      }),
    ).rejects.toThrowError("Product not found or not owned by seller");
  });
});
