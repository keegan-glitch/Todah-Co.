import { NextResponse } from "next/server";
import { Resend } from "resend";

// RESEND_API_KEY and RESEND_TO_EMAIL are set in .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, business, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: "Todah Co. Wholesale <onboarding@resend.dev>",
    to: process.env.RESEND_TO_EMAIL!,
    subject: `Wholesale Inquiry from ${business || name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Business: ${business || "N/A"}`,
      `Email: ${email}`,
      "",
      `Message:`,
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
