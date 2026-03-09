import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getBundleProduct } from "@/data/products";
import QuantitySelector from "@/components/QuantitySelector";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products
    .filter((p) => !p.isBundle)
    .map((p) => ({ slug: p.slug }));
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product || product.isBundle) return notFound();

  const bundle = getBundleProduct();

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — Card Image */}
            <div className="relative aspect-[3/4] bg-charcoal/50 border border-cream/10 overflow-hidden flex items-center justify-center p-6">
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
                <span className="font-headline text-xs tracking-[0.3em] text-cream/40 uppercase">Cards</span>
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

              {/* Price */}
              <p className="font-headline text-3xl text-cream mt-8">
                ${product.price.toFixed(2)}
              </p>

              {/* Quantity + Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <QuantitySelector />
                <AddToCartButton product={product} />
              </div>

              {/* Bundle Upsell */}
              {bundle && (
                <div className="mt-12 border border-cream/10 p-6">
                  <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">
                    Save $3
                  </span>
                  <h3 className="font-headline text-xl tracking-wider text-cream mt-2">
                    Complete the Collection
                  </h3>
                  <p className="font-body text-cream/50 text-sm mt-2 italic">
                    All 3 designs &mdash; ${bundle.price.toFixed(2)}
                  </p>
                  <Link
                    href="/collection"
                    className="inline-block mt-4 px-6 py-2 bg-transparent text-cream font-headline text-xs tracking-[0.2em] uppercase border-2 border-cream hover:bg-cream hover:text-charcoal transition-colors duration-300"
                  >
                    View Bundle
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
    </main>
  );
}
