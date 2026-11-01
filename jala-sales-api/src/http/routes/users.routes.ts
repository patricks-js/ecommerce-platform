import { authenticateUserController } from "@/models/users/controllers/authenticate-user.controller";
import { createUserSessionController } from "@/models/users/controllers/create-user-session.controller";
import { getAllUsersController } from "@/models/users/controllers/get-all-users.controller";
import { registerUserController } from "@/models/users/controllers/register-user.controller";
import { registerWithGoogleController } from "@/models/users/controllers/register-with-google.controller";
import { updateProfileController } from "@/models/users/controllers/update-user-profile.controller";
import type { FastifyInstance } from "fastify";
import { verifyAdmin } from "../middlewares/verify-admin";
import { verifyJwt } from "../middlewares/verify-jwt";

export default async function (app: FastifyInstance) {
  app.post("/", registerUserController);
  app.post("/auth/login", authenticateUserController);
  app.post("/auth/google", registerWithGoogleController);
  app.post(
    "/sessions",
    { onRequest: [verifyJwt] },
    createUserSessionController,
  );
  app.get("/", { onRequest: [verifyJwt, verifyAdmin] }, getAllUsersController);
  app.put("/profile", { onRequest: [verifyJwt] }, updateProfileController);
}
