import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";

type TravelSectionProps = {
  weddingData?: WeddingData;
};

export function TravelSection({ weddingData }: TravelSectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="travel" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Venue & Travel"
            title="Where To Go"
            description="Key locations and practical notes for the ceremony and celebrations."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="accent-panel rounded-[1.5rem] p-6">
              <p className="eyebrow">Ceremony</p>
              <h3 className="mt-3 text-2xl">{wedding.ceremony.location}</h3>
              <p className="prose-copy mt-3">{wedding.ceremony.time}</p>
              <p className="prose-copy">{wedding.ceremony.address}</p>
              <p className="prose-copy mt-3">{wedding.ceremony.description}</p>
            </article>
            <article className="accent-panel rounded-[1.5rem] p-6">
              <p className="eyebrow">Reception</p>
              <h3 className="mt-3 text-2xl">{wedding.reception.location}</h3>
              <p className="prose-copy mt-3">{wedding.reception.time}</p>
              <p className="prose-copy">{wedding.reception.address}</p>
              <p className="prose-copy mt-3">{wedding.reception.description}</p>
            </article>
            <article className="accent-panel rounded-[1.5rem] p-6">
              <p className="eyebrow">Transport</p>
              <p className="prose-copy mt-3">{wedding.travel.transport}</p>
            </article>
            <article className="accent-panel rounded-[1.5rem] p-6">
              <p className="eyebrow">Parking & Directions</p>
              <p className="prose-copy mt-3">{wedding.travel.parking}</p>
              <p className="prose-copy mt-2">{wedding.travel.directions}</p>
              <a
                href={wedding.travel.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-[var(--accent-strong)]"
              >
                Open map
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
