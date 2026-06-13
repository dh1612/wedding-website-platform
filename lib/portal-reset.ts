import { createHash, randomBytes } from "node:crypto";

export const PORTAL_RESET_WINDOW_MS = 60 * 60 * 1000;

export function createPortalResetToken() {
  return randomBytes(32).toString("hex");
}

export function hashPortalResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getPortalResetExpiryDate() {
  return new Date(Date.now() + PORTAL_RESET_WINDOW_MS);
}
