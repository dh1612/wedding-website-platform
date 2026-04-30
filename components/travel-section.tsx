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
  const showMapUtility =
    Boolean(wedding.travel.mapLink) ||
    Boolean(wedding.travel.relaxedNote) ||
    Boolean(wedding.travel.mapSpots?.length);

  if (!showCeremony && !showReception && !showTransport && !showDirections && !showMapUtility) {
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
            {showMapUtility ? (
              <article className="accent-panel rounded-[1.5rem] p-6 sm:col-span-2">
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-4">
                    <p className="eyebrow">Map & Area</p>
                    <h3 className="text-2xl">Useful locations at a glance</h3>
                    <p className="prose-copy">
                      A quick guide to the places guests are most likely to need before and during the wedding weekend.
                    </p>
                    {wedding.travel.mapLink ? (
                      <a
                        href={wedding.travel.mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="accent-outline inline-flex rounded-full px-5 py-3 text-sm font-medium"
                      >
                        Open map
                      </a>
                    ) : null}
                    {wedding.travel.relaxedNote ? (
                      <div className="rounded-[1.2rem] border border-[var(--border)] bg-white/72 px-5 py-4 text-sm leading-6 text-[var(--muted)]">
                        <strong className="text-[var(--foreground)]">Relaxed itinerary note:</strong>{" "}
                        {wedding.travel.relaxedNote}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(wedding.travel.mapSpots ?? []).map((spot) => (
                      <div
                        key={`${spot.label}-${spot.detail}`}
                        className="rounded-[1.2rem] border border-[var(--border)] bg-white/78 p-5"
                      >
                        <p className="eyebrow">{spot.label}</p>
                        <p className="mt-3 text-base leading-7 text-[var(--foreground)]">
                          {spot.detail}
                        </p>
                        {spot.href ? (
                          <a
                            href={spot.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex text-sm font-medium text-[var(--accent-strong)]"
                          >
                            Open in maps
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
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
                {wedding.ceremony.mapLink ? (
                  <a
                    href={wedding.ceremony.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-[var(--accent-strong)]"
                  >
                    Open ceremony map
                  </a>
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
                {wedding.reception.mapLink ? (
                  <a
                    href={wedding.reception.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-[var(--accent-strong)]"
                  >
                    Open reception map
                  </a>
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
