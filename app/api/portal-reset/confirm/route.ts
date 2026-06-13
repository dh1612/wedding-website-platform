import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/passwords";
import { getRequiredPortalScope, sanitisePortalNextPath } from "@/lib/portal-auth";
import { hashPortalResetToken } from "@/lib/portal-reset";
import {
  getWeddingPortalUserByResetTokenHash,
  resetWeddingPortalPassword
} from "@/lib/production-repositories";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      token?: string;
      next?: string;
      password?: string;
    };

    const token = payload.token?.trim() ?? "";
    const password = payload.password?.trim() ?? "";
    const next = sanitisePortalNextPath(payload.next);
    const requiredScope = getRequiredPortalScope(next);

    if (!requiredScope?.startsWith("wedding:")) {
      return NextResponse.json({ error: "This reset link is not valid." }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ error: "This reset link is missing its token." }, { status: 400 });
    }

    if (password.length < 10) {
      return NextResponse.json(
        { error: "Please choose a password with at least 10 characters." },
        { status: 400 }
      );
    }

    const tokenHash = hashPortalResetToken(token);
    const portalUser = await getWeddingPortalUserByResetTokenHash(tokenHash);

    if (!portalUser) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const expectedSlug = requiredScope.replace(/^wedding:/, "");

    if (portalUser.wedding.slug !== expectedSlug) {
      return NextResponse.json(
        { error: "This reset link does not match the requested couple portal." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    await resetWeddingPortalPassword({
      userId: portalUser.id,
      passwordHash
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong resetting the password." },
      { status: 500 }
    );
  }
}
