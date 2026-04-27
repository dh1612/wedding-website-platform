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
  { label: "Story", href: "#story" },
  { label: "Schedule", href: "#schedule" },
  { label: "Travel", href: "#travel" },
  { label: "Stay", href: "#accommodation" },
  { label: "FAQ", href: "#faq" },
  { label: "RSVP", href: "#rsvp" }
];

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
