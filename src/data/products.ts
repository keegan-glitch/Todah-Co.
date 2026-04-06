export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isBundle?: boolean;
  category?: "cards" | "calendar";
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

export const calendarProduct: Product = {
  id: "bible-reading-calendar-2026",
  name: "2026 Bible Reading Calendar",
  slug: "bible-reading-calendar",
  description:
    "Read the entire Bible in one year. A large-format wall calendar with daily readings cycling through Law, History, Wisdom, Prophets, Gospels, and Epistles. 36×48 inch poster on premium matte stock.",
  price: 34.99,
  image: "/images/bible-reading-calendar.jpg",
  category: "calendar",
};

export function getProductBySlug(slug: string): Product | undefined {
  if (calendarProduct.slug === slug) return calendarProduct;
  return products.find((p) => p.slug === slug);
}

export function getIndividualProducts(): Product[] {
  return products.filter((p) => !p.isBundle);
}

export function getBundleProduct(): Product | undefined {
  return products.find((p) => p.isBundle);
}

export function getCalendarProduct(): Product {
  return calendarProduct;
}
