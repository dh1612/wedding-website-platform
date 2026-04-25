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

export const operatorNavItems = [
  { label: "Admin", path: "/admin" },
  { label: "Portal", path: "/couple-portal" },
  { label: "RSVPs", path: "/rsvp-dashboard" },
  { label: "Seating", path: "/plan-your-tables" },
  { label: "Production", path: "/production" }
];

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
