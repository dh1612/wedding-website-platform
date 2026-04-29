import Image from "next/image";
import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";

type GalleryRegistrySectionProps = {
  weddingData?: WeddingData;
};

export function GalleryRegistrySection({
  weddingData
}: GalleryRegistrySectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const showStory = wedding.sectionVisibility?.story ?? true;
  const showGallery = wedding.sectionVisibility?.gallery ?? true;
  const showRegistry = wedding.sectionVisibility?.registry ?? true;

  if (!showStory && !showGallery && !showRegistry) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
      <div className="space-y-8">
        {(showStory || showGallery) ? (
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-5">
                {showStory ? (
                  <>
                    <SectionHeading
                      eyebrow="Our Story"
                      title={wedding.story.heading}
                      description="A few favourite moments and a little of the story behind the day."
                    />
                    <div className="space-y-4">
                      {wedding.story.html ? (
                        <RichTextContent html={wedding.story.html} className="text-lg leading-8" />
                      ) : (
                        wedding.story.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="prose-copy text-lg">
                            {paragraph}
                          </p>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <SectionHeading
                    eyebrow="Gallery"
                    title={wedding.gallery.heading}
                    description={wedding.gallery.description}
                  />
                )}
              </div>
              {showGallery ? (
                <div>
                  <div className="mt-1 grid gap-4 sm:grid-cols-3">
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
              ) : null}
            </div>
          </div>
        ) : null}
        {showRegistry ? (
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <SectionHeading
              eyebrow="Registry"
              title="Gifts & Kind Wishes"
              description={wedding.registry.message}
            />
            <div className="mt-8 space-y-4">
              {wedding.registry.links.length ? (
                wedding.registry.links.map((link) => (
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
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 px-5 py-4 text-sm leading-6 text-[var(--muted)]">
                  Registry details can be added here if the couple would like to include them.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
