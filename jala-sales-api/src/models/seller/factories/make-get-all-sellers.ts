import { DrizzleSellerRepository } from "@/models/seller/repositories/drizzle/drizzle-seller-repository";
import { GetAllSellers } from "../use-cases/get-all-sellers";

export function makeGetAllSeller() {
  const sellerRepository = new DrizzleSellerRepository();
  return new GetAllSellers(sellerRepository);
}
