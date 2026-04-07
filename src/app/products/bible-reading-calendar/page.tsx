"use client";

import Image from "next/image";
import { useState } from "react";
import { getCalendarProduct, calendarVariants, type CalendarSize } from "@/data/products";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";

export default function CalendarProductPage() {
  const baseProduct = getCalendarProduct();
  const [selectedSize, setSelectedSize] = useState<CalendarSize>("24x36");
  const { addItem } = useCart();

  const variant = calendarVariants.find((v) => v.size === selectedSize)!;
  const product = { ...baseProduct, price: variant.price, id: `${baseProduct.id}-${variant.size}` };

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Calendar Image */}
          <div className="relative aspect-[4/3] bg-charcoal/50 border border-cream/10 overflow-hidden flex items-center justify-center p-4">
            <Image
              src={baseProduct.image}
              alt={baseProduct.name}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right — Details */}
          <div className="flex flex-col justify-center">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">Todah Co.</span>
              <span className="text-cream/20">/</span>
              <span className="font-headline text-xs tracking-[0.3em] text-cream/40 uppercase">Calendar</span>
            </div>

            {/* Title */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl tracking-wider text-cream leading-tight">
              {baseProduct.name}
            </h1>
            <p className="font-body text-sienna text-base sm:text-lg italic mt-3 tracking-wide">
              Carpe Scriptura &mdash; Seize the Word
            </p>

            {/* Divider */}
            <div className="rule-accent w-12 mt-6 mb-6" />

            {/* Description */}
            <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-md">
              {baseProduct.description}
            </p>

            {/* Size Selector */}
            <div className="mt-8">
              <span className="font-headline text-xs tracking-[0.3em] text-cream/50 uppercase mb-3 block">
                Select Size
              </span>
              <div className="flex gap-3">
                {calendarVariants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedSize(v.size)}
                    className={`px-6 py-3 font-headline text-sm tracking-[0.15em] border-2 transition-colors duration-300 ${
                      selectedSize === v.size
                        ? "bg-cream text-charcoal border-cream"
                        : "bg-transparent text-cream/60 border-cream/20 hover:border-cream/50"
                    }`}
                  >
                    <span className="block">{v.label}</span>
                    <span className="block text-xs mt-1 opacity-70">${v.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2 font-body text-cream/50 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-sienna">&#9670;</span> {selectedSize === "36x48" ? "36×48\"" : "24×36\""} large-format wall poster
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sienna">&#9670;</span> 365 daily readings covering all 66 books
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sienna">&#9670;</span> 6-genre color-coded rotation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sienna">&#9670;</span> Premium matte stock
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sienna">&#9670;</span> Free shipping
              </li>
            </ul>

            {/* Price */}
            <p className="font-headline text-3xl text-cream mt-8">
              ${variant.price.toFixed(2)}
            </p>
            <p className="font-body text-cream/40 text-sm mt-1">Free shipping included</p>

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <QuantitySelector />
              <button
                onClick={() => addItem(product)}
                className="px-10 py-3 bg-cream text-charcoal font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream hover:bg-transparent hover:text-cream transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
