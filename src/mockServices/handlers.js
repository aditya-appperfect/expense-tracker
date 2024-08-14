import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://restcountries.com/v3.1/all", () => {
    return HttpResponse.json([
      {
        name: { common: "india" },
      },
      {
        name: { common: "South Georgia" },
      },
      {
        name: { common: "Grenada" },
      },
      {
        name: { common: "Switzerland" },
      },
    ]);
  }),
];
