import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";

type AccommodationSectionProps = {
  weddingData?: WeddingData;
};

export function AccommodationSection({
  weddingData
}: AccommodationSectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="accommodation" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow={wedding.accommodationEyebrow}
            title={wedding.accommodationTitle}
            titleHtml={wedding.accommodationTitleHtml}
            description={wedding.accommodationDescription}
            descriptionHtml={wedding.accommodationDescriptionHtml}
          />
        </div>
        <div className="section-shell rounded-[1.75rem] p-6 sm:p-8">
          <div className="space-y-4">
            {wedding.accommodation.map((hotel, index) => (
              <article
                key={hotel.name}
                className={`flex flex-col gap-4 py-1 sm:flex-row sm:items-start sm:justify-between ${
                  index !== wedding.accommodation.length - 1 ? "border-b border-[var(--border)] pb-4" : ""
                }`}
              >
                <div className="min-w-0">
                  <h3 className="text-2xl">{hotel.name}</h3>
                  <p className="prose-copy mt-2">{hotel.note}</p>
                </div>
                {hotel.link ? (
                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noreferrer"
                    className="accent-outline shrink-0 rounded-full px-5 py-3 text-sm font-medium"
                  >
                    View hotel
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
