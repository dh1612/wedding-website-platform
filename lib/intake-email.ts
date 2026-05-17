import { intakePackages, type IntakePackage } from "@/lib/intake";

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

export async function sendIntakeConfirmationEmail(
  input: SendIntakeConfirmationEmailInput
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.INTAKE_CONFIRMATION_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    "hello@knotlesswed.ie";

  if (!apiKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const packageInfo = getPackageLabel(input.packageTier);
  const safeCouple = escapeHtml(input.couple);
  const safePreviewUrl = escapeHtml(input.previewUrl);
  const safeStyleName = escapeHtml(input.styleName);

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 640px; margin: 0 auto; padding: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
        Knotless Wed
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
      </div>

      <div style="margin: 0 0 28px;">
        <a href="${safePreviewUrl}" style="display: inline-block; background: #184b38; color: white; text-decoration: none; padding: 14px 22px; border-radius: 999px; font-weight: 600;">
          Open your website preview
        </a>
      </div>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: white; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #9a7d64;">
          Next steps
        </p>
        <ol style="margin: 0; padding-left: 20px; color: #5f564e;">
          <li>Review the private preview and note any changes you want.</li>
          <li>If you want to move forward, use the unlock option on the preview page.</li>
          <li>The final guest website is unlocked and published after approval and payment.</li>
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
    `Preview link: ${input.previewUrl}`,
    "",
    "Next steps:",
    "1. Review the private preview and note any changes you want.",
    "2. If you want to move forward, use the unlock option on the preview page.",
    "3. The final guest website is unlocked and published after approval and payment."
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
      subject: "Your Knotless Wed preview is ready",
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
