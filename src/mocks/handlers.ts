import { delay, http, HttpResponse } from "msw";
import { mockProducts } from "./data/products";

export const handlers = [
  http.get("/api/products", async () => {
    await delay(500);

    return HttpResponse.json(mockProducts);
  }),
];
