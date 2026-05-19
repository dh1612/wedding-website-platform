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
    <section
      id="rsvp"
      data-section="rsvp"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow={wedding.rsvp.eyebrow}
            title={wedding.rsvp.title}
            titleHtml={wedding.rsvp.titleHtml}
            description={
              demoMode
                ? "In the finished version, this becomes the couple's RSVP form and response flow, shaped around exactly what they want guests to answer."
                : wedding.rsvp.description
            }
            descriptionHtml={demoMode ? undefined : wedding.rsvp.descriptionHtml}
          />
          <div className="accent-panel rounded-[1.75rem] p-8">
            {wedding.rsvp.deadlineEyebrow ? <p className="eyebrow">{wedding.rsvp.deadlineEyebrow}</p> : null}
            {demoMode ? <p className="mt-3 text-3xl">Set around the couple&apos;s plans</p> : wedding.rsvp.deadline ? <p className="mt-3 text-3xl">{wedding.rsvp.deadline}</p> : null}
            {demoMode ? (
              <p className="prose-copy mt-4">
                This section can collect attendance, dietary notes, travel updates, and anything else the couple wants included in their guest response form.
              </p>
            ) : wedding.rsvp.panelDescriptionHtml ? (
              <div
                className="rich-text-content prose-copy mt-4"
                dangerouslySetInnerHTML={{ __html: wedding.rsvp.panelDescriptionHtml }}
              />
            ) : (
              wedding.rsvp.panelDescription ? (
                <p className="prose-copy mt-4">{wedding.rsvp.panelDescription}</p>
              ) : null
            )}
            {showInteractiveForm && rsvpApiPath ? (
              <div className="mt-6">
                <PublicRSVPForm
                  apiPath={rsvpApiPath}
                  previewMode={previewMode}
                  formConfig={wedding.rsvp.form}
                />
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
