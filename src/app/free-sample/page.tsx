"use client";

import { useState } from "react";
import Link from "next/link";

export default function FreeSamplePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Decorative corner marks */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-cream/20 animate-fade-in" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-cream/20 animate-fade-in" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-cream/20 animate-fade-in" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-cream/20 animate-fade-in" style={{ animationDelay: "0.8s" }} />

        <div className="max-w-2xl mx-auto">
          {/* Overline */}
          <p className="font-headline text-sienna text-sm sm:text-base tracking-[0.3em] uppercase animate-fade-up mb-4">
            Carpe Scriptura
          </p>

          {/* Headline */}
          <h1 className="font-headline text-[2.8rem] sm:text-[4rem] md:text-[5rem] leading-[0.9] tracking-wider text-cream animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Try the Bible Reading Plan &mdash; Free
          </h1>

          {/* Accent rule */}
          <div className="rule-accent w-12 mx-auto mt-6 mb-6 animate-scale-x" style={{ animationDelay: "0.3s" }} />

          {/* Subtitle */}
          <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed italic max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Get a 7-day sample of the Carpe Scriptura reading plan delivered to your inbox.
          </p>

          {/* Form / Success state */}
          <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            {status === "success" ? (
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 border border-cream/20 bg-cream/5">
                  <svg className="w-5 h-5 text-sienna flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-body text-cream text-sm sm:text-base">
                    Check your inbox &mdash; your sample is on its way.
                  </span>
                </div>
                <div>
                  <a
                    href="/downloads/bible-reading-plan-sample.pdf"
                    download
                    className="inline-block px-10 py-4 bg-cream text-charcoal font-headline text-base tracking-[0.2em] uppercase border-2 border-cream transition-all duration-300 hover:bg-transparent hover:text-cream"
                  >
                    Download Now
                  </a>
                </div>
                <p className="font-body text-cream/40 text-xs italic">
                  Or wait for the email &mdash; it includes the PDF as an attachment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-5 py-4 bg-transparent border-2 border-cream/30 text-cream font-body text-base placeholder:text-cream/30 focus:outline-none focus:border-sienna transition-colors duration-300"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-cream text-charcoal font-headline text-base tracking-[0.2em] uppercase border-2 border-cream transition-all duration-300 hover:bg-transparent hover:text-cream disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Send Me the Sample"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="font-body text-sienna text-sm mt-4">{errorMsg}</p>
            )}
          </div>

          {/* What you get */}
          <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <p className="font-body text-cream/40 text-xs tracking-wide uppercase mb-6">What&apos;s inside</p>
            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
              <div className="text-center">
                <span className="font-headline text-2xl sm:text-3xl text-cream">7</span>
                <p className="font-body text-cream/50 text-[10px] sm:text-xs mt-1">Days</p>
              </div>
              <div className="text-center">
                <span className="font-headline text-2xl sm:text-3xl text-cream">6</span>
                <p className="font-body text-cream/50 text-[10px] sm:text-xs mt-1">Genres</p>
              </div>
              <div className="text-center">
                <span className="font-headline text-2xl sm:text-3xl text-cream">1</span>
                <p className="font-body text-cream/50 text-[10px] sm:text-xs mt-1">Year Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <span className="font-body text-[10px] tracking-[0.3em] text-cream/30 uppercase">Scroll</span>
          <div className="w-px h-8 bg-cream/20" />
        </div>
      </section>

      {/* ─── Section Divider ─── */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="rule" />
      </div>

      {/* ─── CTA to Full Calendar ─── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-headline text-sienna text-lg sm:text-xl tracking-[0.3em] uppercase">
            Ready for the Full Year?
          </span>
          <div className="rule-accent w-8 mx-auto mt-4 mb-8" />
          <p className="font-body text-lg sm:text-xl text-cream/80 italic leading-relaxed">
            The complete Carpe Scriptura wall calendar covers all 365 days &mdash; 66 books, 6 genres, one beautiful reading plan to hang on your wall.
          </p>
          <Link
            href="/products/bible-reading-calendar"
            className="mt-10 group relative inline-block"
          >
            <span className="relative z-10 block px-10 py-4 bg-cream text-charcoal font-headline text-base sm:text-lg tracking-[0.2em] uppercase border-2 border-cream transition-all duration-300 group-hover:bg-transparent group-hover:text-cream">
              View Calendar
            </span>
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rule mb-12" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <div className="font-headline text-3xl tracking-[0.25em] text-cream">
                TODAH CO.
              </div>
              <p className="font-body text-xs text-cream/30 italic mt-2 tracking-wide">
                Gift Gratitude.
              </p>
            </div>
            <nav className="flex gap-10 font-headline text-xs tracking-[0.2em] text-cream/50 uppercase">
              <Link href="/" className="hover:text-cream transition-colors duration-300">
                Home
              </Link>
              <Link href="/products/bible-reading-calendar" className="hover:text-cream transition-colors duration-300">
                Calendar
              </Link>
              <Link href="/collection" className="hover:text-cream transition-colors duration-300">
                Cards
              </Link>
            </nav>
            <div className="font-body text-[10px] text-cream/20 tracking-wider">
              &copy; {new Date().getFullYear()} Todah Co.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
