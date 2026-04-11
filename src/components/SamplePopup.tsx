"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SamplePopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("sample-popup-dismissed")) return;

    const timer = setTimeout(() => setShow(true), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("sample-popup-dismissed", "true");
  };

  if (!show || dismissed) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[80] cursor-pointer"
        onClick={dismiss}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
        <div className="bg-charcoal border border-cream/10 max-w-md w-full p-8 sm:p-10 relative">
          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 font-headline text-cream/40 hover:text-cream text-2xl transition-colors"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Content */}
          <span className="font-headline text-xs tracking-[0.3em] text-sienna uppercase">
            Free Download
          </span>
          <h3 className="font-headline text-3xl sm:text-4xl tracking-wider text-cream mt-3 leading-tight">
            Try the Bible Reading Plan
          </h3>
          <div className="rule-accent w-10 mt-4 mb-4" />
          <p className="font-body text-cream/60 text-sm sm:text-base italic leading-relaxed">
            Get a free 7-day sample of the Carpe Scriptura reading plan delivered to your inbox. No strings attached.
          </p>

          <Link
            href="/free-sample"
            onClick={dismiss}
            className="inline-block mt-6 px-8 py-3 bg-cream text-charcoal font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream transition-all duration-300 hover:bg-transparent hover:text-cream"
          >
            Get the Sample
          </Link>

          <p className="font-body text-cream/30 text-xs mt-4">
            7 days &bull; 6 genres &bull; 100% free
          </p>
        </div>
      </div>
    </>
  );
}
