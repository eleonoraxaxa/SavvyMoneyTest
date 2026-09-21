"use client";

import Image from "next/image";
import { useProducts } from "@/hooks/use-products";
import type { Product, ProductId } from "@/types/product";
import styles from "./product-showcase.module.css";

type ProductShowcaseProps = {
  selectedId: ProductId;
};

function ProductLoading() {
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

type ProductErrorProps = {
  message: string;
  onRetry: () => void;
};

function ProductError({ message, onRetry }: ProductErrorProps) {
  return (
    <section className={`${styles.panel} ${styles.message}`} aria-labelledby="product-error-title">
      <h1 id="product-error-title">Products are unavailable</h1>
      <p>{message}</p>
      <button className={styles.retryButton} type="button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}

function ProductNotFound() {
  return (
    <section className={`${styles.panel} ${styles.message}`}>
      <h1>Product not found</h1>
      <p>The requested product is not present in the server response.</p>
    </section>
  );
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <section className={styles.panel}>
      <h1 className={styles.title} data-compact={product.name.length > 8}>
        {product.name}
      </h1>
      <div className={styles.illustration}>
        <Image
          className={styles.productImage}
          src={product.image}
          alt={product.imageDescription}
          width={274}
          height={274}
          loading="eager"
        />
      </div>
    </section>
  );
}

export function ProductShowcase({ selectedId }: ProductShowcaseProps) {
  const productsQuery = useProducts();
  const selectedProduct = productsQuery.data?.find((product) => product.id === selectedId);

  if (productsQuery.isPending) {
    return <ProductLoading />;
  }

  if (productsQuery.isError) {
    return (
      <ProductError
        message={productsQuery.error.message}
        onRetry={() => void productsQuery.refetch()}
      />
    );
  }

  if (!selectedProduct) {
    return <ProductNotFound />;
  }

  return <ProductDetails product={selectedProduct} />;
}
