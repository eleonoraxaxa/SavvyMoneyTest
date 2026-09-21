import type { ReactNode } from "react";
import styles from "./status-page.module.css";

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  children: ReactNode;
  embedded?: boolean;
};

export function StatusPage({ code, title, description, children, embedded = false }: StatusPageProps) {
  const Root = embedded ? "div" : "main";

  return (
    <Root className={styles.page} data-embedded={embedded}>
      <section className={styles.content}>
        <p className={styles.code} aria-hidden="true">
          {code}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>{children}</div>
      </section>
    </Root>
  );
}
