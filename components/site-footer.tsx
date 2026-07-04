import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";

type SiteFooterProps = {
  weddingData?: WeddingData;
  demoMode?: boolean;
};

export function SiteFooter({ weddingData, demoMode = false }: SiteFooterProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <footer className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="section-shell rounded-[2rem] p-8 text-center sm:p-10">
        <p className="eyebrow">Contact</p>
        <p className="mt-4 break-all text-xl sm:text-2xl">
          {demoMode ? "yourwedding@example.com" : wedding.contact.email}
        </p>
        <p className="prose-copy mt-4">
          {demoMode
            ? "In the finished version, this area can point guests to the couple's preferred contact route for travel questions, updates, or RSVP support."
            : wedding.contact.note}
        </p>
        {!demoMode && wedding.contact.footerLine ? (
          <p className="mt-4 text-sm tracking-[0.12em] text-[var(--muted)]">
            {wedding.contact.footerLine}
          </p>
        ) : null}
        {!demoMode && wedding.contact.legalNote ? (
          <p className="prose-copy mt-4 text-sm leading-6 text-[var(--muted)]">
            {wedding.contact.legalNote}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
