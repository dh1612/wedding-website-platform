import Link from "next/link";
import { BRAND_DOMAIN } from "@/lib/brand";
import type { WeddingData } from "@/types/wedding";

type InvitationSuiteProps = {
  slug: string;
  weddingData: WeddingData;
};

function formatInviteDate(dateText: string) {
  const parsed = new Date(dateText);
  if (Number.isNaN(parsed.getTime())) {
    return dateText;
  }

  return new Intl.DateTimeFormat("en-IE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
}

function compactLocation(value: string | undefined) {
  return value?.trim() || "";
}

function hasDayTwoContent(weddingData: WeddingData) {
  return Boolean(
    (weddingData.sectionVisibility?.dayTwo ?? false) &&
      (weddingData.dayTwo?.title?.trim() ||
        weddingData.dayTwo?.titleHtml?.trim() ||
        weddingData.dayTwo?.panelTitle?.trim() ||
        weddingData.dayTwo?.details?.trim() ||
        weddingData.dayTwo?.detailsHtml?.trim())
  );
}

export function InvitationSuite({
  slug,
  weddingData
}: InvitationSuiteProps) {
  const liveUrl = `https://${BRAND_DOMAIN}/${slug}`;
  const inviteDate = formatInviteDate(weddingData.date);
  const ceremonyLocation = compactLocation(weddingData.ceremony.location);
  const receptionLocation = compactLocation(weddingData.reception.location);
  const accommodationItems = weddingData.accommodation.slice(0, 2);
  const showDayTwo = hasDayTwoContent(weddingData);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-8 lg:px-8">
      <div className="print:grid print:grid-cols-1 print:gap-0 screen:grid screen:gap-8 lg:grid-cols-2">
        <section className="invitation-print-card section-shell rounded-[2.4rem] p-10 sm:p-14 print:min-h-[10.5in] print:rounded-none print:border-0 print:shadow-none">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="eyebrow">Wedding Invitation</p>
              <div className="mt-10 space-y-8">
                <div>
                  <p
                    className="text-[clamp(3.5rem,9vw,7rem)] leading-[0.94]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {weddingData.couple}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-2xl sm:text-3xl">{inviteDate}</p>
                  {ceremonyLocation ? (
                    <p className="text-xl text-[var(--muted)] sm:text-2xl">
                      {ceremonyLocation}
                    </p>
                  ) : null}
                </div>
                {weddingData.announcement?.trim() ? (
                  <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                    {weddingData.announcement}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-12 border-t border-[var(--border)] pt-6">
              <p className="eyebrow">Details online</p>
              <p className="mt-3 text-lg text-[var(--foreground)]">{liveUrl}</p>
            </div>
          </div>
        </section>

        <section className="invitation-print-card section-shell rounded-[2.4rem] p-10 sm:p-14 print:min-h-[10.5in] print:rounded-none print:border-0 print:shadow-none">
          <div className="space-y-8">
            <div>
              <p className="eyebrow">Details Card</p>
              <h2 className="mt-4 text-5xl sm:text-6xl">For the day</h2>
            </div>

            <div className="grid gap-5">
              <div className="accent-panel rounded-[1.6rem] p-6">
                <p className="eyebrow">Ceremony</p>
                <p className="mt-4 text-3xl">{weddingData.ceremony.time}</p>
                {ceremonyLocation ? (
                  <p className="mt-3 text-lg text-[var(--muted)]">{ceremonyLocation}</p>
                ) : null}
                {weddingData.ceremony.address?.trim() ? (
                  <p className="mt-2 text-base text-[var(--muted)]">
                    {weddingData.ceremony.address}
                  </p>
                ) : null}
              </div>

              <div className="accent-panel rounded-[1.6rem] p-6">
                <p className="eyebrow">Reception</p>
                <p className="mt-4 text-3xl">{weddingData.reception.time}</p>
                {receptionLocation ? (
                  <p className="mt-3 text-lg text-[var(--muted)]">{receptionLocation}</p>
                ) : null}
                {weddingData.reception.address?.trim() ? (
                  <p className="mt-2 text-base text-[var(--muted)]">
                    {weddingData.reception.address}
                  </p>
                ) : null}
              </div>

              <div className="accent-panel rounded-[1.6rem] p-6">
                <p className="eyebrow">{weddingData.rsvp.deadlineEyebrow || "RSVP"}</p>
                <p className="mt-4 text-3xl">{weddingData.rsvp.deadline}</p>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                  Reply and view the full wedding details online at {liveUrl}
                </p>
              </div>

              {accommodationItems.length ? (
                <div className="accent-panel rounded-[1.6rem] p-6">
                  <p className="eyebrow">Stay</p>
                  <div className="mt-4 space-y-4">
                    {accommodationItems.map((item) => (
                      <div key={`${item.name}-${item.link ?? "stay"}`}>
                        <p className="text-2xl">{item.name}</p>
                        <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {showDayTwo ? (
          <section className="invitation-print-card section-shell rounded-[2.4rem] p-10 sm:p-14 print:min-h-[10.5in] print:rounded-none print:border-0 print:shadow-none lg:col-span-2">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow">{weddingData.dayTwo?.eyebrow || "Day Two"}</p>
                <h2 className="mt-4 text-5xl sm:text-6xl">
                  {weddingData.dayTwo?.title || "Keep the celebrations going"}
                </h2>
                {weddingData.dayTwo?.description?.trim() ? (
                  <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                    {weddingData.dayTwo.description}
                  </p>
                ) : null}
              </div>
              <div className="accent-panel rounded-[1.8rem] p-8">
                {weddingData.dayTwo?.panelEyebrow?.trim() ? (
                  <p className="eyebrow">{weddingData.dayTwo.panelEyebrow}</p>
                ) : null}
                {weddingData.dayTwo?.panelTitle?.trim() ? (
                  <p className="mt-4 text-4xl">{weddingData.dayTwo.panelTitle}</p>
                ) : null}
                {weddingData.dayTwo?.details?.trim() ? (
                  <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                    {weddingData.dayTwo.details}
                  </p>
                ) : null}
                {weddingData.dayTwo?.mapLink ? (
                  <Link
                    href={weddingData.dayTwo.mapLink}
                    target="_blank"
                    className="accent-outline mt-6 inline-flex rounded-full px-5 py-3 text-sm font-medium"
                  >
                    Open in maps
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }

          body {
            background: white !important;
          }

          .invitation-print-card {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}
