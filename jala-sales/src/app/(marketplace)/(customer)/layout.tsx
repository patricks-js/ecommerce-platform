import { ProfileSidebar } from "@/components/profile-sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function CustomerLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await auth();

  if (!session) {
    redirect("/admin/sign-in");
  }

  return (
    <div className="grid grid-cols-[288px_1fr] gap-8 mt-10">
      <ProfileSidebar />
      <div className="max-w-3xl w-full mx-auto">{children}</div>
    </div>
  );
}
