import type { Metadata } from "next";
import { ProductShowcase } from "@/components/product-showcase";

export const metadata: Metadata = {
  title: "Desinfectant",
};

export default function DesinfectantPage() {
  return <ProductShowcase selectedId="desinfectant" />;
}
