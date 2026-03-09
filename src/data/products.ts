export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isBundle?: boolean;
};

export const products: Product[] = [
  {
    id: "heartland-thanks",
    name: "Heartland Thanks",
    slug: "heartland-thanks",
    description:
      "Vintage farm scene — windmill, red barn, wheat fields. Warm golds, barn red, earthy tones. Retro Americana poster style.",
    price: 6.99,
    // Card image: swap with final production image if needed
    image: "/images/heartland-thanks.jpg",
  },
  {
    id: "thanks-from-the-trail",
    name: "Thanks from the Trail",
    slug: "thanks-from-the-trail",
    description:
      "Classic blue Ford Bronco, red mountains, white wildflowers. Vintage outdoor travel poster style.",
    price: 6.99,
    // Card image: swap with final production image if needed
    image: "/images/thanks-from-the-trail.jpg",
  },
  {
    id: "thank-you-at-the-bar",
    name: '"Thank You" Ready at the Bar',
    slug: "thank-you-at-the-bar",
    description:
      "Comic book/pop-art barista in a coffee shop. Bold, fun, urban.",
    price: 6.99,
    // Card image: swap with final production image if needed
    image: "/images/thank-you-at-the-bar.jpg",
  },
  {
    id: "complete-collection",
    name: "The Complete Collection",
    slug: "complete-collection",
    description:
      "All 3 Todah Co. designs in one box. One box. Three reasons to say thanks.",
    price: 17.99,
    // Bundle image: swap with a styled bundle photo when available
    image: "/images/heartland-thanks.jpg",
    isBundle: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getIndividualProducts(): Product[] {
  return products.filter((p) => !p.isBundle);
}

export function getBundleProduct(): Product | undefined {
  return products.find((p) => p.isBundle);
}
