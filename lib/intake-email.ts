import { intakePackages, type IntakePackage } from "@/lib/intake";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

type SendIntakeConfirmationEmailInput = {
  to: string;
  couple: string;
  packageTier: IntakePackage;
  previewUrl: string;
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
          "Core guest information pages shaped around your details.",
          "A final refinement pass before the guest website goes live."
        ],
        nextSteps: [
          "Review the private preview and note any wording or layout changes you want.",
          "If you would like to proceed, use the unlock option on the preview page.",
          "Once approved, we refine the final guest website and prepare it for launch."
        ]
      };
    case "premium":
      return {
        supportLine:
          "This includes the fullest support level, including the private couple portal experience once your website is unlocked.",
        included: [
          "A private first-draft website preview to review.",
          "Premium planning features and access to the couple portal after unlock.",
          "A fuller refinement and setup pass before launch."
        ],
        nextSteps: [
          "Review the private preview and note any wording, layout, or planning features you want adjusted.",
          "If you would like to proceed, use the unlock option on the preview page.",
          "Once approved, we unlock the website, prepare the portal, and help shape the final version."
        ]
      };
    case "smart":
    default:
      return {
        supportLine:
          "This gives you a stronger refinement layer, including AI-assisted content polishing and a more guided final version.",
        included: [
          "A private first-draft website preview to review.",
          "Extra content-polish support before the final version is prepared.",
          "A refined guest website ready for approval before launch."
        ],
        nextSteps: [
          "Review the private preview and note any changes you want.",
          "If you would like to proceed, use the unlock option on the preview page.",
          "Once approved, we refine the wording and structure, then prepare the final guest website."
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
    process.env.RESEND_FROM_EMAIL ??
    SUPPORT_EMAIL;

  if (!apiKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const packageInfo = getPackageLabel(input.packageTier);
  const packageContent = getPackageEmailContent(input.packageTier);
  const safeCouple = escapeHtml(input.couple);
  const safePreviewUrl = escapeHtml(input.previewUrl);
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

      <div style="margin: 0 0 28px;">
        <a href="${safePreviewUrl}" style="display: inline-block; background: #184b38; color: white; text-decoration: none; padding: 14px 22px; border-radius: 999px; font-weight: 600;">
          Open your website preview
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

      <p style="margin: 0; color: #6d655d;">
        If the button above does not work, copy this link into your browser:
      </p>
      <p style="margin: 10px 0 0; word-break: break-all;">
        <a href="${safePreviewUrl}" style="color: #184b38;">${safePreviewUrl}</a>
      </p>
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
    "",
    "What happens next:",
    ...packageContent.included.map((item) => `- ${item}`),
    "",
    "Next steps:",
    ...packageContent.nextSteps.map((item, index) => `${index + 1}. ${item}`)
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
