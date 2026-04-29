import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";

type StorySectionProps = {
  weddingData?: WeddingData;
  previewMode?: boolean;
};

export function StorySection({ weddingData, previewMode = false }: StorySectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="story" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Our Story"
            title={wedding.story.heading}
            titleHtml={wedding.story.headingHtml}
          />
          <div className="space-y-5">
            {previewMode ? (
              <div className="rounded-[1.2rem] border border-[var(--border)] bg-[var(--accent-soft)] px-5 py-4 text-sm leading-6 text-[var(--muted)]">
                This is sample story wording for review. The couple can replace it with their own
                version before the site goes live.
              </div>
            ) : null}
            {wedding.story.html ? (
              <RichTextContent html={wedding.story.html} className="text-lg leading-8" />
            ) : (
              wedding.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="prose-copy text-lg">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
