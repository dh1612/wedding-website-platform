import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { getPreviewFallbackContent } from "@/lib/preview-fallbacks";
import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";
import { TravelVisualMap } from "@/components/travel-visual-map";
import { VenueSneakPeek } from "@/components/venue-sneak-peek";

type TravelSectionProps = {
  weddingData?: WeddingData;
  previewMode?: boolean;
  themeId?: string;
};

export function TravelSection({
  weddingData,
  previewMode = false,
  themeId
}: TravelSectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const fallback = previewMode ? getPreviewFallbackContent(themeId ?? wedding.theme, wedding) : null;
  const visibility = wedding.sectionVisibility;
  const hasCeremonyDetails = Boolean(
    wedding.ceremony.location?.trim() || wedding.ceremony.time?.trim() || wedding.ceremony.address?.trim()
  );
  const hasReceptionDetails = Boolean(
    wedding.reception.location?.trim() || wedding.reception.time?.trim() || wedding.reception.address?.trim()
  );
  const hasTransportDetails = Boolean(wedding.travel.transport?.trim());
  const hasDirectionsDetails = Boolean(wedding.travel.parking?.trim() || wedding.travel.directions?.trim());
  const hasLocationOverview = Boolean(
    wedding.travel.locationOverviewTitle || wedding.travel.locationOverviewHtml
  );
  const showCeremony = previewMode || (visibility?.ceremonyCard ?? true);
  const showReception = previewMode || (visibility?.receptionCard ?? true);
  const showTransport = previewMode || (visibility?.transportCard ?? true);
  const showDirections = previewMode || (visibility?.directionsCard ?? true);
  const showRelaxedNote = (visibility?.relaxedNote ?? true) && Boolean(wedding.travel.relaxedNote);
  const showMapUtility =
    Boolean(wedding.travel.mapLink) ||
    showRelaxedNote ||
    Boolean(wedding.travel.mapSpots?.length) ||
    previewMode;

  const resolvedDescription =
    wedding.travel.description?.trim() || fallback?.travelDescription || "";
  const resolvedLocationOverviewTitle =
    wedding.travel.locationOverviewTitle || fallback?.travelLocationOverviewTitle;
  const resolvedLocationOverviewText = fallback?.travelLocationOverviewText;
  const resolvedMapUtilityTitle =
    wedding.travel.mapUtilityTitle || fallback?.travelMapUtilityTitle;
  const resolvedMapUtilityDescription =
    wedding.travel.mapUtilityDescription || fallback?.travelMapUtilityDescription;
  const resolvedMapSpots =
    wedding.travel.mapSpots?.length ? wedding.travel.mapSpots : fallback?.mapSpots ?? [];

  if (
    !previewMode &&
    !showCeremony &&
    !showReception &&
    !showTransport &&
    !showDirections &&
    !showMapUtility
  ) {
    return null;
  }

  return (
    <section
      id="travel"
      data-section="travel"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-2xl space-y-4">
            <SectionHeading
              eyebrow="Venue & Travel"
              title={wedding.travel.heading}
              titleHtml={wedding.travel.headingHtml}
              description={resolvedDescription}
              descriptionHtml={wedding.travel.descriptionHtml}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {hasLocationOverview || previewMode ? (
              <article className="accent-panel rounded-[1.5rem] p-6 sm:col-span-2">
                <SectionHeading
                  eyebrow="About The Location"
                  title={resolvedLocationOverviewTitle || "About the area"}
                  titleHtml={wedding.travel.locationOverviewTitleHtml}
                />
                {wedding.travel.locationOverviewHtml ? (
                  <RichTextContent html={wedding.travel.locationOverviewHtml} className="mt-4" />
                ) : resolvedLocationOverviewText ? (
                  <p className="prose-copy mt-4">{resolvedLocationOverviewText}</p>
                ) : null}
              </article>
            ) : null}
            {showMapUtility ? (
              <article className="accent-panel rounded-[1.5rem] p-6 sm:col-span-2">
                <div className="space-y-6">
                  <div
                    className={`grid gap-6 lg:items-start ${
                      showRelaxedNote
                        ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                        : "lg:grid-cols-1"
                    }`}
                  >
                    <div className="space-y-4">
                      <SectionHeading
                        eyebrow={wedding.travel.mapUtilityEyebrow || "Map & Area"}
                        title={resolvedMapUtilityTitle || "Useful locations at a glance"}
                        titleHtml={wedding.travel.mapUtilityTitleHtml}
                        description={
                          resolvedMapUtilityDescription ||
                          "A quick guide to the places guests are most likely to need before and during the wedding weekend."
                        }
                        descriptionHtml={wedding.travel.mapUtilityDescriptionHtml}
                      />
                      <div className="flex flex-wrap gap-3">
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
                      </div>
                    </div>
                    {showRelaxedNote ? (
                      <div className="rounded-[1.2rem] border border-[var(--border)] bg-white/72 px-5 py-4 text-sm leading-6 text-[var(--muted)] lg:max-w-xl">
                        <strong className="text-[var(--foreground)]">Relaxed itinerary note:</strong>{" "}
                        {wedding.travel.relaxedNote}
                      </div>
                    ) : null}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {wedding.travel.visualMap?.nodes?.length ? (
                      <div className="md:col-span-2 xl:col-span-3">
                        <TravelVisualMap visualMap={wedding.travel.visualMap} />
                      </div>
                    ) : null}
                    {resolvedMapSpots.map((spot) => (
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
            {showCeremony && (hasCeremonyDetails || previewMode) ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Ceremony</p>
                <h3 className="mt-3 text-2xl">
                  {wedding.ceremony.location || fallback?.ceremony.location}
                </h3>
                <p className="prose-copy mt-3">{wedding.ceremony.time || fallback?.ceremony.time}</p>
                <p className="prose-copy">
                  {wedding.ceremony.address || fallback?.ceremony.address}
                </p>
                {wedding.ceremony.descriptionHtml ? (
                  <RichTextContent
                    html={wedding.ceremony.descriptionHtml}
                    className="mt-3"
                  />
                ) : wedding.ceremony.description || fallback?.ceremony.description ? (
                  <p className="prose-copy mt-3">
                    {wedding.ceremony.description || fallback?.ceremony.description}
                  </p>
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
            {showReception && (hasReceptionDetails || previewMode) ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Reception</p>
                <h3 className="mt-3 text-2xl">
                  {wedding.reception.location || fallback?.reception.location}
                </h3>
                <p className="prose-copy mt-3">
                  {wedding.reception.time || fallback?.reception.time}
                </p>
                <p className="prose-copy">
                  {wedding.reception.address || fallback?.reception.address}
                </p>
                {wedding.reception.descriptionHtml ? (
                  <RichTextContent
                    html={wedding.reception.descriptionHtml}
                    className="mt-3"
                  />
                ) : wedding.reception.description || fallback?.reception.description ? (
                  <p className="prose-copy mt-3">
                    {wedding.reception.description || fallback?.reception.description}
                  </p>
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
            {showTransport && (hasTransportDetails || previewMode) ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Transport</p>
                {wedding.travel.transportHtml ? (
                  <RichTextContent html={wedding.travel.transportHtml} className="mt-3" />
                ) : (
                  <p className="prose-copy mt-3">
                    {wedding.travel.transport || fallback?.transport}
                  </p>
                )}
              </article>
            ) : null}
            {showDirections && (hasDirectionsDetails || previewMode) ? (
              <article className="accent-panel rounded-[1.5rem] p-6">
                <p className="eyebrow">Parking & Directions</p>
                {wedding.travel.parkingHtml ? (
                  <RichTextContent html={wedding.travel.parkingHtml} className="mt-3" />
                ) : (
                  <p className="prose-copy mt-3">
                    {wedding.travel.parking || fallback?.parking}
                  </p>
                )}
                {wedding.travel.directionsHtml ? (
                  <RichTextContent html={wedding.travel.directionsHtml} className="mt-2" />
                ) : (
                  <p className="prose-copy mt-2">
                    {wedding.travel.directions || fallback?.directions}
                  </p>
                )}
                {wedding.travel.mapLink ? (
                  <a
                    href={wedding.travel.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-[var(--accent-strong)]"
                  >
                    Open map
                  </a>
                ) : null}
              </article>
            ) : null}
            {wedding.travel.sneakPeekImage ? (
              <article className="sm:col-span-2">
                <VenueSneakPeek
                  imageUrl={wedding.travel.sneakPeekImage}
                  eyebrow="Venue Sneak Peek"
                  title={`A first look at ${wedding.reception.location || wedding.ceremony.location || "the venue"}`}
                />
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
