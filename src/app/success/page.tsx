import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase mb-4">
        Order Confirmed
      </span>
      <h1 className="font-headline text-5xl sm:text-6xl tracking-wider text-cream">
        TODAH.
      </h1>
      <div className="rule-accent w-12 mx-auto mt-6 mb-6" />
      <p className="font-body text-cream/60 text-lg italic max-w-md">
        Your gratitude is on its way. Thank you for your order.
      </p>
      <Link
        href="/"
        className="mt-10 px-8 py-3 bg-cream text-charcoal font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream hover:bg-transparent hover:text-cream transition-colors duration-300"
      >
        Back to Shop
      </Link>
    </main>
  );
}
