import { db } from "@/core/db";
import {
  seller,
  type CreateSellerInput,
  type Seller,
} from "@/core/db/schema/seller";
import { users } from "@/core/db/schema/user";
import type { SellerRepository } from "@/models/seller/repositories/seller-repository";
import { eq } from "drizzle-orm";

export class DrizzleSellerRepository implements SellerRepository {
  async applySeller(data: CreateSellerInput): Promise<Seller> {
    try {
      const [createSeller] = await db.insert(seller).values(data).returning();

      if (!createSeller) {
        throw new Error("Failed to create seller.");
      }
      return createSeller;
    } catch (error) {
      throw new Error(`Error creating seller: ${(error as Error).message}`);
    }
  }
  async getById(sellerId: string): Promise<Seller | null> {
    try {
      const [sellerById] = await db
        .select()
        .from(seller)
        .where(eq(seller.userId, sellerId));

      return sellerById || null;
    } catch (error) {
      throw new Error(
        `Error retrieving seller by ID: ${(error as Error).message}`,
      );
    }
  }
  async getAllSeller(): Promise<Seller[]> {
    try {
      const sellers = await db.select().from(seller);
      return sellers;
    } catch (error) {
      throw new Error(`Error retrieving sellers: ${(error as Error).message}`);
    }
  }
  async updateSeller(
    sellerId: string,
    data: Partial<CreateSellerInput>,
  ): Promise<Seller | null> {
    try {
      const [updateSeller] = await db
        .update(seller)
        .set(data)
        .where(eq(seller.userId, sellerId))
        .returning();

      if (!updateSeller) {
        throw new Error("Failed to update seller.");
      }

      if (data.status === "approved") {
        const [updateUserForSeller] = await db
          .update(users)
          .set({ role: "seller" })
          .where(eq(users.id, sellerId))
          .returning();
      }

      return updateSeller;
    } catch (error) {
      throw new Error(`Error updating seller: ${(error as Error).message}`);
    }
  }
}
