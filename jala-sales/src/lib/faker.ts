import { faker } from "@faker-js/faker";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: string;
  status: "available" | "unavailable";
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
};

const TOTAL_PRODUCTS = 19;

let cachedProducts: Product[] | null = null;

export async function getFakerProducts(): Promise<Product[]> {
  return Array.from({ length: TOTAL_PRODUCTS }).map(() => {
    const stock = faker.number.int({ min: 0, max: 99 });
    const price = Number(faker.commerce.price());

    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price,
      stock,
      image: faker.image.url(),
      categoryId: faker.commerce.department(),
      status: stock > 0 ? "available" : "unavailable",
      sellerId: faker.string.uuid(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    } as Product;
  });
}

export async function getCachedProducts(): Promise<Product[]> {
  if (!cachedProducts) {
    cachedProducts = await getFakerProducts();
  }

  return cachedProducts;
}
