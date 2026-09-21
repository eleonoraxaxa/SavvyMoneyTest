import type { Metadata } from "next";
import { ProductShowcase } from "@/components/product-showcase";

export const metadata: Metadata = {
  title: "Hazmat",
};

export default function HazmatPage() {
  return <ProductShowcase selectedId="hazmat" />;
}
