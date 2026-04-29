import { NextResponse } from "next/server";
import {
  createPortalSessionToken,
  getDefaultCouplePortalPassword,
  getPortalCookieName,
  getOperatorPortalPassword,
  getRequiredPortalScope
} from "@/lib/portal-auth";
import { getWeddingRecordForAdmin } from "@/lib/production-repositories";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    password?: string;
    next?: string;
  };

  const password = body.password?.trim() ?? "";
  const nextPath = body.next || "/couple-portal";
  const requiredScope = getRequiredPortalScope(nextPath);
  let grantedScope = requiredScope ?? "admin";

  if (password === getOperatorPortalPassword()) {
    grantedScope = "admin";
  } else if (requiredScope?.startsWith("wedding:")) {
    const slug = requiredScope.replace(/^wedding:/, "");
    const wedding = await getWeddingRecordForAdmin(slug);
    const plannerSettings = (wedding?.plannerSettingsJson ?? {}) as {
      portalPassword?: string;
    };
    const weddingPassword =
      plannerSettings.portalPassword?.trim() || getDefaultCouplePortalPassword();

    if (password !== weddingPassword) {
      return NextResponse.json(
        { error: "That password is not correct." },
        { status: 401 }
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
