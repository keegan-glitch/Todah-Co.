import { NextResponse } from "next/server";

const GOOTEN_BASE = "https://api.print.io";
const GOOTEN_RECIPE_ID = process.env.GOOTEN_RECIPE_ID!;
const GOOTEN_BILLING_KEY = process.env.GOOTEN_BILLING_KEY!;

// Map product IDs to Gooten SKUs and print file URLs
const GOOTEN_PRODUCTS: Record<string, { sku: string; imageUrl: string }> = {
  "bible-reading-calendar-2026": {
    sku: "Posters-36x48-PremiumMatte",
    // This must be a publicly accessible URL to the print-ready file
    // Update this once you upload the hi-res file to a CDN or your Vercel public folder
    imageUrl: "", // Will be set from CALENDAR_PRINT_URL env var
  },
};

function getImageUrl(productId: string): string {
  if (productId === "bible-reading-calendar-2026") {
    return process.env.CALENDAR_PRINT_URL || GOOTEN_PRODUCTS[productId].imageUrl;
  }
  return GOOTEN_PRODUCTS[productId]?.imageUrl || "";
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

    // Check line items for calendar
    const lineItems = session.line_items?.data || [];
    for (const item of lineItems) {
      const name = item.description || item.price?.product?.name || "";
      // Match calendar product by name
      if (name.toLowerCase().includes("bible reading calendar")) {
        const imageUrl = getImageUrl("bible-reading-calendar-2026");
        if (!imageUrl) {
          console.error("No print URL configured for calendar");
          continue;
        }
        gootenItems.push({
          Quantity: item.quantity || 1,
          SKU: "Posters-36x48-PremiumMatte",
          ShipType: "standard",
          Images: [{ Url: imageUrl }],
        });
      }
    }

    if (gootenItems.length === 0) {
      // No Gooten-fulfilled items in this order (e.g., cards only)
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
