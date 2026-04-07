import { NextResponse } from "next/server";

const GOOTEN_BASE = "https://api.print.io";
const GOOTEN_RECIPE_ID = process.env.GOOTEN_RECIPE_ID!;
const GOOTEN_BILLING_KEY = process.env.GOOTEN_BILLING_KEY!;

// Calendar size variants with Gooten SKUs
const CALENDAR_VARIANTS: Record<string, { sku: string; printPath: string }> = {
  "24x36": {
    sku: "Posters-24x36-180gsm-Matte",
    printPath: "/print/bible-reading-calendar-2026-24x36.png",
  },
  "36x48": {
    sku: "Posters-36x48-PremiumMatte",
    printPath: "/print/bible-reading-calendar-2026-36x48.png",
  },
};

// Card products — preconfigured in Gooten (images already uploaded)
const CARD_SKUS: Record<string, string> = {
  "heartland-thanks": "Greet-Fold-425x55-Finch-Single-1Pack-20260406200824167",
  "thanks-from-the-trail": "Greet-Fold-425x55-Finch-Single-1Pack-20260406201057358",
  "thank-you-at-the-bar": "Greet-Fold-425x55-Finch-Single-1Pack-20260406200326918",
};

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.CALENDAR_PRINT_BASE_URL || "https://todah-co.vercel.app";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    // Verify the Stripe session to get order details
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items&expand[]=shipping_details`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );
    const session = await stripeRes.json();

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const shipping = session.shipping_details || session.customer_details;
    if (!shipping?.address) {
      return NextResponse.json({ error: "No shipping address" }, { status: 400 });
    }

    // Build Gooten order items for calendar products only
    const gootenItems: Array<{
      Quantity: number;
      SKU: string;
      ShipType: string;
      Images: Array<{ Url: string }>;
    }> = [];

    // Check line items for all Gooten-fulfilled products
    const baseUrl = getBaseUrl();
    const lineItems = session.line_items?.data || [];
    for (const item of lineItems) {
      const name = (item.description || item.price?.product?.name || "").toLowerCase();

      // Calendar products
      if (name.includes("bible reading calendar")) {
        const size = name.includes("36x48") || name.includes("36×48") || name.includes("premium") ? "36x48" : "24x36";
        const variant = CALENDAR_VARIANTS[size];
        const imageUrl = `${baseUrl}${variant.printPath}`;

        gootenItems.push({
          Quantity: item.quantity || 1,
          SKU: variant.sku,
          ShipType: "standard",
          Images: [{ Url: imageUrl }],
        });
      }

      // Card products — match by name to preconfigured Gooten SKUs
      // Determine pack size from name
      const isFivePack = name.includes("set of 5");
      const cardQty = isFivePack ? 5 * (item.quantity || 1) : (item.quantity || 1);

      if (name.includes("heartland") && !name.includes("variety") && !name.includes("bible")) {
        gootenItems.push({
          Quantity: cardQty,
          SKU: CARD_SKUS["heartland-thanks"],
          ShipType: "standard",
          Images: [],
        });
      } else if (name.includes("trail")) {
        gootenItems.push({
          Quantity: cardQty,
          SKU: CARD_SKUS["thanks-from-the-trail"],
          ShipType: "standard",
          Images: [],
        });
      } else if (name.includes("bar")) {
        gootenItems.push({
          Quantity: cardQty,
          SKU: CARD_SKUS["thank-you-at-the-bar"],
          ShipType: "standard",
          Images: [],
        });
      }

      // Variety Box — 8 cards (3 heartland, 3 trail, 2 bar)
      if (name.includes("variety box")) {
        const qty = item.quantity || 1;
        gootenItems.push(
          { Quantity: 3 * qty, SKU: CARD_SKUS["heartland-thanks"], ShipType: "standard", Images: [] },
          { Quantity: 3 * qty, SKU: CARD_SKUS["thanks-from-the-trail"], ShipType: "standard", Images: [] },
          { Quantity: 2 * qty, SKU: CARD_SKUS["thank-you-at-the-bar"], ShipType: "standard", Images: [] },
        );
      }
    }

    if (gootenItems.length === 0) {
      return NextResponse.json({ message: "No POD items to fulfill" });
    }

    const addr = shipping.address;
    const nameParts = (shipping.name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const gootenOrder = {
      ShipToAddress: {
        FirstName: firstName,
        LastName: lastName,
        Line1: addr.line1 || "",
        Line2: addr.line2 || "",
        City: addr.city || "",
        State: addr.state || "",
        CountryCode: addr.country || "US",
        PostalCode: addr.postal_code || "",
        IsBusinessAddress: false,
        Phone: session.customer_details?.phone || "",
        Email: session.customer_details?.email || "",
      },
      BillingAddress: {
        FirstName: firstName,
        LastName: lastName,
        Line1: addr.line1 || "",
        Line2: addr.line2 || "",
        City: addr.city || "",
        State: addr.state || "",
        CountryCode: addr.country || "US",
        PostalCode: addr.postal_code || "",
        IsBusinessAddress: false,
        Phone: session.customer_details?.phone || "",
        Email: session.customer_details?.email || "",
      },
      Items: gootenItems,
      Payment: {
        PartnerBillingKey: GOOTEN_BILLING_KEY,
      },
      IsInTestMode: process.env.NODE_ENV !== "production",
      Meta: {
        stripeSessionId: sessionId,
      },
    };

    const gootenRes = await fetch(
      `${GOOTEN_BASE}/api/v/5/source/api/orders/?recipeid=${GOOTEN_RECIPE_ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gootenOrder),
      }
    );

    const gootenResult = await gootenRes.json();

    if (!gootenRes.ok) {
      console.error("Gooten order error:", gootenResult);
      return NextResponse.json(
        { error: "Failed to submit print order", details: gootenResult },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Order submitted to Gooten",
      orderId: gootenResult.Id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Fulfillment error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
