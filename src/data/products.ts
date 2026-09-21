export type Product = {
  id: string;
  name: string;
  image: string;
  imageDescription: string;
};

export const products = [
  {
    id: "hazmat",
    name: "Hazmat",
    image: "/images/hazmat.svg",
    imageDescription: "Illustration of a person wearing a yellow protective suit and respirator.",
  },
  {
    id: "soap",
    name: "Soap",
    image: "/images/soap.svg",
    imageDescription: "Illustration of a yellow bar of soap with a pink cross and blue bubbles.",
  },
  {
    id: "paper",
    name: "Paper",
    image: "/images/paper.svg",
    imageDescription: "Illustration of a yellow and peach tissue box with white tissues and a pink cross.",
  },
  {
    id: "desinfectant",
    name: "Desinfectant",
    image: "/images/desinfectant.svg",
    imageDescription: "Illustration of a blue disinfectant spray bottle with a pink cross.",
  },
] as const satisfies readonly Product[];

export type ProductId = (typeof products)[number]["id"];
