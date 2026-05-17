import { BRAND_DOMAIN, BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

type SendRsvpNotificationEmailInput = {
  to: string;
  weddingSlug: string;
  couple: string;
  guestName: string;
  guestEmail: string;
  status: "pending" | "attending" | "declined";
  attendingCount: number;
  meal?: string;
  dietary?: string;
  songRequest?: string;
  messageToCouple?: string;
  customAnswers?: Record<string, string>;
  customQuestionLabels?: Record<string, string>;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatStatus(status: SendRsvpNotificationEmailInput["status"]) {
  switch (status) {
    case "attending":
      return "Attending";
    case "declined":
      return "Declined";
    default:
      return "Pending";
  }
}

function formatLabel(key: string) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildDetailsRows(input: SendRsvpNotificationEmailInput) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Guest", value: input.guestName },
    { label: "Email", value: input.guestEmail },
    { label: "Status", value: formatStatus(input.status) },
    { label: "Attending Count", value: String(input.attendingCount) }
  ];

  if (input.meal) {
    rows.push({ label: "Meal Choice", value: input.meal });
  }
  if (input.dietary) {
    rows.push({ label: "Dietary", value: input.dietary });
  }
  if (input.songRequest) {
    rows.push({ label: "Song Request", value: input.songRequest });
  }
  if (input.messageToCouple) {
    rows.push({ label: "Message", value: input.messageToCouple });
  }

  for (const [key, value] of Object.entries(input.customAnswers ?? {})) {
    if (!value) continue;
    rows.push({
      label: input.customQuestionLabels?.[key] ?? formatLabel(key),
      value
    });
  }

  return rows;
}

export async function sendRsvpNotificationEmail(
  input: SendRsvpNotificationEmailInput
) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RSVP_NOTIFICATION_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    process.env.INTAKE_CONFIRMATION_FROM_EMAIL ??
    SUPPORT_EMAIL;

  if (!apiKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const rows = buildDetailsRows(input);
  const previewUrl = `https://${BRAND_DOMAIN}/preview/${input.weddingSlug}`;
  const safePreviewUrl = escapeHtml(previewUrl);

  const htmlRows = rows
    .map(
      (row) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #ece4da; width: 34%; color: #8c7561; font-size: 14px; vertical-align: top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #ece4da; color: #2f2924; font-size: 15px;">
            ${escapeHtml(row.value)}
          </td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #2f2924; line-height: 1.6; max-width: 680px; margin: 0 auto; padding: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.32em; text-transform: uppercase; color: #9a7d64; margin: 0 0 16px;">
        ${escapeHtml(BRAND_NAME)}
      </p>
      <h1 style="font-size: 36px; line-height: 1.1; margin: 0 0 14px;">
        New RSVP received for ${escapeHtml(input.couple)}
      </h1>
      <p style="font-size: 18px; margin: 0 0 24px; color: #5f564e;">
        ${escapeHtml(input.guestName)} has submitted an RSVP. The details are included below so you have a clear email record as well as the dashboard entry.
      </p>

      <div style="border: 1px solid #e2d6c8; border-radius: 20px; background: #fffdfa; padding: 8px 0; margin: 0 0 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${htmlRows}
        </table>
      </div>

      <p style="margin: 0 0 8px; color: #6d655d;">Open the wedding preview / planning area here:</p>
      <p style="margin: 0; word-break: break-all;">
        <a href="${safePreviewUrl}" style="color: #184b38;">${safePreviewUrl}</a>
      </p>
    </div>
  `;

  const text = [
    `New RSVP received for ${input.couple}`,
    "",
    `${input.guestName} has submitted an RSVP.`,
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    `Preview link: ${previewUrl}`
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
      subject: `New RSVP for ${input.couple}`,
      html,
      text
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`RSVP email send failed: ${response.status} ${body}`);
  }

  return { sent: true as const };
}
