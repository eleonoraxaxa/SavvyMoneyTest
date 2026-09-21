"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styles from "./app-providers.module.css";

let mockingPromise: Promise<void> | undefined;

function enableMocking() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  mockingPromise ??= import("@/mocks/browser").then(async ({ worker }) => {
    await worker.start({ onUnhandledRequest: "bypass" });
  });

  return mockingPromise;
}

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
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
  const [isMockingReady, setIsMockingReady] = useState(false);
  const [mockingError, setMockingError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    enableMocking()
      .then(() => {
        if (isMounted) {
          setIsMockingReady(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMockingError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (mockingError) {
    return (
      <main className={styles.loading}>
        <p role="alert">The product service could not be started. Refresh the page to try again.</p>
      </main>
    );
  }

  if (!isMockingReady) {
    return (
      <main className={styles.loading}>
        <p role="status">Preparing product service…</p>
      </main>
    );
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
