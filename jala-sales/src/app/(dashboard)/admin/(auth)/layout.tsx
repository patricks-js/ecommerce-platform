import { Toaster } from "@/components/ui/toaster";
import type { Children } from "@/types/children";

export default function AuthLayout({ children }: Readonly<Children>) {
  return (
    <>
      <main className="h-screen max-w-screen-2xl mx-auto">{children}</main>
      <Toaster />
    </>
  );
}
