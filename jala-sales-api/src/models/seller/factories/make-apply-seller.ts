import { DrizzleSellerRepository } from "@/models/seller/repositories/drizzle/drizzle-seller-repository";
import { CreateSeller } from "../use-cases/apply-seller";

export function makeCreateSeller() {
  const sellerRepository = new DrizzleSellerRepository();
  return new CreateSeller(sellerRepository);
}
