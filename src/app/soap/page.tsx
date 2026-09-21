import type { Metadata } from "next";
import { ProductShowcase } from "@/components/product-showcase";

export const metadata: Metadata = {
  title: "Soap | SavvyMoney Test",
};

export default function SoapPage() {
  return <ProductShowcase selectedId="soap" />;
}
