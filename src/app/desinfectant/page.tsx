import type { Metadata } from "next";
import { ProductShowcase } from "@/components/product-showcase";

export const metadata: Metadata = {
  title: "Desinfectant | SavvyMoney Test",
};

export default function DesinfectantPage() {
  return <ProductShowcase selectedId="desinfectant" />;
}
