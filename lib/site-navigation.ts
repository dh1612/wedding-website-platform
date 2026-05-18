import type { WeddingData } from "@/types/wedding";

export type SiteMode = "scroll" | "pages";

export const pageNavItems = [
  { label: "Home", path: "/templates" },
  { label: "Story", path: "/story" },
  { label: "Schedule", path: "/schedule" },
  { label: "Travel", path: "/travel" },
  { label: "Stay", path: "/stay" },
  { label: "FAQ", path: "/faq" },
  { label: "RSVP", path: "/rsvp" },
  { label: "Production", path: "/production" }
];

export const scrollNavItems = [
  { label: "Travel", href: "#travel" },
  { label: "Stay", href: "#accommodation" },
  { label: "Schedule", href: "#schedule" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Story", href: "#story" },
  { label: "FAQ", href: "#faq" }
];

export function buildScrollNavItems(weddingData: WeddingData) {
  const visibility = weddingData.sectionVisibility;
  const items: Array<{ label: string; href: string }> = [];

  if (visibility?.travel ?? true) {
    items.push({ label: "Travel", href: "#travel" });
  }

  if (visibility?.accommodation ?? true) {
    items.push({ label: "Stay", href: "#accommodation" });
  }

  if (visibility?.schedule ?? true) {
    items.push({ label: "Schedule", href: "#schedule" });
  }

  if (visibility?.dayTwo ?? false) {
    items.push({ label: "Day Two", href: "#day-two" });
  }

  if (visibility?.rsvp ?? true) {
    items.push({ label: "RSVP", href: "#rsvp" });
  }

  if (visibility?.suppliers ?? false) {
    items.push({ label: "Suppliers", href: "#suppliers" });
  }

  if ((visibility?.story ?? true) || (visibility?.gallery ?? true)) {
    items.push({ label: "Story", href: "#story" });
  }

  if ((visibility?.faq ?? true) || (visibility?.aiConcierge ?? true)) {
    items.push({ label: "FAQ", href: "#faq" });
  }

  return items;
}

export const portalNavItems = [
  { label: "Portal Home", path: "/couple-portal" },
  { label: "Checklist", path: "/couple-portal#checklist" },
  { label: "Calendar", path: "/couple-portal#calendar" },
  { label: "RSVPs", path: "/rsvp-dashboard" },
  { label: "Seating", path: "/plan-your-tables" }
];

export function buildPortalNavItems(basePath: string) {
  return [
    { label: "Portal Home", path: basePath },
    { label: "Checklist", path: `${basePath}#checklist` },
    { label: "Calendar", path: `${basePath}#calendar` },
    { label: "RSVPs", path: `/rsvp-dashboard/${basePath.split("/").pop()}` },
    { label: "Seating", path: `/plan-your-tables/${basePath.split("/").pop()}` }
  ];
}

export const operatorNavItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Production", path: "/production" }
];

export function buildOperatorWeddingNavItems(slug: string) {
  return [
    { label: "Dashboard", path: "/admin" },
    { label: "Workspace", path: `/admin/weddings/${slug}` },
    { label: "Edit Wedding", path: `/admin/weddings/${slug}/edit` },
    { label: "Preview", path: `/preview/${slug}` },
    { label: "Portal", path: `/couple-portal/${slug}` },
    { label: "RSVPs", path: `/rsvp-dashboard/${slug}` },
    { label: "Seating", path: `/plan-your-tables/${slug}` }
  ];
}

export function buildModeHref(
  path: string,
  themeId: string,
  mode: SiteMode
) {
  const params = new URLSearchParams();
  params.set("theme", themeId);
  params.set("mode", mode);

  const query = params.toString();

  return query ? `${path}?${query}` : path;
}
