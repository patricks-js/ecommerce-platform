import { createProductController } from "@/models/products/controllers/create-product.controller";
import { deleteProductController } from "@/models/products/controllers/delete-product.controller";
import { fetchProductsByCategoryController } from "@/models/products/controllers/fetch-products-by-category.controller";
import { fetchProductsByNameController } from "@/models/products/controllers/fetch-products-by-name.controller";
import { fetchProductsByPriceController } from "@/models/products/controllers/fetch-products-by-price.controller";
import { fetchSellerOwnProductsController } from "@/models/products/controllers/fetch-seller-own-products.controller";
import { fetchSortedProductsController } from "@/models/products/controllers/fetch-sorted-products.controller";
import { getProductByIdController } from "@/models/products/controllers/get-product-by-id.controller";
import { updateProductController } from "@/models/products/controllers/update-product.controller";
import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";

export default async function (app: FastifyInstance) {
  app.get("/:productId", getProductByIdController);
  app.get("/price", fetchProductsByPriceController);
  app.get("/category", fetchProductsByCategoryController);
  app.get("/", fetchSortedProductsController);
  app.get(
    "/seller/:sellerId",
    { onRequest: [verifyJwt] },
    fetchSellerOwnProductsController,
  );
  app.get("/search", fetchProductsByNameController);
  app.post("/", { onRequest: [verifyJwt] }, createProductController);
  app.put("/:productId", { onRequest: [verifyJwt] }, updateProductController);
  app.delete(
    "/:productId",
    { onRequest: [verifyJwt] },
    deleteProductController,
  );
}
