"use client";

import { useState } from "react";

export default function WholesaleForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      business: (form.elements.namedItem("business") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    const res = await fetch("/api/wholesale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-16">
        <h2 className="font-headline text-3xl tracking-wider text-cream">
          INQUIRY SENT
        </h2>
        <div className="rule-accent w-12 mx-auto mt-4 mb-4" />
        <p className="font-body text-cream/60 italic">
          We&apos;ll be in touch shortly. Todah.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-2 border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:border-cream/50 focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-headline text-xs tracking-[0.2em] text-cream/50 uppercase mb-2"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="business"
          className="block font-headline text-xs tracking-[0.2em] text-cream/50 uppercase mb-2"
        >
          Business Name
        </label>
        <input
          type="text"
          id="business"
          name="business"
          className={inputClass}
          placeholder="Your business"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-headline text-xs tracking-[0.2em] text-cream/50 uppercase mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputClass}
          placeholder="you@business.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-headline text-xs tracking-[0.2em] text-cream/50 uppercase mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass + " resize-none"}
          placeholder="Tell us about your shop and what you're looking for..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-cream text-charcoal font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream hover:bg-transparent hover:text-cream transition-colors duration-300 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>

      {status === "error" && (
        <p className="font-body text-sienna text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
