import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { getPreviewFallbackContent } from "@/lib/preview-fallbacks";
import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";

type ScheduleSectionProps = {
  weddingData?: WeddingData;
  previewMode?: boolean;
  themeId?: string;
};

export function ScheduleSection({
  weddingData,
  previewMode = false,
  themeId
}: ScheduleSectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const fallback = previewMode ? getPreviewFallbackContent(themeId ?? wedding.theme, wedding) : null;
  const scheduleItems = wedding.schedule.length ? wedding.schedule : fallback?.schedule ?? [];
  const description =
    wedding.scheduleDescription?.trim() || fallback?.scheduleDescription || "";
  const note =
    wedding.scheduleNote?.trim() || (previewMode && !weddingData ? fallback?.scheduleNote : "") || "";
  const stepLabel = typeof wedding.scheduleStepLabel === "string" ? wedding.scheduleStepLabel.trim() : "Moment";

  return (
    <section
      id="schedule"
      data-section="schedule"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow={wedding.scheduleEyebrow}
            title={wedding.scheduleHeading}
            titleHtml={wedding.scheduleHeadingHtml}
            description={description}
            descriptionHtml={wedding.scheduleDescriptionHtml}
          />
          {(wedding.scheduleNoteHtml || note) ? (
            <div className="mt-6 rounded-[1.2rem] border border-[var(--border)] bg-white/72 px-5 py-4 text-sm leading-6 text-[var(--muted)]">
              {wedding.scheduleNoteHtml ? (
                <RichTextContent html={wedding.scheduleNoteHtml} className="text-sm leading-6" />
              ) : (
                note
              )}
            </div>
          ) : null}
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {scheduleItems.map((item, index) => (
              <article
                key={`${item.time}-${item.title}`}
                className="schedule-moment-card accent-panel rounded-[1.3rem] p-5"
              >
                <div>
                  <div className="schedule-moment-pill accent-panel inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm uppercase tracking-[0.25em] text-[var(--accent-strong)]">
                    <span className="schedule-moment-arrow" aria-hidden="true">
                      ♡
                    </span>
                    <span>
                      {stepLabel} {index + 1}
                    </span>
                  </div>
                  {item.time ? (
                    <p className="mt-3 text-lg font-semibold text-[var(--accent-strong)] schedule-time">
                      {item.time}
                    </p>
                  ) : null}
                </div>
                {item.title ? <h3 className="mt-4 text-2xl">{item.title}</h3> : null}
                {item.details ? <p className="prose-copy mt-2">{item.details}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
