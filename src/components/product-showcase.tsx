"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { products, type ProductId } from "@/data/products";
import styles from "./product-showcase.module.css";

export function ProductShowcase() {
  const [selectedId, setSelectedId] = useState<ProductId>("soap");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % products.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + products.length) % products.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = products.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedId(products[nextIndex].id);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <main className={styles.showcase} aria-label="Hygiene essentials">
      {products.map((product) => (
        <section
          key={product.id}
          className={styles.panel}
          id={`panel-${product.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${product.id}`}
          tabIndex={0}
          hidden={selectedId !== product.id}
        >
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
              loading={product.id === "soap" ? "eager" : "lazy"}
            />
          </div>
        </section>
      ))}

      <div className={styles.tabs} role="tablist" aria-label="Product categories">
        {products.map((product, index) => (
          <button
            key={product.id}
            ref={(element) => { tabs.current[index] = element; }}
            className={styles.tab}
            id={`tab-${product.id}`}
            type="button"
            role="tab"
            aria-selected={selectedId === product.id}
            aria-controls={`panel-${product.id}`}
            tabIndex={selectedId === product.id ? 0 : -1}
            onClick={() => setSelectedId(product.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
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
          </button>
        ))}
      </div>
    </main>
  );
}
