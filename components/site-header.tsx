import Link from "next/link";
import { LayoutToggle } from "@/components/layout-toggle";
import { MobileSectionMenu } from "@/components/mobile-section-menu";
import type { WeddingData } from "@/types/wedding";
import {
  buildModeHref,
  buildScrollNavItems,
  operatorNavItems,
  pageNavItems,
  portalNavItems,
  type SiteMode
} from "@/lib/site-navigation";
import { formatDisplayDate } from "@/lib/utils";
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
  const isFloralFrameTheme = themeId === "petal-script";
  const adminNavItems =
    adminNavItemsOverride ??
    (portalType === "operator" ? operatorNavItems : portalNavItems);
  const scrollNavItems = buildScrollNavItems(wedding);
  const displayDate = formatDisplayDate(wedding.date);

  const activeNavStyle = {
    backgroundColor: "var(--accent-strong)",
    color: "var(--accent-contrast)"
  };

  const inactiveNavStyle = {
    color: "var(--muted)"
  };

  if (!adminView && isFloralFrameTheme) {
    const publicNavItems =
      mode === "pages"
        ? pageNavItems.map((item) => ({
            label: item.label,
            href: buildModeHref(item.path, themeId, "pages"),
            active: item.path === currentPath
          }))
        : scrollNavItems.map((item) => ({
            label: item.label,
            href: buildModeHref(siteBasePath, themeId, "scroll") + item.href,
            active: false
          }));

    return (
      <header className="relative z-20 px-6 pt-6 lg:px-8 lg:pt-8">
        <div className="floral-header-shell mx-auto w-full max-w-6xl rounded-[2.4rem] border border-[var(--border)] bg-white/90 px-6 py-8 shadow-[var(--shadow)] sm:px-10 lg:px-14 lg:py-10">
          <span className="floral-corner floral-corner-left" aria-hidden="true" />
          <span className="floral-corner floral-corner-right" aria-hidden="true" />
          <div className="relative">
            {mode === "scroll" && scrollNavItems.length ? (
              <div className="absolute right-0 top-0">
                <MobileSectionMenu
                  items={scrollNavItems.map((item) => ({
                    label: item.label,
                    href: buildModeHref(siteBasePath, themeId, "scroll") + item.href
                  }))}
                />
              </div>
            ) : null}
            <Link
              href={buildModeHref(siteBasePath, themeId, mode)}
              className="mx-auto block max-w-4xl text-center"
            >
              <p
                className="text-[clamp(2.8rem,7vw,5.5rem)] leading-none text-[var(--accent-strong)]"
                style={{ fontFamily: "var(--font-script)" }}
              >
                {wedding.couple}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.34em] text-[var(--muted)] sm:text-sm">
                {[displayDate, wedding.locationSummary].filter(Boolean).join(" • ")}
              </p>
            </Link>
            <nav className="mt-8 hidden flex-wrap items-center justify-center gap-8 md:flex">
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-transparent pb-1 text-sm uppercase tracking-[0.22em] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
                  style={
                    item.active
                      ? {
                          borderColor: "var(--accent)",
                          color: "var(--accent-strong)"
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {!allowModeToggle && returnHref ? (
              <div className="mt-6 text-center">
                <Link
                  href={returnHref}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-soft)]"
                >
                  {returnLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </header>
    );
  }

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
          <MobileSectionMenu
            items={scrollNavItems.map((item) => ({
              label: item.label,
              href: buildModeHref(siteBasePath, themeId, "scroll") + item.href
            }))}
          />
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
