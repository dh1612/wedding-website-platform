import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";
import { VenueSneakPeek } from "@/components/venue-sneak-peek";

type TravelSectionProps = {
  weddingData?: WeddingData;
};

export function TravelSection({ weddingData }: TravelSectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const visibility = wedding.sectionVisibility;
  const showCeremony = visibility?.ceremonyCard ?? true;
  const showReception = visibility?.receptionCard ?? true;
  const showTransport = visibility?.transportCard ?? true;
  const showDirections = visibility?.directionsCard ?? true;

  if (!showCeremony && !showReception && !showTransport && !showDirections) {
    return null;
  }

  return (
    <section id="travel" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-2xl space-y-4">
            <SectionHeading
              eyebrow="Venue & Travel"
              title={wedding.travel.heading}
              titleHtml={wedding.travel.headingHtml}
              description={wedding.travel.description}
              descriptionHtml={wedding.travel.descriptionHtml}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {wedding.travel.locationOverviewTitle || wedding.travel.locationOverviewHtml ? (
              <article className="accent-panel rounded-[1.5rem] p-6 sm:col-span-2">
                <SectionHeading
                  eyebrow="About The Location"
                  title={wedding.travel.locationOverviewTitle || "About the area"}
                  titleHtml={wedding.travel.locationOverviewTitleHtml}
                />
                {wedding.travel.locationOverviewHtml ? (
                  <RichTextContent html={wedding.travel.locationOverviewHtml} className="mt-4" />
                ) : null}
              </article>
            ) : null}
            {wedding.travel.sneakPeekImage ? (
              <article className="sm:col-span-2">
                <VenueSneakPeek imageUrl={wedding.travel.sneakPeekImage} />
              </article>
            ) : null}
            {showCeremony ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Ceremony</p>
                <h3 className="mt-3 text-2xl">{wedding.ceremony.location}</h3>
                <p className="prose-copy mt-3">{wedding.ceremony.time}</p>
                <p className="prose-copy">{wedding.ceremony.address}</p>
                {wedding.ceremony.descriptionHtml ? (
                  <RichTextContent
                    html={wedding.ceremony.descriptionHtml}
                    className="mt-3"
                  />
                ) : wedding.ceremony.description ? (
                  <p className="prose-copy mt-3">{wedding.ceremony.description}</p>
                ) : null}
              </article>
            ) : null}
            {showReception ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Reception</p>
                <h3 className="mt-3 text-2xl">{wedding.reception.location}</h3>
                <p className="prose-copy mt-3">{wedding.reception.time}</p>
                <p className="prose-copy">{wedding.reception.address}</p>
                {wedding.reception.descriptionHtml ? (
                  <RichTextContent
                    html={wedding.reception.descriptionHtml}
                    className="mt-3"
                  />
                ) : wedding.reception.description ? (
                  <p className="prose-copy mt-3">{wedding.reception.description}</p>
                ) : null}
              </article>
            ) : null}
            {showTransport ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Transport</p>
                {wedding.travel.transportHtml ? (
                  <RichTextContent html={wedding.travel.transportHtml} className="mt-3" />
                ) : (
                  <p className="prose-copy mt-3">{wedding.travel.transport}</p>
                )}
              </article>
            ) : null}
            {showDirections ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Parking & Directions</p>
                {wedding.travel.parkingHtml ? (
                  <RichTextContent html={wedding.travel.parkingHtml} className="mt-3" />
                ) : (
                  <p className="prose-copy mt-3">{wedding.travel.parking}</p>
                )}
                {wedding.travel.directionsHtml ? (
                  <RichTextContent html={wedding.travel.directionsHtml} className="mt-2" />
                ) : (
                  <p className="prose-copy mt-2">{wedding.travel.directions}</p>
                )}
                <a
                  href={wedding.travel.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-[var(--accent-strong)]"
                >
                  Open map
                </a>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
