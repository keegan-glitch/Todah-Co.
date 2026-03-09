"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { openCart, totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-5 px-6 sm:px-8 flex items-center justify-between bg-charcoal/90 backdrop-blur-sm">
      <Link
        href="/"
        className="font-headline text-xl tracking-[0.2em] text-cream hover:text-sienna transition-colors"
      >
        TODAH CO.
      </Link>

      <nav className="flex items-center gap-8">
        <Link
          href="/#collection"
          className="font-headline text-xs tracking-[0.2em] text-cream/50 uppercase hover:text-cream transition-colors hidden sm:block"
        >
          Shop
        </Link>
        <Link
          href="/collection"
          className="font-headline text-xs tracking-[0.2em] text-cream/50 uppercase hover:text-cream transition-colors hidden sm:block"
        >
          Bundle
        </Link>
        <Link
          href="/wholesale"
          className="font-headline text-xs tracking-[0.2em] text-cream/50 uppercase hover:text-cream transition-colors hidden sm:block"
        >
          Wholesale
        </Link>

        {/* Cart button */}
        <button
          onClick={openCart}
          className="relative font-headline text-xs tracking-[0.2em] text-cream/50 uppercase hover:text-cream transition-colors"
          aria-label="Open cart"
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 w-5 h-5 bg-sienna text-cream text-[10px] font-headline flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
