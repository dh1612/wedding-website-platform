import Link from "next/link";
import { buildSampleWebsiteHref } from "@/lib/brand";
import { sampleWebsiteShowcases } from "@/lib/sample-websites";
import { cn } from "@/lib/utils";

type ThemeShowcaseProps = {
  activeThemeId: string;
};

export function ThemeShowcase({ activeThemeId }: ThemeShowcaseProps) {
  const toneClasses = {
    romantic:
      "border-[#d8c7bc] bg-[linear-gradient(180deg,#fffdf9_0%,#f7efe7_100%)] text-[#2f241d]",
    coastal:
      "border-[#bcd1d7] bg-[linear-gradient(180deg,#f7fcff_0%,#e4f0f3_100%)] text-[#1f3440]",
    editorial:
      "border-[#d7d1ca] bg-[linear-gradient(180deg,#fffdfa_0%,#efebe7_100%)] text-[#241f1b]"
  } as const;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Style Directions</p>
            <h2 className="section-title">Three distinct example worlds, not just three shades of the same idea</h2>
            <p className="prose-copy text-lg">
              These examples are meant to feel genuinely different in mood: softer and romantic, destination-led and coastal, or sharper and editorial.
            </p>
          </div>
          <div className="rounded-full border border-[var(--border)] bg-white/60 px-4 py-2 text-sm text-[var(--muted)]">
            Open any example to see the full guest website in that direction
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sampleWebsiteShowcases.map((showcase) => {
            const isActive = showcase.themeId === activeThemeId;

            return (
              <Link
                key={showcase.sampleId}
                href={buildSampleWebsiteHref(showcase.themeId, undefined, showcase.sampleId)}
                className={cn(
                  "group overflow-hidden rounded-[1.75rem] border transition hover:-translate-y-1",
                  isActive
                    ? "border-[var(--accent-strong)] shadow-[var(--shadow)] ring-1 ring-[var(--accent-strong)]/10"
                    : "hover:shadow-[0_24px_60px_rgba(52,35,24,0.12)]"
                )}
              >
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${showcase.image}')` }}
                />
                <div className={cn("space-y-3 p-5", toneClasses[showcase.tone])}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl">{showcase.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-current/70">
                      {showcase.kicker}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-current/80">
                    {showcase.location}
                  </p>
                  <p className="text-sm leading-6 text-current/72">{showcase.accent}</p>
                  <p className="text-sm leading-6 text-current/78">{showcase.blurb}</p>
                  <p className="pt-2 text-sm font-medium text-current">
                    {isActive ? "Current example open" : "Open this sample website"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
