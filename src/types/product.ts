export const productIds = ["hazmat", "soap", "paper", "desinfectant"] as const;

export type ProductId = (typeof productIds)[number];

export type Product = {
  id: ProductId;
  name: string;
  image: string;
  imageDescription: string;
};
