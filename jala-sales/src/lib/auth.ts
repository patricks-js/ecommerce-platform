import * as jose from "jose";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { env } from "./env";

export const runtime = "nodejs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      profile(profile) {
        return {
          ...profile,
          image: profile.picture,
          role: profile.role ?? "customer",
        };
      },
      clientId: "",
      clientSecret: "",
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
        origin: {},
      },
      authorize: async (credentials) => {
        const credentialsSchema = z.object({
          email: z.string().email(),
          password: z.string(),
        });

        const credentialsParsed = credentialsSchema.parse(credentials);

        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/users/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentialsParsed),
          },
        );

        const data = await response.json();

        const adminOrigin = credentials?.origin === "admin";
        const adminEmail = data.user.email === "patrick2@gmail.com";
        const adminRole = data.user.role === "admin";

        if (adminOrigin && !adminEmail && !adminRole) return null;
        if (!adminOrigin && (adminEmail || adminRole)) return null;

        return {
          ...data.user,
          accessToken: data.token,
          role: data.user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        const input = {
          name: profile?.name,
          email: profile?.email,
          image: profile?.image,
        };

        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/users/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          },
        );

        const data = await response.json();

        const payload = {
          userId: data.userId,
          email: profile?.email,
          role: user.role,
        };

        const accessToken = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setIssuer("sales.jala.app")
          .setAudience("sales.jala.app")
          .setExpirationTime("1d")
          .sign(new TextEncoder().encode(env.AUTH_SECRET));

        user.accessToken = accessToken;
      }

      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/users/sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ provider: account?.provider }),
        },
      );

      return response.ok;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          accessToken: token.accessToken as string,
          role: token.role as string,
        },
      };
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
