"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import styles from "./product-navigation.module.css";

export function ProductNavigation() {
  const selectedSegment = useSelectedLayoutSegment();
  const productsQuery = useProducts();

  if (productsQuery.isPending) {
    return (
      <div className={styles.tabsPlaceholder} aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span className={styles.tabPlaceholder} key={index} />
        ))}
      </div>
    );
  }

  if (productsQuery.isError || productsQuery.data.length === 0) {
    return null;
  }

  return (
    <nav className={styles.tabs} aria-label="Product categories">
      {productsQuery.data.map((product) => (
        <Link
          key={product.id}
          className={styles.tab}
          href={`/${product.id}`}
          aria-current={selectedSegment === product.id ? "page" : undefined}
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
  );
}
