export const BRAND_NAME = "Crafted Wedding Sites";
export const BRAND_DOMAIN = "craftedweddingsites.ie";
export const SUPPORT_EMAIL = `hello@${BRAND_DOMAIN}`;

export const DEFAULT_SAMPLE_THEME_ID = "aegean-romance";

export function buildSampleWebsiteHref(
  themeId = DEFAULT_SAMPLE_THEME_ID,
  hash?: string
) {
  return `/wedding?theme=${themeId}${hash ?? ""}`;
}
