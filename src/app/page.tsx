import Image from "next/image";
import Link from "next/link";
import { getIndividualProducts, getCalendarProduct } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

const CARD_NUMBERS = ["01", "02", "03"];

export default function Home() {
  const cards = getIndividualProducts();
  const calendar = getCalendarProduct();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Decorative corner marks */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-cream/20 animate-fade-in" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-cream/20 animate-fade-in" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-cream/20 animate-fade-in" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-cream/20 animate-fade-in" style={{ animationDelay: "1.2s" }} />

        {/* Wordmark */}
        <div className="relative">
          <h1 className="font-headline text-[5rem] sm:text-[8rem] md:text-[11rem] leading-[0.85] tracking-[0.3em] text-cream animate-fade-up text-center" style={{ textIndent: "0.3em" }}>
            TODAH
          </h1>
          <div className="relative my-3 sm:my-4">
            <span className="font-headline text-[3rem] sm:text-[5rem] md:text-[7rem] leading-none tracking-[0.2em] text-cream animate-fade-up block text-center" style={{ animationDelay: "0.2s", textIndent: "0.2em" }}>
              CO.
            </span>
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center pointer-events-none">
              <div className="rule-accent w-[60px] sm:w-[100px] animate-scale-x origin-right" style={{ animationDelay: "0.4s" }} />
              <div className="flex-1" />
              <div className="rule-accent w-[60px] sm:w-[100px] animate-scale-x origin-left" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="font-body text-cream/60 text-base sm:text-lg tracking-[0.15em] italic animate-fade-up" style={{ animationDelay: "0.6s" }}>
          Gift Gratitude.
        </p>

        {/* CTA */}
        <Link
          href="#collection"
          className="mt-12 sm:mt-16 group relative animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="relative z-10 block px-10 py-4 bg-cream text-charcoal font-headline text-base sm:text-lg tracking-[0.2em] uppercase border-2 border-cream transition-all duration-300 group-hover:bg-transparent group-hover:text-cream">
            Shop the Collection
          </span>
        </Link>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
          <span className="font-body text-[10px] tracking-[0.3em] text-cream/30 uppercase">Scroll</span>
          <div className="w-px h-8 bg-cream/20" />
        </div>
      </section>

      {/* ─── Section Divider ─── */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="rule" />
      </div>

      {/* ─── Bible Reading Calendar ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-16">
            <span className="font-headline text-sienna text-sm tracking-[0.3em]">NEW</span>
            <div className="rule flex-1" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Link href={`/products/${calendar.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Calendar Image */}
              <div className="relative aspect-[4/3] bg-charcoal/50 border border-cream/10 overflow-hidden">
                <Image
                  src={calendar.image}
                  alt={calendar.name}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Details */}
              <div>
                <h3 className="font-headline text-3xl sm:text-4xl lg:text-5xl tracking-wider text-cream group-hover:text-sienna transition-colors duration-300 leading-tight">
                  {calendar.name}
                </h3>
                <div className="rule-accent w-12 mt-6 mb-6" />
                <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-md">
                  {calendar.description}
                </p>
                <p className="font-headline text-2xl text-cream mt-6">
                  ${calendar.price.toFixed(2)}
                </p>
                <div className="mt-8">
                  <span className="inline-block px-10 py-4 bg-cream text-charcoal font-headline text-base tracking-[0.2em] uppercase border-2 border-cream transition-all duration-300 group-hover:bg-transparent group-hover:text-cream">
                    View Calendar
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      <div className="max-w-6xl mx-auto px-8">
        <div className="rule" />
      </div>

      {/* ─── What's in a Name ─── */}
      <section className="py-24 sm:py-32 px-6">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">
              What&apos;s in a Name
            </span>
            <div className="rule-accent w-8 mx-auto mt-4 mb-8" />
            <p className="font-body text-lg sm:text-xl text-cream/80 italic leading-relaxed">
              &ldquo;Todah (toh-DAH). An ancient word for a thank offering. Gratitude
              as something tangible. Brought, given, held. A card does that in a
              way a text doesn&apos;t.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="max-w-6xl mx-auto px-8">
        <div className="rule" />
      </div>

      {/* ─── Product Grid ─── */}
      <section id="collection" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-20">
            <span className="font-headline text-sienna text-sm tracking-[0.3em]">THE COLLECTION</span>
            <div className="rule flex-1" />
            <span className="font-body text-cream/30 text-xs italic">3 designs</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, i) => (
            <ScrollReveal key={card.id} delay={i * 150}>
              <Link href={`/products/${card.slug}`} className="group block">
                <div className="card-lift">
                  {/* Card number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-headline text-5xl text-cream/10 leading-none">
                      {CARD_NUMBERS[i]}
                    </span>
                    <div className="rule-accent w-8" />
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-cream/10">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                    {/* View label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-4 py-2 bg-cream text-charcoal font-headline text-xs tracking-[0.2em] uppercase">
                        View Card
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-5 flex items-start justify-between">
                    <div>
                      <h3 className="font-headline text-xl sm:text-2xl tracking-wider text-cream group-hover:text-sienna transition-colors duration-300">
                        {card.name}
                      </h3>
                      <p className="font-body text-cream/40 text-xs sm:text-sm mt-1 max-w-[280px] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <span className="font-headline text-lg text-cream/60 mt-1">
                      ${card.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bundle teaser */}
        <ScrollReveal delay={200}>
          <div className="mt-20 border border-cream/10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-headline text-xs tracking-[0.3em] text-sienna">SAVE $3</span>
              <h3 className="font-headline text-2xl sm:text-3xl tracking-wider text-cream mt-2">
                The Complete Collection
              </h3>
              <p className="font-body text-cream/50 text-sm mt-2 italic">
                All three designs &mdash; $17.99
              </p>
            </div>
            <Link
              href="/collection"
              className="px-8 py-3 bg-transparent text-cream font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream hover:bg-cream hover:text-charcoal transition-colors duration-300 whitespace-nowrap"
            >
              View Bundle
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Brand Statement ─── */}
      <section className="relative py-28 sm:py-36 px-6 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-olive/5" />

        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto text-center">
            {/* Large decorative quote mark */}
            <span className="block font-headline text-[8rem] sm:text-[12rem] text-sienna/10 leading-none select-none -mb-16 sm:-mb-24">
              &ldquo;
            </span>
            <blockquote>
              <p className="font-body text-xl sm:text-2xl md:text-3xl text-cream/90 italic leading-relaxed">
                The read receipt is not a thank you note.
              </p>
              <p className="font-body text-xl sm:text-2xl md:text-3xl text-cream/90 italic leading-relaxed mt-3">
                Todah Co. is here to fix that &mdash;
              </p>
              <p className="font-body text-xl sm:text-2xl md:text-3xl text-cream/90 italic leading-relaxed mt-3">
                one card at a time.
              </p>
            </blockquote>
            <div className="rule-accent w-12 mx-auto mt-10" />
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rule mb-12" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Wordmark */}
            <div>
              <div className="font-headline text-3xl tracking-[0.25em] text-cream">
                TODAH CO.
              </div>
              <p className="font-body text-xs text-cream/30 italic mt-2 tracking-wide">
                Gift Gratitude.
              </p>
            </div>

            {/* Nav */}
            <nav className="flex gap-10 font-headline text-xs tracking-[0.2em] text-cream/50 uppercase">
              <Link href="#collection" className="hover:text-cream transition-colors duration-300">
                Shop
              </Link>
              <Link href="/collection" className="hover:text-cream transition-colors duration-300">
                Bundle
              </Link>
              <Link href="/wholesale" className="hover:text-cream transition-colors duration-300">
                Wholesale
              </Link>
            </nav>

            {/* Stamp */}
            <div className="font-body text-[10px] text-cream/20 tracking-wider">
              &copy; {new Date().getFullYear()} Todah Co.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
