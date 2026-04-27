import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";
import { PublicRSVPForm } from "@/components/public-rsvp-form";

type RSVPSectionProps = {
  weddingData?: WeddingData;
  demoMode?: boolean;
  previewMode?: boolean;
  rsvpApiPath?: string;
};

export function RSVPSection({
  weddingData,
  demoMode = false,
  previewMode = false,
  rsvpApiPath
}: RSVPSectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const showInteractiveForm = Boolean(rsvpApiPath) && !demoMode;

  return (
    <section id="rsvp" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="RSVP"
            title="Let Us Know If You Can Make It"
            description={
              demoMode
                ? "In the finished version, this becomes the couple's RSVP form and response flow, shaped around exactly what they want guests to answer."
                : wedding.rsvp.description
            }
          />
          <div className="accent-panel rounded-[1.75rem] p-8">
            <p className="eyebrow">Deadline</p>
            <p className="mt-3 text-3xl">{demoMode ? "Set around the couple's plans" : wedding.rsvp.deadline}</p>
            <p className="prose-copy mt-4">
              {showInteractiveForm
                ? "Guests can reply here with the standard wedding details you would usually need, including attendance, dietary requirements, and optional notes."
                : demoMode
                ? "This section can collect attendance, dietary notes, travel updates, and anything else the couple wants included in their guest response form."
                : "Use this section for final guest updates, questions, or any last-minute changes before the wedding."}
            </p>
            {showInteractiveForm && rsvpApiPath ? (
              <div className="mt-6">
                <PublicRSVPForm apiPath={rsvpApiPath} previewMode={previewMode} />
              </div>
            ) : demoMode ? (
              <div className="mt-6 rounded-[1.2rem] border border-[var(--border)] bg-white/65 px-5 py-4 text-sm leading-6 text-[var(--muted)]">
                Example only: the final RSVP form and wording are prepared around the couple's guest list and preferences.
              </div>
            ) : (
              <a
                href={wedding.rsvp.url}
                target="_blank"
                rel="noreferrer"
                className="accent-button mt-6 inline-flex rounded-full px-6 py-3 text-sm font-medium"
              >
                {wedding.rsvp.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
