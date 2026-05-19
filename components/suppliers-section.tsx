import { SectionHeading } from "@/components/section-heading";
import { getWeddingData } from "@/lib/wedding-data";
import type { WeddingData } from "@/types/wedding";

type SuppliersSectionProps = {
  weddingData?: WeddingData;
};

export function SuppliersSection({ weddingData }: SuppliersSectionProps) {
  const wedding = weddingData ?? getWeddingData();

  if (!wedding.suppliers.length) {
    return null;
  }

  return (
    <section
      id="suppliers"
      data-section="suppliers"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow={wedding.suppliersEyebrow}
            title={wedding.suppliersTitle}
            titleHtml={wedding.suppliersTitleHtml}
            description={wedding.suppliersDescription}
            descriptionHtml={wedding.suppliersDescriptionHtml}
          />
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            {wedding.suppliers.map((supplier) => (
              <article key={`${supplier.name}-${supplier.category ?? "supplier"}`} className="accent-panel rounded-[1.6rem] p-6">
                {supplier.category ? <p className="eyebrow">{supplier.category}</p> : null}
                <h3 className="mt-3 text-3xl leading-tight">{supplier.name}</h3>
                <p className="prose-copy mt-4">{supplier.note}</p>
                {supplier.link ? (
                  <a
                    href={supplier.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center rounded-full border border-[var(--border)] bg-white/80 px-5 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-white"
                  >
                    View supplier
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
