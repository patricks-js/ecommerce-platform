import { DrizzleSellerRepository } from "@/models/seller/repositories/drizzle/drizzle-seller-repository";
import { GetSellerById } from "../use-cases/get-seller-by-id";

export function makeGetSellerById() {
  const sellerRepository = new DrizzleSellerRepository();
  return new GetSellerById(sellerRepository);
}
