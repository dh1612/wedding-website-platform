const portalCookieName = "wedding_portal_session";

export type PortalSessionScope = "admin" | `wedding:${string}`;

export function getPortalCookieName() {
  return portalCookieName;
}

export function getDefaultCouplePortalPassword() {
  return process.env.COUPLE_PORTAL_PASSWORD ?? "john-sarah-portal";
}

export function getOperatorPortalPassword() {
  return process.env.ADMIN_PORTAL_PASSWORD ?? getDefaultCouplePortalPassword();
}

export function getPortalSecret() {
  return process.env.PORTAL_SESSION_SECRET ?? getOperatorPortalPassword();
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
  const normalised = normalisePathname(pathname);

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

  if (signature !== expectedSignature) {
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
