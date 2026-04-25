import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";

type SiteFooterProps = {
  weddingData?: WeddingData;
};

export function SiteFooter({ weddingData }: SiteFooterProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <footer className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="section-shell rounded-[2rem] p-8 text-center sm:p-10">
        <p className="eyebrow">Contact</p>
        <p className="mt-4 text-2xl">{wedding.contact.email}</p>
        <p className="prose-copy mt-4">{wedding.contact.note}</p>
      </div>
    </footer>
  );
}
