import { NextResponse } from "next/server";
import { BRAND_DOMAIN } from "@/lib/brand";
import { sendPortalResetEmail } from "@/lib/portal-reset-email";
import {
  createPortalResetToken,
  getPortalResetExpiryDate,
  hashPortalResetToken
} from "@/lib/portal-reset";
import { getRequiredPortalScope, sanitisePortalNextPath } from "@/lib/portal-auth";
import {
  getWeddingPortalUserByEmailAndSlug,
  storeWeddingPortalResetToken
} from "@/lib/production-repositories";
import { coerceWeddingData } from "@/lib/wedding-data";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const GENERIC_SUCCESS_MESSAGE =
  "If that email address is linked to this couple portal, reset instructions have been sent.";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: string;
      next?: string;
      theme?: string;
    };

    const email = payload.email?.trim().toLowerCase() ?? "";
    const next = sanitisePortalNextPath(payload.next);
    const requiredScope = getRequiredPortalScope(next);

    if (!requiredScope?.startsWith("wedding:")) {
      return NextResponse.json({ error: "This reset link is not available here." }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const slug = requiredScope.replace(/^wedding:/, "");
    const portalUser = await getWeddingPortalUserByEmailAndSlug({ slug, email });

    if (!portalUser.user || !portalUser.weddingId) {
      return NextResponse.json({ ok: true, message: GENERIC_SUCCESS_MESSAGE });
    }

    const token = createPortalResetToken();
    const tokenHash = hashPortalResetToken(token);
    const expiresAt = getPortalResetExpiryDate();

    await storeWeddingPortalResetToken({
      userId: portalUser.user.id,
      tokenHash,
      expiresAt
    });

    const weddingData = coerceWeddingData(portalUser.contentJson);
    const themeQuery = payload.theme?.trim()
      ? `&theme=${encodeURIComponent(payload.theme.trim())}`
      : "";
    const resetUrl = `https://${BRAND_DOMAIN}/portal-reset?token=${encodeURIComponent(token)}&next=${encodeURIComponent(next)}${themeQuery}`;

    await sendPortalResetEmail({
      to: email,
      couple: weddingData.couple || portalUser.title || "your wedding",
      resetUrl
    });

    return NextResponse.json({ ok: true, message: GENERIC_SUCCESS_MESSAGE });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending the reset email." },
      { status: 500 }
    );
  }
}
