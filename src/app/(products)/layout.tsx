import { ProductNavigation } from "@/components/product-navigation";
import styles from "./layout.module.css";

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={styles.showcase} aria-label="Hygiene essentials">
      {children}
      <ProductNavigation />
    </main>
  );
}
