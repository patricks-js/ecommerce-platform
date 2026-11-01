import { DrizzleSellerRepository } from "@/models/seller/repositories/drizzle/drizzle-seller-repository";
import { UpdateSeller } from "../use-cases/update-seller";

export function makeUpdateSeller() {
  const sellerRepository = new DrizzleSellerRepository();
  return new UpdateSeller(sellerRepository);
}
