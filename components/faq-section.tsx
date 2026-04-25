import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";
import { ConciergeCard } from "@/components/concierge-card";

type FAQSectionProps = {
  weddingData?: WeddingData;
  conciergeApiPath?: string;
};

export function FAQSection({
  weddingData,
  conciergeApiPath
}: FAQSectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-8">
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions Guests Usually Ask"
              description="A quick place to check the details guests usually want before travelling."
            />
          </div>
          {wedding.aiConciergeEnabled ? (
            <ConciergeCard apiPath={conciergeApiPath} />
          ) : null}
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <div className="space-y-4">
            {wedding.faq.map((item) => (
              <details
                key={item.q}
                className="rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5 open:bg-[var(--accent-soft)]"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold">
                  {item.q}
                </summary>
                <p className="prose-copy mt-3 pr-5">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
