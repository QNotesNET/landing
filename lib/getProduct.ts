// lib/getProduct.ts
import { client } from "@/sanity/lib/client";

export async function getProduct() {
  return await client.fetch(`
    *[_type == "product"][0]{
      title,
      description,
      images,
      variants[]{
        format,
        pages,
        paper,
        price,
        paymentUrl,
        stock,
        image
      }
    }
  `);
}
