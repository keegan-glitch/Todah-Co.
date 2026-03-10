import { NextResponse } from "next/server";
import Stripe from "stripe";

// STRIPE_SECRET_KEY is set in .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  timeout: 10000,
  maxNetworkRetries: 3,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // Derive base URL from the incoming request
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const line_items = items.map(
      (item: {
        id: string;
        name: string;
        price: number;
        quantity: number;
      }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelled`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
