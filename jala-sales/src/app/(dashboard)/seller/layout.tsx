import { auth } from "@/lib/auth";
import type { Children } from "@/types/children";
import { redirect } from "next/navigation";

export default async function SellerLayout({ children }: Children) {
  const session = await auth();

  if (!session) {
    redirect("/admin/sign-in");
  }

  return <>{children}</>;
}
