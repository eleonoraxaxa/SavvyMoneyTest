"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { products } from "@/data/products";
import styles from "./product-navigation.module.css";

export function ProductNavigation() {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <nav className={styles.tabs} aria-label="Product categories">
      {products.map((product) => (
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
