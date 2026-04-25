const portalCookieName = "wedding_portal_session";

export function getPortalCookieName() {
  return portalCookieName;
}

export function getPortalPassword() {
  return process.env.COUPLE_PORTAL_PASSWORD ?? "john-sarah-portal";
}

export function getPortalSecret() {
  return process.env.PORTAL_SESSION_SECRET ?? getPortalPassword();
}

export async function createPortalSessionToken() {
  const message = new TextEncoder().encode("wedding-portal-session");
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
