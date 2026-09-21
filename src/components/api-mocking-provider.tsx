"use client";

import type { ReactNode } from "react";
import { useApiMocking } from "@/hooks/use-api-mocking";
import styles from "./api-mocking-provider.module.css";

const isApiMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING !== "false";

function EnabledApiMockingProvider({ children }: Readonly<{ children: ReactNode }>) {
  const status = useApiMocking();

  if (status === "error") {
    return (
      <main className={styles.loading}>
        <p role="alert">The product service could not be started. Refresh the page to try again.</p>
      </main>
    );
  }

  if (status === "pending") {
    return (
      <main className={styles.loading}>
        <p role="status">Preparing product service…</p>
      </main>
    );
  }

  return children;
}

export function ApiMockingProvider({ children }: Readonly<{ children: ReactNode }>) {
  if (!isApiMockingEnabled) {
    return children;
  }

  return <EnabledApiMockingProvider>{children}</EnabledApiMockingProvider>;
}
