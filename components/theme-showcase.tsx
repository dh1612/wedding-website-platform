import Link from "next/link";
import { getWeddingData } from "@/lib/wedding-data";
import { weddingThemes } from "@/lib/themes";
import { cn } from "@/lib/utils";

type ThemeShowcaseProps = {
  activeThemeId: string;
};

export function ThemeShowcase({ activeThemeId }: ThemeShowcaseProps) {
  const wedding = getWeddingData();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="eyebrow">Style Directions</p>
            <h2 className="section-title">Preview Seasonal Looks Before You Customise</h2>
            <p className="prose-copy text-lg">
              The same wedding details can be restyled quickly, so couples can choose a direction that fits their place, season, and atmosphere.
            </p>
          </div>
          <div className="rounded-full border border-[var(--border)] bg-white/60 px-4 py-2 text-sm text-[var(--muted)]">
            Current choice for {wedding.couple}:{" "}
            <span className="font-semibold text-[var(--accent-strong)]">
              {weddingThemes.find((theme) => theme.id === activeThemeId)?.name}
            </span>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {weddingThemes.map((theme) => {
            const isActive = theme.id === activeThemeId;

            return (
              <Link
                key={theme.id}
                href={`/templates?theme=${theme.id}`}
                className={cn(
                  "group rounded-[1.75rem] border p-5 transition hover:-translate-y-1",
                  isActive
                    ? "border-[var(--accent-strong)] bg-white/85 shadow-[var(--shadow)]"
                    : "border-[var(--border)] bg-white/60 hover:bg-white/80"
                )}
              >
                <div
                  className="h-32 rounded-[1.25rem] border border-black/5"
                  style={theme.previewStyle}
                />
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl">{theme.name}</h3>
                    <span className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                      {theme.season}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[var(--accent-strong)]">
                    {theme.label}
                  </p>
                  <p className="prose-copy">{theme.description}</p>
                  <p className="pt-2 text-sm font-medium text-[var(--accent-strong)]">
                    {isActive ? "Currently active" : "Preview this style"}
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
