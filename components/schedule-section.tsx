import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";

type ScheduleSectionProps = {
  weddingData?: WeddingData;
};

export function ScheduleSection({ weddingData }: ScheduleSectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="schedule" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow="Weekend Timeline"
            title="What’s Happening And When"
            description="A clear outline of the celebration so guests can settle in, enjoy the weekend, and know where they need to be."
          />
          <div className="mt-6 rounded-[1.2rem] border border-[var(--border)] bg-white/72 px-5 py-4 text-sm leading-6 text-[var(--muted)]">
            A gentle flow is part of the destination-wedding charm, so use this as your guide and leave a little room for island time.
          </div>
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {wedding.schedule.map((item, index) => (
              <article
                key={`${item.time}-${item.title}`}
                className="accent-panel rounded-[1.3rem] p-5"
              >
                <div>
                  <div className="accent-panel inline-flex rounded-full px-3 py-1 text-sm uppercase tracking-[0.25em] text-[var(--accent-strong)]">
                    Stop {index + 1}
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[var(--accent-strong)]">
                    {item.time}
                  </p>
                </div>
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="prose-copy mt-2">{item.details}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
