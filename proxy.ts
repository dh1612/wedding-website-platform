import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getPortalCookieName,
  getRequiredPortalScope,
  isPortalScopeAllowed,
  readPortalSessionScope
} from "@/lib/portal-auth";

function isProtectedPath(pathname: string) {
  if (pathname.startsWith("/api/rsvp/")) {
    return false;
  }

  return Boolean(getRequiredPortalScope(pathname));
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requiredScope = getRequiredPortalScope(pathname);
  const isProtected = isProtectedPath(pathname);

  if (!isProtected) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(getPortalCookieName())?.value;
  const sessionScope = await readPortalSessionScope(cookie);

  if (isPortalScopeAllowed(sessionScope, requiredScope)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/portal-login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};
