"use client";

import { useState } from "react";

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center border-2 border-cream/20">
      <button
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="w-11 h-11 font-headline text-lg text-cream/60 hover:text-cream hover:bg-cream/10 transition-colors"
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="w-11 h-11 flex items-center justify-center font-headline text-base text-cream border-x-2 border-cream/20">
        {qty}
      </span>
      <button
        onClick={() => setQty((q) => q + 1)}
        className="w-11 h-11 font-headline text-lg text-cream/60 hover:text-cream hover:bg-cream/10 transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
