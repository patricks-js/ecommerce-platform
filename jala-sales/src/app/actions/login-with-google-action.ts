"use server";

import { signIn } from "@/lib/auth";

export async function loginWithGoogleAction({
  redirectTo,
}: { redirectTo: string }) {
  await signIn("google", {
    redirectTo,
  });
}
