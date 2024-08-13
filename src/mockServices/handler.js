import { rest } from "msw";

export const handler = [
  rest.get("https://restcountries.com/v3.1/all", (req, res, ctx) => {
    return ctx(
      ctx.status(200),
      ctx.json([
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
      ])
    );
  }),
];
