import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFileSync } from "fs";
import { join } from "path";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

async function addToEmailList(email: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, new Date().toISOString(), "free-sample"]],
      },
    });
  } catch (err) {
    console.error("Google Sheets error:", err);
    // Don't fail the request if Sheets fails — still send the email
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Save to Google Sheets email list
    await addToEmailList(email);

    // Read the PDF from the public directory
    const pdfPath = join(process.cwd(), "public", "downloads", "bible-reading-plan-sample.pdf");
    const pdfBuffer = readFileSync(pdfPath);

    const { error } = await resend.emails.send({
      from: "Todah Co. <onboarding@resend.dev>",
      to: email,
      bcc: "keegan@nexgenfamilyoffice.com",
      subject: "Your Free 7-Day Bible Reading Plan Sample",
      text: [
        "Thanks for your interest in the Carpe Scriptura Bible Reading Plan!",
        "",
        "Attached is your free 7-day sample.",
        "",
        "Each day features a reading from one of 6 genres: Law, History, Wisdom, Prophets, Gospels, and Epistles. The full 365-day plan covers all 66 books of the Bible.",
        "",
        "Ready for the full year? Get the wall calendar at:",
        "https://todah-co.vercel.app/products/bible-reading-calendar",
        "",
        "— Todah Co.",
        "Gift Gratitude.",
      ].join("\n"),
      attachments: [
        {
          filename: "Todah-Co-Bible-Reading-Plan-7-Day-Sample.pdf",
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sample API error:", err);
    return NextResponse.json(
      { error: "Failed to send the sample. Please try again." },
      { status: 500 }
    );
  }
}
