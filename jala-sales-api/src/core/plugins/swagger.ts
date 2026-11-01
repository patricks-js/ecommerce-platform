import fp from "fastify-plugin";

export default fp(
  async (app) => {
    app.register(import("@fastify/swagger"), {
      openapi: {
        openapi: "3.1.0",
        info: {
          title: "Jala Sales API",
          description: "OpenAPI specification for Jala Sales API",
          version: "1.0.0",
        },
        servers: [
          {
            url: "http://localhost:3333",
            description: "Development server",
          },
        ],
        tags: [
          { name: "user", description: "User related end-points" },
          { name: "session", description: "Session related end-points" },
          { name: "products", description: "Product related end-points" },
        ],
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
      },
    });
  },
  { name: "swagger" },
);
