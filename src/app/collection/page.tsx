import Image from "next/image";
import Link from "next/link";
import { getSingleCards, getFivePacks, getBundleProduct } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function CollectionPage() {
  const singles = getSingleCards();
  const fivePacks = getFivePacks();
  const varietyBox = getBundleProduct()!;

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">
            The Collection
          </span>
          <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl tracking-wider text-cream mt-4">
            Thank You Cards
          </h1>
          <div className="rule-accent w-12 mx-auto mt-6 mb-6" />
          <p className="font-body text-cream/60 text-lg sm:text-xl italic max-w-lg mx-auto">
            Three designs. Free shipping on every order.
          </p>
        </div>

        {/* ─── Variety Box (lead product) ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <span className="font-headline text-sienna text-sm tracking-[0.3em]">BEST VALUE</span>
            <div className="rule flex-1" />
            <span className="font-body text-cream/30 text-xs italic">$3.50/card</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Fanned cards */}
            <div className="relative flex justify-center items-end">
              {singles.map((card, i) => {
                const rotation = i === 0 ? "-rotate-6" : i === 2 ? "rotate-6" : "";
                const zIndex = i === 1 ? "z-20" : "z-10";
                const translateY = i === 1 ? "-translate-y-4" : "";
                return (
                  <div
                    key={card.id}
                    className={`relative w-[180px] sm:w-[220px] md:w-[240px] aspect-[3/4] ${rotation} ${zIndex} ${translateY} -mx-4 sm:-mx-6 border border-cream/10 overflow-hidden bg-charcoal/50`}
                  >
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-contain"
                      sizes="240px"
                    />
                  </div>
                );
              })}
            </div>

            {/* Details */}
            <div>
              <h2 className="font-headline text-3xl sm:text-4xl tracking-wider text-cream">
                {varietyBox.name}
              </h2>
              <div className="rule-accent w-12 mt-4 mb-4" />
              <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-md">
                {varietyBox.description}
              </p>
              <ul className="mt-4 space-y-2 font-body text-cream/50 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-sienna">&#9670;</span> 8 folded cards with envelopes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sienna">&#9670;</span> All 3 designs included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sienna">&#9670;</span> 100# uncoated cover stock
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sienna">&#9670;</span> Free shipping
                </li>
              </ul>
              <p className="font-headline text-3xl text-cream mt-6">
                ${varietyBox.price.toFixed(2)}
              </p>
              <p className="font-body text-cream/40 text-sm mt-1">Free shipping included</p>
              <div className="mt-6">
                <AddToCartButton product={varietyBox} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Sets of 5 ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <span className="font-headline text-sienna text-sm tracking-[0.3em]">SETS OF 5</span>
            <div className="rule flex-1" />
            <span className="font-body text-cream/30 text-xs italic">$4.40/card</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {fivePacks.map((pack) => (
              <div key={pack.id} className="group">
                <div className="relative aspect-[3/4] bg-charcoal/50 border border-cream/10 overflow-hidden mb-4">
                  <Image
                    src={pack.image}
                    alt={pack.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Pack badge */}
                  <div className="absolute top-3 right-3 bg-charcoal/80 px-3 py-1">
                    <span className="font-headline text-xs tracking-[0.15em] text-cream">5 PACK</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl tracking-wider text-cream">
                  {pack.name}
                </h3>
                <p className="font-body text-cream/40 text-sm mt-1 italic">
                  {pack.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-headline text-xl text-cream">
                    ${pack.price.toFixed(2)}
                  </p>
                  <AddToCartButton product={pack} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Singles ─── */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <span className="font-headline text-sienna text-sm tracking-[0.3em]">SINGLES</span>
            <div className="rule flex-1" />
            <span className="font-body text-cream/30 text-xs italic">$7.50/card</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {singles.map((card) => (
              <Link key={card.id} href={`/products/${card.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-charcoal/50 border border-cream/10 overflow-hidden mb-4">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-headline text-xl tracking-wider text-cream group-hover:text-sienna transition-colors">
                  {card.name}
                </h3>
                <p className="font-body text-cream/40 text-sm mt-1 italic">
                  {card.description}
                </p>
                <p className="font-headline text-lg text-cream/60 mt-2">
                  ${card.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
