import { createCategoryController } from "@/models/categories/controllers/create-category.controller";
import { deleteCategoryController } from "@/models/categories/controllers/delete-category.controller";
import { getAllCategoriesController } from "@/models/categories/controllers/get-all-categories.controller";
import { getCategoryByIdController } from "@/models/categories/controllers/get-category-by-id.controller";
import { listCategoryByNameController } from "@/models/categories/controllers/list-category-by-name.controller";
import { updateCategoryController } from "@/models/categories/controllers/update-category.controller";
import type { FastifyInstance } from "fastify";
import { verifyAdmin } from "../middlewares/verify-admin";
import { verifyJwt } from "../middlewares/verify-jwt";

export default async function (app: FastifyInstance) {
  app.get("/:categoryId", getCategoryByIdController);
  app.get("/search", listCategoryByNameController);
  app.post(
    "/",
    { onRequest: [verifyJwt, verifyAdmin] },
    createCategoryController,
  );
  app.put(
    "/:categoryId",
    { onRequest: [verifyJwt, verifyAdmin] },
    updateCategoryController,
  );
  app.delete(
    "/:categoryId",
    { onRequest: [verifyJwt, verifyAdmin] },
    deleteCategoryController,
  );
  app.get(
    "/",
    { onRequest: [verifyJwt, verifyAdmin] },
    getAllCategoriesController,
  );
}
