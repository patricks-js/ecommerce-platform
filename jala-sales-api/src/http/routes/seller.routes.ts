import { verifyAdmin } from "@/http/middlewares/verify-admin";
import { applySellerController } from "@/models/seller/controllers/apply-seller.controller";
import { getAllSellerController } from "@/models/seller/controllers/get-all-sellers.controller";
import { getPendingSellersController } from "@/models/seller/controllers/get-pending-seller.controller";
import { getSellerByIdController } from "@/models/seller/controllers/get-seller-by-id.controller";
import { updateSellerController } from "@/models/seller/controllers/update-seller.controller";

import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";

export default async function (app: FastifyInstance) {
  app.post("/apply", { onRequest: [verifyJwt] }, applySellerController);
  app.get("/:sellerId", { onRequest: [verifyJwt] }, getSellerByIdController);
  app.get("/", { onRequest: [verifyJwt] }, getAllSellerController);
  app.put("/:sellerId", { onRequest: [verifyJwt] }, updateSellerController);
  app.get(
    "/admin/pending-sellers",
    { preHandler: [verifyJwt, verifyAdmin] },
    getPendingSellersController,
  );
}
