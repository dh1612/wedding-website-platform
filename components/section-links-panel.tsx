import Link from "next/link";
import { pageNavItems, buildModeHref } from "@/lib/site-navigation";

type SectionLinksPanelProps = {
  themeId: string;
};

export function SectionLinksPanel({ themeId }: SectionLinksPanelProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="space-y-4">
          <p className="eyebrow">Page Navigation</p>
          <h2 className="section-title">Prefer A Traditional Multi-Page Site?</h2>
          <p className="prose-copy text-lg">
            This version splits the wedding into separate linked sections, with a proper top navigation bar instead of one long scrolling page.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageNavItems.map((item) => (
            <Link
              key={item.path}
              href={buildModeHref(item.path, themeId, "pages")}
              className="accent-panel flex min-h-28 flex-col justify-between rounded-[1.5rem] p-5 transition hover:-translate-y-1"
            >
              <span className="eyebrow">Section</span>
              <span className="text-2xl">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
