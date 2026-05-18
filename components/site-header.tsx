import Link from "next/link";
import { LayoutToggle } from "@/components/layout-toggle";
import type { WeddingData } from "@/types/wedding";
import {
  buildModeHref,
  buildScrollNavItems,
  operatorNavItems,
  pageNavItems,
  portalNavItems,
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
  adminNavItemsOverride?: Array<{ label: string; path: string }>;
  returnHref?: string;
  returnLabel?: string;
};

export function SiteHeader({
  currentPath,
  mode,
  themeId,
  adminView = false,
  portalType = "couple",
  siteBasePath = "/templates",
  allowModeToggle = true,
  weddingData,
  adminNavItemsOverride,
  returnHref,
  returnLabel = "Return to Home"
}: SiteHeaderProps) {
  const wedding = weddingData ?? getWeddingData();
  const adminNavItems =
    adminNavItemsOverride ??
    (portalType === "operator" ? operatorNavItems : portalNavItems);
  const scrollNavItems = buildScrollNavItems(wedding);

  const activeNavStyle = {
    backgroundColor: "var(--accent-strong)",
    color: "var(--accent-contrast)"
  };

  const inactiveNavStyle = {
    color: "var(--muted)"
  };

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
        {!adminView && mode === "scroll" && scrollNavItems.length ? (
          <details className="relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-center rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-soft)]">
              Sections
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 w-[min(18rem,calc(100vw-3rem))] rounded-[1.5rem] border border-[var(--border)] bg-white/95 p-3 shadow-[0_20px_60px_rgba(21,36,31,0.16)] backdrop-blur">
              <p className="eyebrow px-3 pt-2">Jump To</p>
              <nav className="mt-2 flex flex-col gap-1">
                {scrollNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={buildModeHref(siteBasePath, themeId, "scroll") + item.href}
                    className="rounded-[1rem] px-3 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </details>
        ) : null}
        {adminNavItems.length ? (
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
                      data-active={isActive ? "true" : "false"}
                      className={
                        isActive
                          ? "rounded-full px-4 py-2 font-medium"
                          : "rounded-full px-4 py-2 transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                      }
                      style={isActive ? activeNavStyle : inactiveNavStyle}
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
                        data-active={isActive ? "true" : "false"}
                        className={
                          isActive
                            ? "rounded-full px-4 py-2 font-medium"
                            : "rounded-full px-4 py-2 transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                        }
                        style={isActive ? activeNavStyle : inactiveNavStyle}
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
        ) : (
          <div className="hidden flex-1 md:block" />
        )}
        {adminView ? (
          <div className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]">
            {portalType === "operator" ? "Admin Area" : "Couple Area"}
          </div>
        ) : null}
        {!adminView ? (
          <div className="flex items-center gap-2">
            {returnHref ? (
              <Link
                href={returnHref}
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-soft)]"
              >
                {returnLabel}
              </Link>
            ) : null}
            {allowModeToggle ? (
              <LayoutToggle
                currentPath={currentPath}
                mode={mode}
                themeId={themeId}
                siteBasePath={siteBasePath}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
