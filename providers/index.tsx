"use client";

import { Session } from "@supabase/auth-helpers-nextjs";
import { SupabaseProvider } from "./supabase-provider";
import { QueryClientProvider } from "./query-client-provider";

export function Providers({
  children,
  session,
}: {
  readonly children: React.ReactNode;
  readonly session: Session | null;
}) {
  return (
    <SupabaseProvider session={session}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SupabaseProvider>
  );
}
