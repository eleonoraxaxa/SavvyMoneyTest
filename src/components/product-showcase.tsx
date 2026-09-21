import Image from "next/image";
import Link from "next/link";
import { products, type ProductId } from "@/data/products";
import styles from "./product-showcase.module.css";

type ProductShowcaseProps = {
  selectedId: ProductId;
};

export function ProductShowcase({ selectedId }: ProductShowcaseProps) {
  const selectedProduct = products.find((product) => product.id === selectedId);

  if (!selectedProduct) {
    throw new Error(`Unknown product: ${selectedId}`);
  }

  return (
    <main className={styles.showcase} aria-label="Hygiene essentials">
      <section className={styles.panel}>
        <h1 className={styles.title} data-compact={selectedProduct.name.length > 8}>
          {selectedProduct.name}
        </h1>
        <div className={styles.illustration}>
          <Image
            className={styles.productImage}
            src={selectedProduct.image}
            alt={selectedProduct.imageDescription}
            width={274}
            height={274}
            loading="eager"
          />
        </div>
      </section>

      <nav className={styles.tabs} aria-label="Product categories">
        {products.map((product) => (
          <Link
            key={product.id}
            className={styles.tab}
            href={`/${product.id}`}
            aria-current={selectedId === product.id ? "page" : undefined}
          >
            <Image
              className={styles.tabIcon}
              src={product.image}
              alt=""
              width={52}
              height={52}
              loading="eager"
            />
            <span className={styles.tabLabel}>{product.name}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
