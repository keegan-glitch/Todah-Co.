import { NextResponse } from "next/server";
import Stripe from "stripe";

// STRIPE_SECRET_KEY is set in .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items } = await req.json();

  const line_items = items.map(
    (item: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cancelled`,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
  });

  return NextResponse.json({ url: session.url });
}
