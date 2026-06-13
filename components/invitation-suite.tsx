import Link from "next/link";
import { BRAND_DOMAIN } from "@/lib/brand";
import { getThemeById } from "@/lib/themes";
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

function splitCoupleNames(couple: string) {
  const normalized = couple.replace(/\s*&\s*/i, " and ").trim();
  const parts = normalized.split(/\s+and\s+/i).map((part) => part.trim()).filter(Boolean);

  if (parts.length >= 2) {
    return {
      first: parts[0],
      second: parts.slice(1).join(" and ")
    };
  }

  return {
    first: couple,
    second: ""
  };
}

function buildInvitationBody(weddingData: WeddingData) {
  const names = splitCoupleNames(weddingData.couple);
  const ceremonyLocation = compactLocation(weddingData.ceremony.location);
  const ceremonyAddress = compactLocation(weddingData.ceremony.address);
  const receptionLocation = compactLocation(weddingData.reception.location);
  const receptionAddress = compactLocation(weddingData.reception.address);

  return {
    names,
    ceremonyLocation,
    ceremonyAddress,
    receptionLocation,
    receptionAddress
  };
}

function hasDayTwoContent(weddingData: WeddingData) {
  return Boolean(
    (weddingData.sectionVisibility?.dayTwo ?? false) &&
      (weddingData.dayTwo?.title?.trim() ||
        weddingData.dayTwo?.panelTitle?.trim() ||
        weddingData.dayTwo?.details?.trim())
  );
}

function buildMonogram(couple: string) {
  const letters = couple
    .split(/[^A-Za-z]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");

  return letters.join(" & ");
}

export function InvitationSuite({
  slug,
  weddingData
}: InvitationSuiteProps) {
  const theme = getThemeById(weddingData.theme);
  const invitation = weddingData.invitation;
  const liveUrlDisplay = `${BRAND_DOMAIN}/${slug}`;
  const inviteDate = formatInviteDate(weddingData.date);
  const body = buildInvitationBody(weddingData);
  const showDayTwo = hasDayTwoContent(weddingData);
  const accommodationItems = weddingData.accommodation.slice(0, 2);
  const scenicInsertImage =
    weddingData.travel.sneakPeekImage ||
    weddingData.heroImage ||
    theme.detailImage ||
    theme.heroImage;
  const monogram = buildMonogram(weddingData.couple);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-8 lg:px-8">
      <div className="grid gap-8 print:grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="invitation-print-card section-shell overflow-hidden rounded-[2.6rem] p-8 sm:p-12 print:min-h-[10.5in] print:rounded-none print:border-0 print:shadow-none">
          <div className="relative min-h-[820px]">
            <div className="absolute right-0 top-0 hidden w-[48%] translate-x-4 -translate-y-4 rotate-[4deg] rounded-[1.8rem] border border-[var(--border)] bg-[var(--surface-strong)] p-3 shadow-[var(--shadow)] md:block">
              <div
                className="aspect-[1.18/0.82] rounded-[1.3rem] bg-cover bg-center"
                style={{ backgroundImage: `url(${scenicInsertImage})` }}
              />
              <p className="mt-3 text-center text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                {theme.name}
              </p>
            </div>

            <div className="relative z-10 max-w-[520px] rounded-[2rem] border border-[var(--border)] bg-white/92 px-8 py-10 shadow-[0_30px_90px_rgba(39,27,18,0.10)] sm:px-12 sm:py-14">
              <div className="text-center">
                <div className="mx-auto mb-6 h-px w-20 bg-[var(--border)]" />
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {invitation?.eyebrow || "Wedding Invitation"}
                </p>
                <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent-soft)] text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                  {monogram}
                </div>
                <p className="mt-8 text-base italic text-[var(--muted)]">{invitation?.hostLine}</p>

                <div className="mt-7 space-y-4">
                  <p
                    className="text-[clamp(2.2rem,5vw,4rem)] uppercase leading-none tracking-[0.08em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {body.names.first}
                  </p>
                  <p
                    className="text-2xl italic leading-none text-[var(--accent-strong)]"
                    style={{ fontFamily: "var(--font-script)" }}
                  >
                    and
                  </p>
                  {body.names.second ? (
                    <p
                      className="text-[clamp(2.2rem,5vw,4rem)] uppercase leading-none tracking-[0.08em]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {body.names.second}
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 space-y-3 text-[var(--muted)]">
                  <p className="text-lg italic">{invitation?.invitationLine}</p>
                  <p className="text-lg italic">{invitation?.celebrationLine}</p>
                </div>

                <div className="mt-10 space-y-3 text-lg">
                  <p>{inviteDate}</p>
                  <p>{weddingData.ceremony.time}</p>
                </div>

                <div className="mt-8 space-y-2 text-[1.05rem] leading-8 text-[var(--muted)]">
                  {body.ceremonyLocation ? <p>{body.ceremonyLocation}</p> : null}
                  {body.ceremonyAddress ? <p>{body.ceremonyAddress}</p> : null}
                </div>

                <div className="mt-10 border-t border-[var(--border)] pt-8">
                  <p className="text-sm uppercase tracking-[0.26em] text-[var(--muted)]">
                    {invitation?.receptionLine}
                  </p>
                  <div className="mt-5 space-y-2 text-[1.05rem] leading-8 text-[var(--muted)]">
                    {body.receptionLocation ? <p>{body.receptionLocation}</p> : null}
                    {body.receptionAddress ? <p>{body.receptionAddress}</p> : null}
                  </div>
                </div>

                <div className="mt-10 border-t border-[var(--border)] pt-8 text-[0.98rem] leading-8 text-[var(--muted)]">
                  <p>{invitation?.websiteLine}</p>
                  <p className="mt-2 text-[var(--foreground)]">{liveUrlDisplay}</p>
                  {weddingData.rsvp.deadline?.trim() ? (
                    <p className="mt-2">Please RSVP by {weddingData.rsvp.deadline}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8">
          <section className="invitation-print-card section-shell rounded-[2.4rem] p-8 sm:p-10 print:min-h-[4.8in] print:rounded-none print:border-0 print:shadow-none">
            <div className="mx-auto max-w-[5in] rounded-[2rem] border border-[var(--border)] bg-white/90 p-8 shadow-[0_28px_70px_rgba(39,27,18,0.08)] print:shadow-none">
              <div className="text-center">
                <p className="eyebrow">Card Format</p>
                <p
                  className="mt-6 text-[clamp(2.4rem,6vw,4.25rem)] leading-[0.96]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {weddingData.couple}
                </p>
                <p className="mt-6 text-2xl">{inviteDate}</p>
                {body.ceremonyLocation ? (
                  <p className="mt-3 text-lg leading-8 text-[var(--muted)]">
                    {body.ceremonyLocation}
                  </p>
                ) : null}
                {weddingData.rsvp.deadline?.trim() ? (
                  <div className="mt-8 border-t border-[var(--border)] pt-6">
                    <p className="eyebrow">{weddingData.rsvp.deadlineEyebrow || "RSVP"}</p>
                    <p className="mt-3 text-xl">{weddingData.rsvp.deadline}</p>
                  </div>
                ) : null}
                <div className="mt-8 border-t border-[var(--border)] pt-6">
                  <p className="eyebrow">Website</p>
                  <p className="mt-3 text-base break-words text-[var(--foreground)]">
                    {liveUrlDisplay}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="invitation-print-card section-shell rounded-[2.4rem] p-8 sm:p-10 print:min-h-[5.2in] print:rounded-none print:border-0 print:shadow-none">
            <div className="space-y-6">
              <div>
                <p className="eyebrow">Details Card</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">{invitation?.detailsCardTitle}</h2>
              </div>

              <div className="grid gap-4">
                <div className="accent-panel rounded-[1.5rem] p-5">
                  <p className="eyebrow">Ceremony</p>
                  <p className="mt-3 text-2xl">{weddingData.ceremony.time}</p>
                  {body.ceremonyLocation ? (
                    <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                      {body.ceremonyLocation}
                    </p>
                  ) : null}
                  {body.ceremonyAddress ? (
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      {body.ceremonyAddress}
                    </p>
                  ) : null}
                </div>

                <div className="accent-panel rounded-[1.5rem] p-5">
                  <p className="eyebrow">Reception</p>
                  <p className="mt-3 text-2xl">{weddingData.reception.time}</p>
                  {body.receptionLocation ? (
                    <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                      {body.receptionLocation}
                    </p>
                  ) : null}
                  {body.receptionAddress ? (
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      {body.receptionAddress}
                    </p>
                  ) : null}
                </div>

                {accommodationItems.length ? (
                  <div className="accent-panel rounded-[1.5rem] p-5">
                    <p className="eyebrow">{invitation?.stayTitle}</p>
                    <div className="mt-3 space-y-3">
                      {accommodationItems.map((item) => (
                        <div key={`${item.name}-${item.link ?? "stay"}`}>
                          <p className="text-lg">{item.name}</p>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
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
        </div>

        {showDayTwo ? (
          <section className="invitation-print-card section-shell rounded-[2.4rem] p-10 sm:p-12 print:min-h-[6in] print:rounded-none print:border-0 print:shadow-none lg:col-span-2">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <p className="eyebrow">{weddingData.dayTwo?.eyebrow || "Day Two"}</p>
                <h2 className="mt-4 text-5xl sm:text-6xl">
                  {weddingData.dayTwo?.title || invitation?.dayTwoTitle || "Keep the celebrations going"}
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
