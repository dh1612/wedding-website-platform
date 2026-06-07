import { NextResponse } from "next/server";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const message = payload.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete your name, email address, and message." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.INTAKE_CONFIRMATION_FROM_EMAIL ??
      process.env.RSVP_NOTIFICATION_FROM_EMAIL ??
      process.env.RESEND_FROM_EMAIL ??
      SUPPORT_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email sending is not configured yet." },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
        <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
          ${BRAND_NAME}
        </p>
        <h1 style="font-size: 32px; line-height: 1.1; margin: 0 0 18px;">
          New contact enquiry
        </h1>
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 0 0 18px;"><strong>Email:</strong> ${email}</p>
        <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #fffdfa; padding: 18px;">
          <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
            Message
          </p>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    const text = [
      "New contact enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [SUPPORT_EMAIL],
        subject: `New enquiry from ${name}`,
        html,
        text,
        reply_to: email
      })
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return NextResponse.json(
        { error: `Email send failed: ${response.status} ${body}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
