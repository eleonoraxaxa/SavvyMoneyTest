import { useQuery } from "@tanstack/react-query";
import { getProducts, productsQueryKey } from "@/lib/products-api";

export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: ({ signal }) => getProducts(signal),
  });
}
