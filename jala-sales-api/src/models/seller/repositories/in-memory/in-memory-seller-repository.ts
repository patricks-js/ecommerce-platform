import type { CreateSellerInput, Seller } from "@/core/db/schema/seller";
import { randomUUID } from "node:crypto";
import type { SellerRepository } from "../seller-repository";

export class InMemorySellerRepository implements SellerRepository {
  #sellers: Seller[] = [];

  async applySeller(data: CreateSellerInput): Promise<Seller> {
    const seller: Seller = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: data.status ?? "pending",
    };
    this.#sellers.push(seller);
    return seller;
  }

  async getById(sellerId: string): Promise<Seller | null> {
    const seller = this.#sellers.find((seller) => seller.id === sellerId);
    if (!seller) {
      throw new Error("Seller not found");
    }
    return seller;
  }

  async getPendingSellers(): Promise<Seller[]> {
    return this.#sellers.filter((seller) => seller.status === "pending");
  }

  async getAllSeller(): Promise<Seller[]> {
    if (!this.#sellers) {
      throw new Error("Seller not found");
    }
    return this.#sellers;
  }

  async updateSeller(
    sellerId: string,
    data: Partial<CreateSellerInput>,
  ): Promise<Seller | null> {
    if (Object.keys(data).length === 0) {
      throw new Error("Data object is empty");
    }

    if (!data.status) {
      throw new Error("Status is required");
    }

    const sellerIndex = this.#sellers.findIndex(
      (seller) => seller.id === sellerId,
    );
    if (sellerIndex === -1) throw new Error("Seller not found");

    const currentSeller = this.#sellers[sellerIndex];
    if (!currentSeller) throw new Error("Seller not found");

    this.#sellers[sellerIndex] = {
      ...currentSeller,
      status: data.status ?? currentSeller.status,
    };

    return this.#sellers[sellerIndex];
  }
}
