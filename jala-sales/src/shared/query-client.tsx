"use client";

import type { Children } from "@/types/children";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: Readonly<Children>) {
  return (
    <SessionProvider>
      <ReactQueryClientProvider client={queryClient}>
        {children}
      </ReactQueryClientProvider>
    </SessionProvider>
  );
}
