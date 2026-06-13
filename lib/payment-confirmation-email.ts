import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";
import { getPackageDisplayName, getPackageDisplayPrice } from "@/lib/payment";
import type { IntakePackage } from "@/lib/intake";

type SendCustomerPaymentConfirmationInput = {
  to: string;
  couple: string;
  packageTier: IntakePackage;
  previewUrl: string;
};

type SendOperatorPaymentNotificationInput = {
  to: string;
  couple: string;
  packageTier: IntakePackage;
  customerEmail: string;
  previewUrl: string;
  adminUrl?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getResendFromEmail() {
  return (
    process.env.INTAKE_CONFIRMATION_FROM_EMAIL ??
    process.env.RSVP_NOTIFICATION_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    SUPPORT_EMAIL
  );
}

async function sendResendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: getResendFromEmail(),
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {})
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Email send failed: ${response.status} ${body}`);
  }

  return { sent: true as const };
}

export async function sendCustomerPaymentConfirmationEmail(
  input: SendCustomerPaymentConfirmationInput
) {
  const packageName = getPackageDisplayName(input.packageTier);
  const packagePrice = getPackageDisplayPrice(input.packageTier);
  const safeCouple = escapeHtml(input.couple);
  const safePreviewUrl = escapeHtml(input.previewUrl);

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
        ${BRAND_NAME}
      </p>
      <h1 style="font-size: 40px; line-height: 1.05; margin: 0 0 18px;">
        Payment received
      </h1>
      <p style="font-size: 18px; margin: 0 0 20px; color: #5f564e;">
        Thank you ${safeCouple}, your payment has been received for the ${escapeHtml(packageName)} package${packagePrice ? ` (${escapeHtml(packagePrice)})` : ""}.
      </p>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #faf7f2; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          What happens next
        </p>
        <ul style="margin: 0; padding-left: 20px; color: #5f564e;">
          <li style="margin: 0 0 8px;">I&apos;ll contact you within 24 to 48 working hours to arrange the next steps.</li>
          <li style="margin: 0 0 8px;">We&apos;ll review your draft together and shape the final content and style before anything is published to guests.</li>
          <li style="margin: 0;">Your preview stays private while refinement is underway.</li>
        </ul>
      </div>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: white; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          Helpful in the meantime
        </p>
        <p style="margin: 0 0 10px; color: #5f564e;">
          If you would like, you can start gathering:
        </p>
        <ul style="margin: 0; padding-left: 20px; color: #5f564e;">
          <li style="margin: 0 0 8px;">Favourite photos you may want included</li>
          <li style="margin: 0 0 8px;">Story wording or rough notes about how you met</li>
          <li style="margin: 0 0 8px;">Venue, travel, stay, and FAQ details for guests</li>
          <li style="margin: 0;">Any supplier names or RSVP preferences you already know</li>
        </ul>
      </div>

      <p style="margin: 0 0 16px; color: #6d655d;">
        You can still revisit your private draft here:
      </p>
      <div style="margin: 0 0 20px;">
        <a href="${safePreviewUrl}" style="display: inline-block; background: #184b38; color: white; text-decoration: none; padding: 14px 22px; border-radius: 999px; font-weight: 600;">
          Open private preview
        </a>
      </div>

      <p style="margin: 0; color: #6d655d;">
        If you need anything before I reach out, just reply to this email.
      </p>
    </div>
  `;

  const text = [
    "Payment received",
    "",
    `Thank you ${input.couple}, your payment has been received for the ${packageName}${packagePrice ? ` (${packagePrice})` : ""}.`,
    "",
    "What happens next:",
    "- I'll contact you within 24 to 48 working hours to arrange the next steps.",
    "- We'll review your draft together and shape the final content and style before anything is published to guests.",
    "- Your preview stays private while refinement is underway.",
    "",
    "Helpful in the meantime:",
    "- Favourite photos you may want included",
    "- Story wording or rough notes about how you met",
    "- Venue, travel, stay, and FAQ details for guests",
    "- Any supplier names or RSVP preferences you already know",
    "",
    `Private preview: ${input.previewUrl}`,
    "",
    "If you need anything before I reach out, just reply to this email."
  ].join("\n");

  return sendResendEmail({
    to: input.to,
    subject: `${BRAND_NAME}: payment received`,
    html,
    text,
    replyTo: SUPPORT_EMAIL
  });
}

export async function sendOperatorPaymentNotificationEmail(
  input: SendOperatorPaymentNotificationInput
) {
  const packageName = getPackageDisplayName(input.packageTier);
  const packagePrice = getPackageDisplayPrice(input.packageTier);
  const safeCouple = escapeHtml(input.couple);
  const safeCustomerEmail = escapeHtml(input.customerEmail);
  const safePreviewUrl = escapeHtml(input.previewUrl);
  const safeAdminUrl = escapeHtml(input.adminUrl ?? "");

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
        ${BRAND_NAME}
      </p>
      <h1 style="font-size: 34px; line-height: 1.08; margin: 0 0 18px;">
        New payment received
      </h1>
      <p style="margin: 0 0 16px; color: #5f564e;">
        ${safeCouple} has paid for the ${escapeHtml(packageName)} package${packagePrice ? ` (${escapeHtml(packagePrice)})` : ""}.
      </p>
      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #faf7f2; padding: 20px; margin: 0 0 20px;">
        <p style="margin: 0 0 10px;"><strong>Customer email:</strong> ${safeCustomerEmail}</p>
        <p style="margin: 0 0 10px;"><strong>Preview:</strong> <a href="${safePreviewUrl}" style="color: #184b38;">${safePreviewUrl}</a></p>
        ${input.adminUrl ? `<p style="margin: 0;"><strong>Admin:</strong> <a href="${safeAdminUrl}" style="color: #184b38;">${safeAdminUrl}</a></p>` : ""}
      </div>
      <p style="margin: 0; color: #6d655d;">
        Follow up within 24 to 48 working hours to arrange the next steps and begin refinement.
      </p>
    </div>
  `;

  const text = [
    "New payment received",
    "",
    `${input.couple} has paid for the ${packageName}${packagePrice ? ` (${packagePrice})` : ""}.`,
    `Customer email: ${input.customerEmail}`,
    `Preview: ${input.previewUrl}`,
    ...(input.adminUrl ? [`Admin: ${input.adminUrl}`] : []),
    "",
    "Follow up within 24 to 48 working hours to arrange the next steps and begin refinement."
  ].join("\n");

  return sendResendEmail({
    to: input.to,
    subject: `${BRAND_NAME}: new payment received`,
    html,
    text,
    replyTo: input.customerEmail
  });
}
