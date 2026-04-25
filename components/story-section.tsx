import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";

type StorySectionProps = {
  weddingData?: WeddingData;
};

export function StorySection({ weddingData }: StorySectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="story" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Our Story" title={wedding.story.heading} />
          <div className="space-y-5">
            {wedding.story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="prose-copy text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
