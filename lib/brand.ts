export const BRAND_NAME = "Crafted Wedding Sites";
export const BRAND_DOMAIN = "craftedweddingsites.ie";
export const SUPPORT_EMAIL = `hello@${BRAND_DOMAIN}`;

export const DEFAULT_SAMPLE_THEME_ID = "soft-blush";
export const DEFAULT_SAMPLE_WEDDING_ID = "manor-house";

export function buildSampleWebsiteHref(
  themeId = DEFAULT_SAMPLE_THEME_ID,
  hash?: string,
  sampleId = DEFAULT_SAMPLE_WEDDING_ID
) {
  const query = new URLSearchParams({
    theme: themeId,
    sample: sampleId
  });

  return `/wedding?${query.toString()}${hash ?? ""}`;
}
