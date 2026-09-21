import type { Metadata } from "next";
import { ProductShowcase } from "@/components/product-showcase";

export const metadata: Metadata = {
  title: "Paper",
};

export default function PaperPage() {
  return <ProductShowcase selectedId="paper" />;
}
