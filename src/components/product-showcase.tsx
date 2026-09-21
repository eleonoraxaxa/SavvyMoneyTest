import Image from "next/image";
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
