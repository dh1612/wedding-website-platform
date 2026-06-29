import type { MetadataRoute } from "next";
import { BRAND_DOMAIN } from "@/lib/brand";

const baseUrl = `https://${BRAND_DOMAIN}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/contact",
          "/get-started",
          "/templates",
          "/brochure",
          "/faq",
          "/privacy-policy",
          "/refund-policy",
          "/terms",
          "/packages/",
          "/couple-area"
        ],
        disallow: [
          "/admin",
          "/api",
          "/preview",
          "/private-preview",
          "/unlock",
          "/portal-login",
          "/portal-reset",
          "/couple-portal",
          "/rsvp-dashboard",
          "/plan-your-tables",
          "/production"
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
