import Image from "next/image";
import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { SectionHeading } from "@/components/section-heading";

type GalleryRegistrySectionProps = {
  weddingData?: WeddingData;
};

export function GalleryRegistrySection({
  weddingData
}: GalleryRegistrySectionProps) {
  const wedding = weddingData ?? getWeddingData();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow="Gallery"
            title={wedding.gallery.heading}
            description={wedding.gallery.description}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {wedding.gallery.images.map((image, index) => (
              <div
                key={image}
                className="relative min-h-[220px] overflow-hidden rounded-[1.5rem]"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10">
          <SectionHeading
            eyebrow="Registry"
            title="Gifts & Kind Wishes"
            description={wedding.registry.message}
          />
          <div className="mt-8 space-y-4">
            {wedding.registry.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[1.5rem] border border-[var(--border)] bg-white/75 px-5 py-4 transition hover:bg-white"
              >
                <span>{link.label}</span>
                <span className="text-sm text-[var(--accent)]">Open</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
