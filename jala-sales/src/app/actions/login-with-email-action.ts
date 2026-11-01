"use server";

import { signIn } from "@/lib/auth";

export async function loginWithEmailAction(data: {
  email: string;
  password: string;
  origin: "user" | "admin";
  redirectTo: string;
}) {
  const { email, password, origin, redirectTo } = data;

  await signIn("credentials", {
    email,
    password,
    origin,
    redirectTo,
  });
}
