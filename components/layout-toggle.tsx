import Link from "next/link";
import { buildModeHref, type SiteMode } from "@/lib/site-navigation";

type LayoutToggleProps = {
  mode: SiteMode;
  themeId: string;
  currentPath: string;
  siteBasePath?: string;
};

export function LayoutToggle({
  mode,
  themeId,
  currentPath,
  siteBasePath = "/templates"
}: LayoutToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-soft)] p-1 text-sm">
      <Link
        href={buildModeHref(siteBasePath, themeId, "scroll")}
        className={
          mode === "scroll"
            ? "rounded-full bg-[var(--accent-strong)] px-4 py-2 font-medium text-[var(--accent-contrast)]"
            : "rounded-full px-4 py-2 text-[var(--accent-strong)]"
        }
      >
        Scroll
      </Link>
      <Link
        href={buildModeHref(currentPath, themeId, "pages")}
        className={
          mode === "pages"
            ? "rounded-full bg-[var(--accent-strong)] px-4 py-2 font-medium text-[var(--accent-contrast)]"
            : "rounded-full px-4 py-2 text-[var(--accent-strong)]"
        }
      >
        Pages
      </Link>
    </div>
  );
}
