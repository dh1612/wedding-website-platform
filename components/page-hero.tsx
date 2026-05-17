import Link from "next/link";
import { getWeddingData } from "@/lib/wedding-data";
import { buildModeHref } from "@/lib/site-navigation";
import type { WeddingData } from "@/types/wedding";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  themeId: string;
  weddingData?: WeddingData;
  showWeddingSummary?: boolean;
  summaryActionHref?: string;
  summaryActionLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  themeId,
  weddingData,
  showWeddingSummary = true,
  summaryActionHref,
  summaryActionLabel = "Back to home"
}: PageHeroProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-2 pt-4 lg:px-8">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="section-title">{title}</h1>
            <p className="prose-copy text-lg">{description}</p>
          </div>
          {showWeddingSummary ? (
            <div className="accent-panel rounded-[1.5rem] p-6">
              <p className="eyebrow">Wedding Day</p>
              <p className="mt-3 text-3xl">{wedding.couple}</p>
              <p className="mt-3 text-base text-[var(--foreground)]">{wedding.date}</p>
              <p className="mt-1 text-base text-[var(--muted)]">{wedding.locationSummary}</p>
              <Link
                href={summaryActionHref ?? buildModeHref("/templates", themeId, "pages")}
                className="accent-button mt-5 inline-flex rounded-full px-5 py-3 text-sm font-medium"
              >
                {summaryActionLabel}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
