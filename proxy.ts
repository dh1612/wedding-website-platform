import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { normaliseAdminInternalPath } from "@/lib/admin-path";
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
  const internalAdminPath = normaliseAdminInternalPath(pathname);

  if ((pathname === "/admin" || pathname.startsWith("/admin/")) && !internalAdminPath) {
    return NextResponse.rewrite(new URL("/_not-found", request.url));
  }

  if (pathname === "/production" || pathname.startsWith("/production/")) {
    return NextResponse.rewrite(new URL("/_not-found", request.url));
  }

  const protectedPathname = internalAdminPath ?? pathname;
  const requiredScope = getRequiredPortalScope(protectedPathname);
  const isProtected = isProtectedPath(protectedPathname);

  if (!isProtected) {
    if (internalAdminPath) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = internalAdminPath;
      return NextResponse.rewrite(rewriteUrl);
    }

    return NextResponse.next();
  }

  const cookie = request.cookies.get(getPortalCookieName())?.value;
  const sessionScope = await readPortalSessionScope(cookie);

  if (isPortalScopeAllowed(sessionScope, requiredScope)) {
    if (internalAdminPath) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = internalAdminPath;
      return NextResponse.rewrite(rewriteUrl);
    }

    return NextResponse.next();
  }

  const loginUrl = new URL("/portal-login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};
