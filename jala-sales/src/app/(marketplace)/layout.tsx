import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Children } from "@/types/children";

export default function SiteLayout({ children }: Readonly<Children>) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-screen-2xl mx-auto space-y-6 pb-24 flex-1 w-full">
        <Navbar />
        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}
