export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isBundle?: boolean;
  category?: "cards" | "calendar";
  packSize?: number;
};

// Individual card designs
export const cardDesigns = [
  {
    id: "heartland-thanks",
    name: "Heartland Thanks",
    slug: "heartland-thanks",
    description:
      "Vintage farm scene — windmill, red barn, wheat fields. Warm golds, barn red, earthy tones. Retro Americana poster style.",
    image: "/images/heartland-thanks.jpg",
  },
  {
    id: "thanks-from-the-trail",
    name: "Thanks from the Trail",
    slug: "thanks-from-the-trail",
    description:
      "Classic blue Ford Bronco, red mountains, white wildflowers. Vintage outdoor travel poster style.",
    image: "/images/thanks-from-the-trail.jpg",
  },
  {
    id: "thank-you-at-the-bar",
    name: '"Thank You" Ready at the Bar',
    slug: "thank-you-at-the-bar",
    description:
      "Comic book/pop-art barista in a coffee shop. Bold, fun, urban.",
    image: "/images/thank-you-at-the-bar.jpg",
  },
];

// Card products (singles + packs)
export const products: Product[] = [
  // Singles — $7.50 each
  {
    id: "heartland-thanks",
    name: "Heartland Thanks",
    slug: "heartland-thanks",
    description:
      "Vintage farm scene — windmill, red barn, wheat fields. Warm golds, barn red, earthy tones. Retro Americana poster style.",
    price: 7.50,
    image: "/images/heartland-thanks.jpg",
    packSize: 1,
  },
  {
    id: "thanks-from-the-trail",
    name: "Thanks from the Trail",
    slug: "thanks-from-the-trail",
    description:
      "Classic blue Ford Bronco, red mountains, white wildflowers. Vintage outdoor travel poster style.",
    price: 7.50,
    image: "/images/thanks-from-the-trail.jpg",
    packSize: 1,
  },
  {
    id: "thank-you-at-the-bar",
    name: '"Thank You" Ready at the Bar',
    slug: "thank-you-at-the-bar",
    description:
      "Comic book/pop-art barista in a coffee shop. Bold, fun, urban.",
    price: 7.50,
    image: "/images/thank-you-at-the-bar.jpg",
    packSize: 1,
  },
  // Set of 5 — $22.00 (pick your design)
  {
    id: "heartland-thanks-5pack",
    name: "Heartland Thanks — Set of 5",
    slug: "heartland-thanks-5pack",
    description:
      "Five Heartland Thanks cards. Stock your desk with your favorite design.",
    price: 22.00,
    image: "/images/heartland-thanks.jpg",
    packSize: 5,
  },
  {
    id: "thanks-from-the-trail-5pack",
    name: "Thanks from the Trail — Set of 5",
    slug: "thanks-from-the-trail-5pack",
    description:
      "Five Thanks from the Trail cards. Stock your desk with your favorite design.",
    price: 22.00,
    image: "/images/thanks-from-the-trail.jpg",
    packSize: 5,
  },
  {
    id: "thank-you-at-the-bar-5pack",
    name: '"Thank You" Ready at the Bar — Set of 5',
    slug: "thank-you-at-the-bar-5pack",
    description:
      "Five Ready at the Bar cards. Stock your desk with your favorite design.",
    price: 22.00,
    image: "/images/thank-you-at-the-bar.jpg",
    packSize: 5,
  },
  // Variety Box of 8 — $28.00
  {
    id: "variety-box-8",
    name: "The Variety Box",
    slug: "variety-box",
    description:
      "Eight cards across all three Todah Co. designs. The complete thank you toolkit.",
    price: 28.00,
    image: "/images/heartland-thanks.jpg",
    isBundle: true,
    packSize: 8,
  },
];

export type CalendarSize = "24x36" | "36x48";

export type CalendarVariant = {
  size: CalendarSize;
  label: string;
  price: number;
  sku: string;
};

export const calendarVariants: CalendarVariant[] = [
  { size: "24x36", label: "24×36\" Standard", price: 34.99, sku: "Posters-24x36-180gsm-Matte" },
  { size: "36x48", label: "36×48\" Premium", price: 49.99, sku: "Posters-36x48-PremiumMatte" },
];

export const calendarProduct: Product = {
  id: "bible-reading-calendar-2026",
  name: "2026 Bible Reading Calendar",
  slug: "bible-reading-calendar",
  description:
    "Read the entire Bible in one year. A large-format wall calendar with daily readings cycling through Law, History, Wisdom, Prophets, Gospels, and Epistles. Premium matte poster with free shipping.",
  price: 34.99,
  image: "/images/bible-reading-calendar.jpg",
  category: "calendar",
};

export function getProductBySlug(slug: string): Product | undefined {
  if (calendarProduct.slug === slug) return calendarProduct;
  return products.find((p) => p.slug === slug);
}

export function getSingleCards(): Product[] {
  return products.filter((p) => !p.isBundle && p.packSize === 1);
}

export function getFivePacks(): Product[] {
  return products.filter((p) => p.packSize === 5);
}

export function getIndividualProducts(): Product[] {
  return products.filter((p) => !p.isBundle && p.packSize === 1);
}

export function getBundleProduct(): Product | undefined {
  return products.find((p) => p.isBundle);
}

export function getCalendarProduct(): Product {
  return calendarProduct;
}
