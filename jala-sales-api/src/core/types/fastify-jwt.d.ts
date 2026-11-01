import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { userId: user.id; email: user.email; role: user.role }; // * payload type is used for signing and verifying
    user: {
      userId: string;
      email: string;
      role: string;
      exp: number;
    }; // * user type is return type of `request.user` object
  }
}
