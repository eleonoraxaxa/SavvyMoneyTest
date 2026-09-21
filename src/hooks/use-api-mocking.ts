import { useEffect, useState } from "react";

type ApiMockingStatus = "pending" | "ready" | "error";

let mockingPromise: Promise<void> | undefined;

function enableApiMocking() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  mockingPromise ??= import("@/mocks/browser").then(async ({ worker }) => {
    await worker.start({ onUnhandledRequest: "bypass" });
  });

  return mockingPromise;
}

export function useApiMocking(): ApiMockingStatus {
  const [status, setStatus] = useState<ApiMockingStatus>("pending");

  useEffect(() => {
    let isMounted = true;

    enableApiMocking()
      .then(() => {
        if (isMounted) {
          setStatus("ready");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
