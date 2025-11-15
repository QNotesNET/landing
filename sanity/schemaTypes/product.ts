import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  type: "document",
  title: "Produkt",

  fields: [
    {
      name: "title",
      type: "string",
      title: "Titel",
    },

    {
      name: "description",
      type: "text",
      title: "Beschreibung",
    },

    {
      name: "images",
      type: "array",
      title: "Galerie-Bilder",
      of: [{ type: "image" }],
    },

    {
      name: "variants",
      type: "array",
      title: "Varianten",
      of: [
        {
          type: "object",
          name: "variant",
          title: "Variante",
          fields: [
            {
              name: "format",
              type: "string",
              title: "Format",
              options: {
                list: ["A5", "A4"],
              },
            },
            {
              name: "pages",
              type: "number",
              title: "Seiten",
              options: {
                list: [100, 140, 200],
              },
            },
            {
              name: "paper",
              type: "string",
              title: "Papier",
              options: {
                list: ["Liniert", "Kariert", "Blanko"],
              },
            },
            {
              name: "price",
              type: "number",
              title: "Preis (€)",
            },
            {
              name: "paymentUrl",
              type: "url",
              title: "Payment URL",
            },
            {
              name: "stock",
              type: "number",
              title: "Lagerstand",
            },
            {
              name: "image",
              type: "image",
              title: "Varianten-Bild (optional)",
            },
          ],
          preview: {
            select: {
              title: "format",
              pages: "pages",
              paper: "paper",
              media: "image",
            },
            prepare({ title, pages, paper, media }) {
              return {
                title: `${title} – ${pages} Seiten – ${paper}`,
                media,
              };
            },
          },
        },
      ],
    },
  ],
});
