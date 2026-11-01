import { cn } from "@/lib/cn";
import { QueryClientProvider } from "@/shared/query-client";
import type { Children } from "@/types/children";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jala Sales",
  description: "Marketplace for Jala products.",
};

export default function RootLayout({ children }: Readonly<Children>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased min-h-screen",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
