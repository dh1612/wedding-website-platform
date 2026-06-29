import type { MetadataRoute } from "next";
import { BRAND_DOMAIN } from "@/lib/brand";

const baseUrl = `https://${BRAND_DOMAIN}`;

const marketingRoutes = [
  "",
  "/contact",
  "/why-crafted",
  "/get-started",
  "/templates",
  "/brochure",
  "/faq",
  "/privacy-policy",
  "/refund-policy",
  "/terms",
  "/packages/basic",
  "/packages/smart",
  "/packages/premium",
  "/couple-area",
  "/couple-area/demo"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return marketingRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency:
      path === ""
        ? "weekly"
        : path.startsWith("/packages") || path === "/templates"
          ? "monthly"
          : "yearly",
    priority:
      path === ""
        ? 1
        : path === "/get-started"
          ? 0.9
          : path.startsWith("/packages") || path === "/templates"
            ? 0.8
            : 0.6
  }));
}
