"use client";

import Link from "next/link";
import { useEffect } from "react";
import { StatusPage } from "@/components/status-page";
import styles from "@/components/status-page.module.css";
import "./globals.css";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalErrorPage({ error, retry }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={styles.globalBody}>
        <title>Something went wrong</title>
        <StatusPage
          code="500"
          title="Something went wrong"
          description="We could not open this page. Please try again or return to the product list."
        >
          <button type="button" onClick={retry}>
            Try again
          </button>
          <Link href="/soap">Back to products</Link>
        </StatusPage>
      </body>
    </html>
  );
}
