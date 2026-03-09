"use client";

import { useCart } from "@/context/CartContext";
import { type Product } from "@/data/products";

export default function AddToCartButton({
  product,
  quantity = 1,
}: {
  product: Product;
  quantity?: number;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product, quantity)}
      className="px-10 py-3 bg-cream text-charcoal font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream hover:bg-transparent hover:text-cream transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
