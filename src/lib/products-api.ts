import { productIds, type Product, type ProductId } from "@/types/product";

export const productsQueryKey = ["products"] as const;

function isProductId(value: unknown): value is ProductId {
  return typeof value === "string" && productIds.some((id) => id === value);
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    isProductId(product.id) &&
    typeof product.name === "string" &&
    typeof product.image === "string" &&
    typeof product.imageDescription === "string"
  );
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch("/api/products", { signal });

  if (!response.ok) {
    throw new Error("Products could not be loaded.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error("The products response has an unexpected format.");
  }

  return data;
}
