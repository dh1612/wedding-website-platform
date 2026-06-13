import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { BRAND_DOMAIN, SUPPORT_EMAIL } from "@/lib/brand";
import { getAdminWeddingWorkspacePath } from "@/lib/admin-path";
import {
  sendCustomerPaymentConfirmationEmail,
  sendOperatorPaymentNotificationEmail
} from "@/lib/payment-confirmation-email";
import { getPackageTierByAmountCents, type PaymentStatus } from "@/lib/payment";
import {
  findWeddingForCompletedPayment,
  getWeddingSiteBySlug,
  updateWeddingAccessState
} from "@/lib/production-repositories";
import { coerceWeddingData } from "@/lib/wedding-data";

const STRIPE_TOLERANCE_SECONDS = 5 * 60;

type StripeWebhookEvent = {
  id?: string;
  type?: string;
  data?: {
    object?: {
      id?: string;
      customer_details?: {
        email?: string | null;
      };
      customer_email?: string | null;
      amount_total?: number | null;
      currency?: string | null;
      payment_status?: string | null;
      status?: string | null;
    };
  };
};

function verifyStripeSignature(input: {
  payload: string;
  header: string;
  secret: string;
}) {
  const parts = input.header.split(",");
  const timestampPart = parts.find((part) => part.startsWith("t="));
  const signaturePart = parts.find((part) => part.startsWith("v1="));

  if (!timestampPart || !signaturePart) {
    return false;
  }

  const timestamp = Number(timestampPart.replace(/^t=/, ""));
  const signature = signaturePart.replace(/^v1=/, "");

  if (!Number.isFinite(timestamp)) {
    return false;
  }

  const ageSeconds = Math.abs(Date.now() / 1000 - timestamp);

  if (ageSeconds > STRIPE_TOLERANCE_SECONDS) {
    return false;
  }

  const signedPayload = `${timestamp}.${input.payload}`;
  const expected = createHmac("sha256", input.secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  const receivedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();

  if (!verifyStripeSignature({ payload, header: signature, secret: webhookSecret })) {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  let event: StripeWebhookEvent;

  try {
    event = JSON.parse(payload) as StripeWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data?.object;
  const email =
    session?.customer_details?.email?.trim().toLowerCase() ||
    session?.customer_email?.trim().toLowerCase() ||
    "";
  const packageTier = getPackageTierByAmountCents(session?.amount_total ?? null);

  if (!email || !packageTier) {
    return NextResponse.json({ received: true });
  }

  if (session?.payment_status && session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const matchedWedding = await findWeddingForCompletedPayment({
    email,
    packageTier
  });

  if (!matchedWedding) {
    return NextResponse.json({ received: true });
  }

  const plannerSettings = (matchedWedding.plannerSettingsJson ?? {}) as {
    paymentStatus?: PaymentStatus;
  };

  if (plannerSettings.paymentStatus === "paid") {
    return NextResponse.json({ received: true });
  }

  await updateWeddingAccessState({
    slug: matchedWedding.slug,
    paymentStatus: "paid",
    paymentCompletedAt: new Date().toISOString()
  });

  const weddingRecord = await getWeddingSiteBySlug(matchedWedding.slug);

  if (!weddingRecord?.contentJson) {
    return NextResponse.json({ received: true });
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const previewUrl = `https://${BRAND_DOMAIN}/preview/${matchedWedding.slug}`;
  const adminUrl = `https://${BRAND_DOMAIN}${getAdminWeddingWorkspacePath(matchedWedding.slug)}`;
  const operatorNotificationEmail =
    process.env.PAYMENT_NOTIFICATION_EMAIL?.trim() || SUPPORT_EMAIL;

  await Promise.all([
    sendCustomerPaymentConfirmationEmail({
      to: email,
      couple: weddingData.couple,
      packageTier,
      previewUrl
    }),
    sendOperatorPaymentNotificationEmail({
      to: operatorNotificationEmail,
      couple: weddingData.couple,
      packageTier,
      customerEmail: email,
      previewUrl,
      adminUrl
    })
  ]);

  return NextResponse.json({ received: true });
}
