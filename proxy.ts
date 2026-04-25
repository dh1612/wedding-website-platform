import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPortalSessionToken, getPortalCookieName } from "@/lib/portal-auth";

const protectedPrefixes = [
  "/couple-portal",
  "/rsvp-dashboard",
  "/plan-your-tables",
  "/production",
  "/admin",
  "/api/portal"
];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(getPortalCookieName())?.value;
  const expected = await createPortalSessionToken();

  if (cookie === expected) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/portal-login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};
