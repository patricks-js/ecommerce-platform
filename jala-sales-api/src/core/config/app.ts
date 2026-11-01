import fastify from "fastify";

export const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  },
});

app.register(import("@/core/plugins/swagger"));
app.register(import("@/core/plugins/scalar"));
app.register(import("@/core/plugins/cors"));
app.register(import("@/core/plugins/jwt"));

app.register(import("@/http/routes/users.routes"), {
  prefix: "/api/users",
});
app.register(import("@/http/routes/products.routes"), {
  prefix: "/api/products",
});
app.register(import("@/http/routes/seller.routes"), {
  prefix: "/api/seller",
});
app.register(import("@/http/routes/order.router"), {
  prefix: "/api/order",
});
app.register(import("@/http/routes/orde-detail.router"), {
  prefix: "/api/order-detail",
});
app.register(import("@/http/routes/categories.router"), {
  prefix: "/api/categories",
});
