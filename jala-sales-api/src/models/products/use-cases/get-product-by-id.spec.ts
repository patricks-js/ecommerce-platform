import { InMemoryProductRepository } from "@/models/products/repositories/in-memory/in-memory-product-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateProduct } from "./create-product";
import { GetProductById } from "./get-product-by-id";

describe("Use Case -> Get Product By ID", () => {
  let productRepository: InMemoryProductRepository;
  let getProductById: GetProductById;
  let createProduct: CreateProduct;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    getProductById = new GetProductById(productRepository);
    createProduct = new CreateProduct(productRepository);
  });

  it("should retrieve a product successfully by ID", async () => {
    const productData = {
      name: "Product to retrieve",
      description: "This product will be retrieved by ID",
      price: 100.0,
      stock: 10,
      categoryId: "123e4567-e89b-12d3-a456-426614174000",
      sellerId: "seller123",
    };
    const createdProduct = await createProduct.execute(productData);

    const result = await getProductById.execute({
      productId: createdProduct.id,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: createdProduct.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        categoryId: productData.categoryId,
        sellerId: productData.sellerId,
      }),
    );
  });

  it("should throw an error if product does not exist", async () => {
    await expect(
      getProductById.execute({ productId: "nonexistent-id" }),
    ).rejects.toThrowError("Product not found");
  });
  it("should throw an error when trying to view a product with an invalid ID", async () => {
    const invalidId = "non-existent-id";

    await expect(
      getProductById.execute({ productId: invalidId }),
    ).rejects.toThrow("Product not found");
  });

  it("should throw an error when trying to view a product with an empty ID", async () => {
    const invalidId = "";

    await expect(
      getProductById.execute({ productId: invalidId }),
    ).rejects.toThrow("Product not found");
  });

  it("should throw an error when trying to view a product with a malformed ID", async () => {
    const invalidId = "123-invalid-uuid";

    await expect(
      getProductById.execute({ productId: invalidId }),
    ).rejects.toThrow("Product not found");
  });
});
