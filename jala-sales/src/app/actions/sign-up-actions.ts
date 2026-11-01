"use server";

import { env } from "@/lib/env";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export async function signUpAction(data: FormData) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }
}
