import Link from "next/link";
import { StatusPage } from "./status-page";

export function NotFoundPage({ embedded = false }: { embedded?: boolean }) {
  return (
    <>
      <title>Page not found</title>
      <StatusPage
        code="404"
        title="Page not found"
        description="The page or product you are looking for does not exist."
        embedded={embedded}
      >
        <Link href="/soap">Back to products</Link>
      </StatusPage>
    </>
  );
}
