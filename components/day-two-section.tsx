import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";
import { getWeddingData } from "@/lib/wedding-data";
import type { WeddingData } from "@/types/wedding";

type DayTwoSectionProps = {
  weddingData?: WeddingData;
};

export function DayTwoSection({ weddingData }: DayTwoSectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const dayTwo = wedding.dayTwo;

  if (!dayTwo) {
    return null;
  }

  const hasPanelContent =
    Boolean(dayTwo.panelEyebrow?.trim()) ||
    Boolean(dayTwo.panelTitleHtml) ||
    Boolean(dayTwo.panelTitle?.trim()) ||
    Boolean(dayTwo.detailsHtml) ||
    Boolean(dayTwo.details?.trim());

  return (
    <section
      id="day-two"
      data-section="day-two"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow={dayTwo.eyebrow}
            title={dayTwo.title}
            titleHtml={dayTwo.titleHtml}
            description={dayTwo.description}
            descriptionHtml={dayTwo.descriptionHtml}
          />
        </div>
        {hasPanelContent ? (
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <div className="accent-panel rounded-[1.5rem] p-6 sm:p-8">
              {dayTwo.panelEyebrow?.trim() ? (
                <p className="eyebrow">{dayTwo.panelEyebrow}</p>
              ) : null}
              {dayTwo.panelTitleHtml ? (
                <RichTextContent html={dayTwo.panelTitleHtml} className="mt-4 text-3xl" />
              ) : dayTwo.panelTitle?.trim() ? (
                <h3 className="mt-4 text-3xl">{dayTwo.panelTitle}</h3>
              ) : null}
              {dayTwo.detailsHtml ? (
                <RichTextContent html={dayTwo.detailsHtml} className="prose-copy mt-5" />
              ) : dayTwo.details?.trim() ? (
                <p className="prose-copy mt-5">{dayTwo.details}</p>
              ) : null}
              {dayTwo.mapLink ? (
                <a
                  href={dayTwo.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full border border-[var(--border)] bg-white/75 px-5 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-white"
                >
                  Open in maps
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
