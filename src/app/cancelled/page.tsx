import Link from "next/link";

export default function CancelledPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-headline text-5xl sm:text-6xl tracking-wider text-cream">
        ORDER CANCELLED
      </h1>
      <div className="rule w-24 mx-auto mt-6 mb-6" />
      <p className="font-body text-cream/60 text-lg italic max-w-md">
        No worries &mdash; your cart is still waiting for you.
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
