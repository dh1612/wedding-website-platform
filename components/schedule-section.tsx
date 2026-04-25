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
            eyebrow="Schedule"
            title="The Day At A Glance"
            description="A simple timeline so guests can quickly understand where to be and when."
          />
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <div className="space-y-6">
            {wedding.schedule.map((item, index) => (
              <div key={`${item.time}-${item.title}`} className="grid gap-3 border-b border-[var(--border)] pb-6 last:border-none last:pb-0 sm:grid-cols-[120px_1fr]">
                <div>
                  <div className="accent-panel inline-flex rounded-full px-3 py-1 text-sm uppercase tracking-[0.25em] text-[var(--accent-strong)]">
                    Stop {index + 1}
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[var(--accent-strong)]">
                    {item.time}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="prose-copy mt-2">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
