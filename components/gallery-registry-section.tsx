import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/image-utils";
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
  const storyImages =
    wedding.story.featureImages?.length
      ? wedding.story.featureImages
      : wedding.story.featureImage
        ? [wedding.story.featureImage]
        : [];
  const hasStoryImage = storyImages.length > 0;
  const hasGalleryImages = wedding.gallery.images.length > 0;

  if (!showStory && !showGallery && !showRegistry) {
    return null;
  }

  return (
    <section id="story" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
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
                      titleHtml={wedding.story.headingHtml}
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
                    titleHtml={wedding.gallery.headingHtml}
                    description={wedding.gallery.description}
                    descriptionHtml={wedding.gallery.descriptionHtml}
                  />
                )}
              </div>
              {(hasStoryImage || (showGallery && hasGalleryImages)) ? (
                <div>
                  {hasStoryImage ? (
                    <div
                      className={`grid gap-4 ${
                        storyImages.length === 1
                          ? ""
                          : storyImages.length === 2
                            ? "sm:grid-cols-2"
                            : "sm:grid-cols-[1.1fr_0.9fr]"
                      }`}
                    >
                      <div className="relative min-h-[340px] overflow-hidden rounded-[1.6rem]">
                        <Image
                          src={storyImages[0]!}
                          alt={`${wedding.story.heading} image 1`}
                          fill
                          unoptimized={shouldBypassImageOptimization(storyImages[0])}
                          className="object-cover"
                        />
                      </div>
                      {storyImages.length > 1 ? (
                        <div className={`grid gap-4 ${storyImages.length === 2 ? "" : "grid-rows-2"}`}>
                          {storyImages.slice(1, 3).map((image, index) => (
                            <div
                              key={image}
                              className={`relative overflow-hidden rounded-[1.5rem] ${storyImages.length === 2 ? "min-h-[340px]" : "min-h-[160px]"}`}
                            >
                              <Image
                                src={image}
                                alt={`${wedding.story.heading} image ${index + 2}`}
                                fill
                                unoptimized={shouldBypassImageOptimization(image)}
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {showGallery && hasGalleryImages ? (
                    <div className={`grid gap-4 ${hasStoryImage ? "mt-4 sm:grid-cols-2" : "mt-1 sm:grid-cols-3"}`}>
                      {wedding.gallery.images.map((image, index) => (
                        <div
                          key={image}
                          className="relative min-h-[220px] overflow-hidden rounded-[1.5rem]"
                        >
                          <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            unoptimized={shouldBypassImageOptimization(image)}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
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
