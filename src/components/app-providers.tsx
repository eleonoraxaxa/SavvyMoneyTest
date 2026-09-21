"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useApiMocking } from "@/hooks/use-api-mocking";
import styles from "./app-providers.module.css";

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  const apiMockingStatus = useApiMocking();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60_000,
          },
        },
      }),
  );

  if (apiMockingStatus === "error") {
    return (
      <main className={styles.loading}>
        <p role="alert">The product service could not be started. Refresh the page to try again.</p>
      </main>
    );
  }

  if (apiMockingStatus === "pending") {
    return (
      <main className={styles.loading}>
        <p role="status">Preparing product service…</p>
      </main>
    );
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
