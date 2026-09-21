"use client";

import Image from "next/image";
import { useProducts } from "@/hooks/use-products";
import type { ProductId } from "@/types/product";
import styles from "./product-showcase.module.css";

type ProductShowcaseProps = {
  selectedId: ProductId;
};

export function ProductShowcase({ selectedId }: ProductShowcaseProps) {
  const productsQuery = useProducts();
  const selectedProduct = productsQuery.data?.find((product) => product.id === selectedId);

  if (productsQuery.isPending) {
    return (
      <section className={styles.panel} aria-label="Loading product">
        <div className={styles.titlePlaceholder} aria-hidden="true" />
        <div className={styles.illustration}>
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        </div>
        <p className={styles.srOnly} role="status">
          Loading product…
        </p>
      </section>
    );
  }

  if (productsQuery.isError) {
    return (
      <section className={`${styles.panel} ${styles.message}`} aria-labelledby="product-error-title">
        <h1 id="product-error-title">Products are unavailable</h1>
        <p>{productsQuery.error.message}</p>
        <button className={styles.retryButton} type="button" onClick={() => productsQuery.refetch()}>
          Try again
        </button>
      </section>
    );
  }

  if (!selectedProduct) {
    return (
      <section className={`${styles.panel} ${styles.message}`}>
        <h1>Product not found</h1>
        <p>The requested product is not present in the server response.</p>
      </section>
    );
  }

  return (
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
  );
}
