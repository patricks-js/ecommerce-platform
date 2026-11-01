import { env } from "@/core/config/env";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    app.register(import("@fastify/jwt"), {
      secret: env.AUTH_SECRET,
      sign: {
        expiresIn: env.AUTH_EXPIRES_IN,
        iss: "sales.jala.app",
      },
    });
  },
  { name: "jwt" },
);
