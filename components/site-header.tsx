import Link from "next/link";
import { LayoutToggle } from "@/components/layout-toggle";
import type { WeddingData } from "@/types/wedding";
import {
  buildModeHref,
  operatorNavItems,
  pageNavItems,
  portalNavItems,
  scrollNavItems,
  type SiteMode
} from "@/lib/site-navigation";
import { getWeddingData } from "@/lib/wedding-data";

type SiteHeaderProps = {
  currentPath: string;
  mode: SiteMode;
  themeId: string;
  adminView?: boolean;
  portalType?: "couple" | "operator";
  siteBasePath?: string;
  allowModeToggle?: boolean;
  weddingData?: WeddingData;
};

export function SiteHeader({
  currentPath,
  mode,
  themeId,
  adminView = false,
  portalType = "couple",
  siteBasePath = "/templates",
  allowModeToggle = true,
  weddingData
}: SiteHeaderProps) {
  const wedding = weddingData ?? getWeddingData();
  const adminNavItems = portalType === "operator" ? operatorNavItems : portalNavItems;

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_84%,white)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link
          href={adminView ? buildModeHref("/", themeId, mode) : buildModeHref(siteBasePath, themeId, mode)}
          className="space-y-1 rounded-full px-1"
        >
          <p className="eyebrow">{adminView ? "Wedding Portal" : "Wedding Day"}</p>
          <p className="text-lg font-semibold">
            {adminView
              ? portalType === "operator"
                ? "Operator Backend"
                : `${wedding.couple} Portal`
              : wedding.couple}
          </p>
        </Link>
        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {adminView
              ? adminNavItems.map((item) => {
                  const isActive =
                    item.path === currentPath ||
                    (item.path.includes("#") && currentPath === item.path.split("#")[0]);

                  return (
                    <Link
                      key={item.path}
                      href={item.path.includes("#") ? item.path : `${item.path}?theme=${themeId}`}
                      className={
                        isActive
                          ? "rounded-full bg-[var(--accent-strong)] px-4 py-2 font-medium text-[var(--accent-contrast)]"
                          : "rounded-full px-4 py-2 text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })
              : mode === "pages"
              ? pageNavItems.map((item) => {
                  const isActive = item.path === currentPath;

                  return (
                    <Link
                      key={item.path}
                      href={buildModeHref(item.path, themeId, "pages")}
                      className={
                        isActive
                          ? "rounded-full bg-[var(--accent-strong)] px-4 py-2 font-medium text-[var(--accent-contrast)]"
                          : "rounded-full px-4 py-2 text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })
              : scrollNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={buildModeHref(siteBasePath, themeId, "scroll") + item.href}
                    className="rounded-full px-4 py-2 text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                  >
                    {item.label}
                  </a>
                ))}
          </nav>
        </div>
        {adminView ? (
          <div className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]">
            {portalType === "operator" ? "Admin Area" : "Couple Area"}
          </div>
        ) : allowModeToggle ? (
          <LayoutToggle
            currentPath={currentPath}
            mode={mode}
            themeId={themeId}
            siteBasePath={siteBasePath}
          />
        ) : null}
      </div>
    </header>
  );
}
