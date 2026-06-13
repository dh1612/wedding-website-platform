import { BRAND_DOMAIN, BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

type SendPortalResetEmailInput = {
  to: string;
  couple: string;
  resetUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendPortalResetEmail(input: SendPortalResetEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.INTAKE_CONFIRMATION_FROM_EMAIL ??
    process.env.RSVP_NOTIFICATION_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    SUPPORT_EMAIL;

  if (!apiKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const safeCouple = escapeHtml(input.couple);
  const safeResetUrl = escapeHtml(input.resetUrl);

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
        ${BRAND_NAME}
      </p>
      <h1 style="font-size: 36px; line-height: 1.08; margin: 0 0 18px;">
        Reset your couple portal password
      </h1>
      <p style="font-size: 18px; margin: 0 0 20px; color: #5f564e;">
        Here is your secure reset link for the private couple portal for ${safeCouple}.
      </p>
      <div style="margin: 0 0 22px;">
        <a href="${safeResetUrl}" style="display: inline-block; background: #184b38; color: white; text-decoration: none; padding: 14px 22px; border-radius: 999px; font-weight: 600;">
          Reset portal password
        </a>
      </div>
      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #faf7f2; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0; color: #5f564e;">
          This link expires in 1 hour. If you did not request this, you can ignore this email and your current password will stay the same.
        </p>
      </div>
      <p style="margin: 0; color: #6d655d;">
        If you no longer have access to this email address, please contact
        <a href="mailto:${SUPPORT_EMAIL}" style="color: #184b38; text-decoration: underline;"> ${SUPPORT_EMAIL}</a>
        and I&apos;ll help you reset access manually.
      </p>
      <p style="margin: 18px 0 0; font-size: 13px; color: #8a7f75;">
        If the button does not open, copy and paste this link into your browser:<br />
        <span style="word-break: break-all;">${safeResetUrl}</span>
      </p>
    </div>
  `;

  const text = [
    "Reset your couple portal password",
    "",
    `Reset link for the private couple portal for ${input.couple}:`,
    input.resetUrl,
    "",
    "This link expires in 1 hour. If you did not request this, you can ignore this email.",
    "",
    `If you no longer have access to this email address, please contact ${SUPPORT_EMAIL} and manual help can be arranged.`,
    "",
    `Sent from ${BRAND_DOMAIN}`
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [input.to],
      subject: `${BRAND_NAME}: reset your couple portal password`,
      html,
      text
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Email send failed: ${response.status} ${body}`);
  }

  return { sent: true as const };
}
