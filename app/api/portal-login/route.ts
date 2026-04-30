import { NextResponse } from "next/server";
import {
  createPortalSessionToken,
  getDefaultCouplePortalPassword,
  getPortalCookieName,
  getOperatorPortalPassword,
  getRequiredPortalScope,
  sanitisePortalNextPath
} from "@/lib/portal-auth";
import { verifyPassword } from "@/lib/passwords";
import {
  getWeddingPortalUserBySlug,
  getWeddingRecordForAdmin
} from "@/lib/production-repositories";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    next?: string;
  };

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password?.trim() ?? "";
  const nextPath = sanitisePortalNextPath(body.next);
  const requiredScope = getRequiredPortalScope(nextPath);
  let grantedScope = requiredScope ?? "admin";

  if (password === getOperatorPortalPassword()) {
    grantedScope = "admin";
  } else if (requiredScope?.startsWith("wedding:")) {
    const slug = requiredScope.replace(/^wedding:/, "");
    const [{ weddingId, user }, wedding] = await Promise.all([
      getWeddingPortalUserBySlug(slug),
      getWeddingRecordForAdmin(slug)
    ]);
    const plannerSettings = (wedding?.plannerSettingsJson ?? {}) as {
      portalPassword?: string;
    };

    if (weddingId && user) {
      const passwordMatches =
        email === user.email.toLowerCase() &&
        (await verifyPassword(password, user.passwordHash));

      if (!passwordMatches) {
        return NextResponse.json(
          { error: "That email or password is not correct." },
          { status: 401 }
        );
      }
    } else {
      const weddingPassword =
        plannerSettings.portalPassword?.trim() || getDefaultCouplePortalPassword();

      if (password !== weddingPassword) {
        return NextResponse.json(
          { error: "That password is not correct." },
          { status: 401 }
        );
      }
    }

    if (!wedding?.id) {
      return NextResponse.json(
        { error: "Wedding not found." },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "That password is not correct." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    ok: true,
    next: nextPath
  });

  response.cookies.set({
    name: getPortalCookieName(),
    value: await createPortalSessionToken(grantedScope),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
