"use client";

import { SupabaseProvider } from "./supabase-provider";
import { QueryClientProvider } from "./query-client-provider";

export function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SupabaseProvider>
  );
}
