import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";

type RSVPSectionProps = {
  weddingData?: WeddingData;
};

export function RSVPSection({ weddingData }: RSVPSectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="rsvp" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="RSVP"
            title="Let Us Know If You Can Make It"
            description={wedding.rsvp.description}
          />
          <div className="accent-panel rounded-[1.75rem] p-8">
            <p className="eyebrow">Deadline</p>
            <p className="mt-3 text-3xl">{wedding.rsvp.deadline}</p>
            <p className="prose-copy mt-4">
              Use this section for final guest updates, questions, or any last-minute changes before the wedding.
            </p>
            <a
              href={wedding.rsvp.url}
              target="_blank"
              rel="noreferrer"
              className="accent-button mt-6 inline-flex rounded-full px-6 py-3 text-sm font-medium"
            >
              {wedding.rsvp.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
