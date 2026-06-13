import { normaliseAdminInternalPath } from "@/lib/admin-path";

const portalCookieName = "wedding_portal_session";

export type PortalSessionScope = "admin" | `wedding:${string}`;

export function getPortalCookieName() {
  return portalCookieName;
}

export function hasConfiguredCouplePortalPassword() {
  return Boolean(process.env.COUPLE_PORTAL_PASSWORD?.trim());
}

export function getConfiguredCouplePortalPassword() {
  const password = process.env.COUPLE_PORTAL_PASSWORD?.trim();

  if (!password) {
    throw new Error("COUPLE_PORTAL_PASSWORD is not configured.");
  }

  return password;
}

export function getOperatorPortalPassword() {
  const password = process.env.ADMIN_PORTAL_PASSWORD?.trim();

  if (!password) {
    throw new Error("ADMIN_PORTAL_PASSWORD is not configured.");
  }

  return password;
}

export function hasConfiguredOperatorPortalPassword() {
  return Boolean(process.env.ADMIN_PORTAL_PASSWORD?.trim());
}

export function getPortalSecret() {
  const secret = process.env.PORTAL_SESSION_SECRET?.trim();

  if (!secret) {
    throw new Error("PORTAL_SESSION_SECRET is not configured.");
  }

  return secret;
}

export function hasConfiguredPortalSecret() {
  return Boolean(process.env.PORTAL_SESSION_SECRET?.trim());
}

export function getPortalSecurityWarnings() {
  const warnings: string[] = [];

  if (!hasConfiguredOperatorPortalPassword()) {
    warnings.push(
      "ADMIN_PORTAL_PASSWORD is not configured, so operator access cannot be opened until it is set."
    );
  }

  if (!hasConfiguredPortalSecret()) {
    warnings.push(
      "PORTAL_SESSION_SECRET is not configured, so portal sessions cannot be created until it is set."
    );
  }

  if (!hasConfiguredCouplePortalPassword()) {
    warnings.push(
      "COUPLE_PORTAL_PASSWORD is not configured, so fallback couple portal access cannot be used until it is set."
    );
  }

  return warnings;
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

export function sanitisePortalNextPath(value?: string | null) {
  const fallback = "/couple-portal";

  if (!value) {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }

  return trimmed;
}

function normalisePathname(pathname: string) {
  return pathname.split("?")[0].replace(/\/+$/, "") || "/";
}

function extractSlug(pathname: string, prefix: string) {
  const normalised = normalisePathname(pathname);
  if (!normalised.startsWith(`${prefix}/`)) {
    return null;
  }

  const remainder = normalised.slice(prefix.length + 1);
  const [slug] = remainder.split("/");
  return slug || null;
}

export function getRequiredPortalScope(pathname: string): PortalSessionScope | null {
  const adminNormalised = normaliseAdminInternalPath(pathname);
  const normalised = normalisePathname(adminNormalised ?? pathname);

  if (
    normalised === "/admin" ||
    normalised.startsWith("/admin/") ||
    normalised === "/production" ||
    normalised.startsWith("/production/") ||
    normalised === "/couple-portal" ||
    normalised.startsWith("/couple-portal/") ||
    normalised === "/rsvp-dashboard" ||
    normalised.startsWith("/rsvp-dashboard/") ||
    normalised === "/plan-your-tables" ||
    normalised.startsWith("/plan-your-tables/") ||
    normalised.startsWith("/api/portal/")
  ) {
    const weddingScopedPrefixes = [
      "/couple-portal/",
      "/rsvp-dashboard/",
      "/plan-your-tables/",
      "/api/portal/"
    ];

    for (const prefix of weddingScopedPrefixes) {
      const slug = extractSlug(normalised, prefix.replace(/\/$/, ""));
      if (slug && slug !== "calendar" && slug !== "checklist" && slug !== "guests") {
        return `wedding:${slug}`;
      }
    }

    return "admin";
  }

  return null;
}

async function signPortalScope(scope: string) {
  const message = new TextEncoder().encode(scope);
  const secret = new TextEncoder().encode(getPortalSecret());

  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, message);

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createPortalSessionToken(scope: PortalSessionScope = "admin") {
  const signature = await signPortalScope(scope);
  return `${encodeURIComponent(scope)}.${signature}`;
}

export async function readPortalSessionScope(token?: string | null) {
  if (!token) {
    return null;
  }

  const splitIndex = token.indexOf(".");

  if (splitIndex < 0) {
    return null;
  }

  const rawScope = token.slice(0, splitIndex);
  const signature = token.slice(splitIndex + 1);
  const scope = decodeURIComponent(rawScope) as PortalSessionScope;
  const expectedSignature = await signPortalScope(scope);

  if (!constantTimeEqual(signature, expectedSignature)) {
    return null;
  }

  return scope;
}

export function isPortalScopeAllowed(
  sessionScope: PortalSessionScope | null,
  requiredScope: PortalSessionScope | null
) {
  if (!requiredScope) {
    return true;
  }

  if (!sessionScope) {
    return false;
  }

  if (sessionScope === "admin") {
    return true;
  }

  return sessionScope === requiredScope;
}
