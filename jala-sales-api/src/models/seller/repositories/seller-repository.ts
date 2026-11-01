import type { CreateSellerInput, Seller } from "@/core/db/schema/seller";

export interface SellerRepository {
  applySeller(data: CreateSellerInput): Promise<Seller>;
  getById(sellerId: string): Promise<Seller | null>;
  getAllSeller(): Promise<Seller[]>;
  updateSeller(
    sellerId: string,
    data: Partial<CreateSellerInput>,
  ): Promise<Seller | null>;
}
