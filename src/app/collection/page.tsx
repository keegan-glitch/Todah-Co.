import Image from "next/image";
import Link from "next/link";
import { getIndividualProducts, getBundleProduct } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function CollectionPage() {
  const cards = getIndividualProducts();
  const bundle = getBundleProduct()!;

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">
              Save $3
            </span>
            <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl tracking-wider text-cream mt-4">
              The Complete Collection
            </h1>
            <div className="rule-accent w-12 mx-auto mt-6 mb-6" />
            <p className="font-body text-cream/60 text-lg sm:text-xl italic max-w-lg mx-auto">
              One box. Three reasons to say thanks.
            </p>
            <p className="font-headline text-3xl text-cream mt-6">
              ${bundle.price.toFixed(2)}
            </p>
          </div>

          {/* 3 Cards Fanned */}
          <div className="relative max-w-3xl mx-auto mb-16">
            <div className="flex justify-center items-end gap-[-20px]">
              {cards.map((card, i) => {
                const rotation = i === 0 ? "-rotate-6" : i === 2 ? "rotate-6" : "";
                const zIndex = i === 1 ? "z-20" : "z-10";
                const translateY = i === 1 ? "-translate-y-4" : "";

                return (
                  <div
                    key={card.id}
                    className={`relative w-[200px] sm:w-[240px] md:w-[280px] aspect-[3/4] ${rotation} ${zIndex} ${translateY} -mx-4 sm:-mx-6 transition-transform duration-500 hover:scale-105 hover:z-30 border border-cream/10 overflow-hidden bg-charcoal/50`}
                  >
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-contain"
                      sizes="280px"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="text-center">
            <AddToCartButton product={bundle} />
          </div>

          {/* What's Included */}
          <div className="mt-20 border-t border-cream/10 pt-16">
            <h2 className="font-headline text-2xl tracking-wider text-cream text-center mb-12">
              WHAT&apos;S INCLUDED
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {cards.map((card) => (
                <Link key={card.id} href={`/products/${card.slug}`} className="group text-center">
                  <div className="relative aspect-[3/4] bg-charcoal/50 border border-cream/10 overflow-hidden mb-4">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-contain group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-headline text-xl tracking-wider text-cream group-hover:text-sienna transition-colors">
                    {card.name}
                  </h3>
                  <p className="font-body text-cream/40 text-sm mt-1 italic">
                    {card.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}
