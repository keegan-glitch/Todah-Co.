import Image from "next/image";
import { getCalendarProduct } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import QuantitySelector from "@/components/QuantitySelector";

export default function CalendarProductPage() {
  const product = getCalendarProduct();

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Calendar Image */}
          <div className="relative aspect-[4/3] bg-charcoal/50 border border-cream/10 overflow-hidden flex items-center justify-center p-4">
            <Image
              src={product.image}
              alt={product.name}
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
              {product.name}
            </h1>

            {/* Divider */}
            <div className="rule-accent w-12 mt-6 mb-6" />

            {/* Description */}
            <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Features */}
            <ul className="mt-6 space-y-2 font-body text-cream/50 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-sienna">&#9670;</span> 36&times;48&quot; large-format wall poster
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
            </ul>

            {/* Price */}
            <p className="font-headline text-3xl text-cream mt-8">
              ${product.price.toFixed(2)}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <QuantitySelector />
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
