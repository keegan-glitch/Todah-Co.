import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("success_url", `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${baseUrl}/cancelled`);
    params.append("shipping_address_collection[allowed_countries][0]", "US");

    items.forEach(
      (
        item: { name: string; price: number; quantity: number },
        i: number
      ) => {
        params.append(`line_items[${i}][price_data][currency]`, "usd");
        params.append(`line_items[${i}][price_data][product_data][name]`, item.name);
        params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(item.price * 100)));
        params.append(`line_items[${i}][quantity]`, String(item.quantity));
      }
    );

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe error:", session);
      return NextResponse.json({ error: session.error?.message || "Stripe error" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
