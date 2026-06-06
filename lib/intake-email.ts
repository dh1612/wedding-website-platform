import { intakePackages, type IntakePackage } from "@/lib/intake";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";
import { getPackageDisplayPrice } from "@/lib/payment";

type SendIntakeConfirmationEmailInput = {
  to: string;
  couple: string;
  packageTier: IntakePackage;
  previewUrl: string;
  unlockUrl: string;
  styleName: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getPackageLabel(packageTier: IntakePackage) {
  return (
    intakePackages.find((pkg) => pkg.id === packageTier) ?? {
      id: packageTier,
      name: packageTier,
      price: "",
      summary: ""
    }
  );
}

function getPackageEmailContent(packageTier: IntakePackage) {
  switch (packageTier) {
    case "basic":
      return {
        supportLine:
          "This is the cleanest starting point if you want a beautiful guest website without the extra planning tools.",
        included: [
          "A private first-draft website preview to review.",
          "A beautifully simple guest website shaped around your details.",
          "A final refinement pass after booking, before the guest website goes live."
        ],
        nextSteps: [
          "Review the private preview and decide if you would like to move forward with this direction.",
          "If you would like to proceed, use the payment link below to confirm your booking for the Basic package.",
          "Once payment is in place, the refinement stage begins and the final guest website is prepared for launch."
        ]
      };
    case "premium":
      return {
        supportLine:
          "This includes the fullest support level, including digital invites, the private couple portal, and more dedicated hands-on support once your booking is confirmed.",
        included: [
          "A private first-draft website preview to review.",
          "Digital invite generation and access to the private couple portal after unlock.",
          "A fuller refinement and setup pass once the package has been booked."
        ],
        nextSteps: [
          "Review the private preview and note any initial reactions you have to the direction.",
          "If you would like to proceed, use the payment link below to confirm your Premium booking.",
          "Once payment is in place, the refinement stage begins and we shape the final website, invites, and portal with you."
        ]
      };
    case "smart":
    default:
      return {
        supportLine:
          "This gives you a stronger refinement layer, with website RSVP, guest tracking, and a more guided final version.",
        included: [
          "A private first-draft website preview to review.",
          "Website RSVP with guest tracking and a guided walkthrough call.",
          "A refined guest website prepared after booking and before launch."
        ],
        nextSteps: [
          "Review the private preview and decide if you would like to move forward with this direction.",
          "If you would like to proceed, use the payment link below to confirm your Smart booking.",
          "Once payment is in place, the refinement stage begins and we prepare the final guest website with you."
        ]
      };
  }
}

export async function sendIntakeConfirmationEmail(
  input: SendIntakeConfirmationEmailInput
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.INTAKE_CONFIRMATION_FROM_EMAIL ??
    process.env.RSVP_NOTIFICATION_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    SUPPORT_EMAIL;

  if (!apiKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const packageInfo = getPackageLabel(input.packageTier);
  const packageContent = getPackageEmailContent(input.packageTier);
  const packagePrice = getPackageDisplayPrice(input.packageTier);
  const safeCouple = escapeHtml(input.couple);
  const safePreviewUrl = escapeHtml(input.previewUrl);
  const safeUnlockUrl = escapeHtml(input.unlockUrl);
  const safeStyleName = escapeHtml(input.styleName);

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
        ${BRAND_NAME}
      </p>
      <h1 style="font-size: 40px; line-height: 1.05; margin: 0 0 18px;">
        Your preview is ready
      </h1>
      <p style="font-size: 18px; margin: 0 0 20px; color: #5f564e;">
        Hi ${safeCouple}, your first website preview has been created and is ready to review.
      </p>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #faf7f2; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          Your selection
        </p>
        <p style="margin: 0; font-size: 24px;">
          ${escapeHtml(packageInfo.name)} package
        </p>
        ${packagePrice ? `<p style="margin: 10px 0 0; font-size: 18px; color: #184b38; font-weight: 600;">${escapeHtml(packagePrice)}</p>` : ""}
        <p style="margin: 10px 0 0; color: #6d655d;">
          ${escapeHtml(packageInfo.summary)}
        </p>
        <p style="margin: 10px 0 0; color: #6d655d;">
          Chosen style: ${safeStyleName}
        </p>
        <p style="margin: 10px 0 0; color: #6d655d;">
          ${escapeHtml(packageContent.supportLine)}
        </p>
      </div>

      <div style="margin: 0 0 18px;">
        <a href="${safePreviewUrl}" style="display: inline-block; background: #184b38; color: white; text-decoration: none; padding: 14px 22px; border-radius: 999px; font-weight: 600;">
          Open your website preview
        </a>
      </div>

      <div style="margin: 0 0 28px;">
        <a href="${safeUnlockUrl}" style="display: inline-block; background: white; color: #184b38; text-decoration: none; padding: 14px 22px; border-radius: 999px; border: 1px solid #184b38; font-weight: 600;">
          Continue with ${escapeHtml(packageInfo.name)} booking
        </a>
      </div>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: white; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          What happens next
        </p>
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #5f564e;">
          ${packageContent.included
            .map((item) => `<li style="margin: 0 0 8px;">${escapeHtml(item)}</li>`)
            .join("")}
        </ul>
        <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          Next steps
        </p>
        <ol style="margin: 0; padding-left: 20px; color: #5f564e;">
          ${packageContent.nextSteps
            .map((item) => `<li style="margin: 0 0 8px;">${escapeHtml(item)}</li>`)
            .join("")}
        </ol>
      </div>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #faf7f2; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          Important to know
        </p>
        <p style="margin: 0; color: #5f564e;">
          This preview is the free first draft. The hands-on refinement stage begins once you confirm payment for the package you selected.
        </p>
      </div>

      <p style="margin: 0; color: #6d655d;">
        If the buttons above do not work, copy these links into your browser:
      </p>
      <p style="margin: 10px 0 0; word-break: break-all;"><a href="${safePreviewUrl}" style="color: #184b38;">Preview: ${safePreviewUrl}</a></p>
      <p style="margin: 10px 0 0; word-break: break-all;"><a href="${safeUnlockUrl}" style="color: #184b38;">Booking and payment: ${safeUnlockUrl}</a></p>
    </div>
  `;

  const text = [
    "Your preview is ready",
    "",
    `Hi ${input.couple}, your first website preview has been created and is ready to review.`,
    "",
    `Package: ${packageInfo.name}`,
    `Chosen style: ${input.styleName}`,
    packageContent.supportLine,
    `Preview link: ${input.previewUrl}`,
    `Booking and payment: ${input.unlockUrl}`,
    "",
    "What happens next:",
    ...packageContent.included.map((item) => `- ${item}`),
    "",
    "Next steps:",
    ...packageContent.nextSteps.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Important to know:",
    "The preview is the free first draft. Hands-on refinement begins once you confirm payment for the package you selected."
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
      subject: `Your ${BRAND_NAME} preview is ready`,
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
