import WholesaleForm from "@/components/WholesaleForm";

export default function WholesalePage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">
            Wholesale
          </span>
          <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl tracking-wider text-cream mt-4">
            Stock Todah Co.
          </h1>
          <div className="rule-accent w-12 mx-auto mt-6 mb-6" />
          <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            We partner with coffee shops, outdoor retailers, and gift boutiques
            that believe gratitude deserves a place on the shelf. Interested in
            carrying Todah Co.? Tell us about your business below.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-lg mx-auto">
          <WholesaleForm />
        </div>
      </div>
    </main>
  );
}
