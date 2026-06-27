import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/image-utils";
import type { WeddingData } from "@/types/wedding";
import { getWeddingData } from "@/lib/wedding-data";
import { getPreviewFallbackContent } from "@/lib/preview-fallbacks";
import { RichTextContent } from "@/components/rich-text-content";
import { SectionHeading } from "@/components/section-heading";

type GalleryRegistrySectionProps = {
  weddingData?: WeddingData;
  previewMode?: boolean;
  themeId?: string;
};

export function GalleryRegistrySection({
  weddingData,
  previewMode = false,
  themeId
}: GalleryRegistrySectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const canUseThemeFallbackImages = !weddingData;
  const fallback = previewMode ? getPreviewFallbackContent(themeId ?? wedding.theme, wedding) : null;
  const showStory = previewMode || (wedding.sectionVisibility?.story ?? true);
  const showGallery = previewMode || (wedding.sectionVisibility?.gallery ?? true);
  const showRegistry = wedding.sectionVisibility?.registry ?? true;
  const storyImages =
    wedding.story.featureImages?.length
      ? wedding.story.featureImages
      : wedding.story.featureImage
        ? [wedding.story.featureImage]
        : [];
  const previewStoryImages = storyImages.length
    ? storyImages
    : canUseThemeFallbackImages
      ? fallback?.storyImages ?? []
      : [];
  const storyParagraphs =
    wedding.story.paragraphs.length ? wedding.story.paragraphs : fallback?.storyParagraphs ?? [];
  const storyTimeline = wedding.story.timeline ?? [];
  const galleryImages =
    wedding.gallery.images.length ? wedding.gallery.images : previewMode ? previewStoryImages.slice(0, 2) : [];
  const hasStoryImage = previewStoryImages.length > 0;
  const hasGalleryImages = galleryImages.length > 0;

  if (!showStory && !showGallery && !showRegistry) {
    return null;
  }

  return (
    <section
      id="story"
      data-section="story"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
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
                        storyParagraphs.map((paragraph) => (
                          <p key={paragraph} className="prose-copy text-lg">
                            {paragraph}
                          </p>
                          ))
                      )}
                    </div>
                    {storyTimeline.length ? (
                      <div className="mt-10 rounded-[1.6rem] border border-[var(--border)] bg-white/60 px-4 py-6 sm:px-6 sm:py-8">
                        <div className="relative space-y-6 sm:space-y-7">
                          <div className="absolute bottom-2 left-[1.55rem] top-2 w-px bg-[color:var(--accent)]/25 md:left-1/2 md:-translate-x-1/2" />
                          {storyTimeline.slice(0, 6).map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                              <article
                                key={`${item.dateLabel}-${item.title}-${index}`}
                                className="relative grid gap-4 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:items-center"
                              >
                                <div
                                  className={`pl-12 md:pl-0 ${
                                    isEven ? "md:col-start-1 md:text-right" : "md:col-start-3 md:text-left"
                                  }`}
                                >
                                  <div className="accent-panel rounded-[1.35rem] px-5 py-4">
                                    <p className="eyebrow">{item.dateLabel}</p>
                                    <h3 className="mt-2 text-[1.45rem] leading-tight sm:text-[1.65rem]">
                                      {item.title}
                                    </h3>
                                    {item.note ? (
                                      <p className="prose-copy mt-2 text-base leading-7">{item.note}</p>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="absolute left-[1.05rem] top-5 z-10 md:static md:left-auto md:top-auto md:col-start-2 md:flex md:justify-center">
                                  <span className="block h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--panel)] shadow-[0_0_0_6px_rgba(255,251,245,0.96)]" />
                                </div>

                                <div
                                  className={`pl-12 md:pl-0 ${
                                    isEven ? "md:col-start-3 md:justify-self-start" : "md:col-start-1 md:justify-self-end"
                                  }`}
                                >
                                  {item.image ? (
                                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-[8px] border-white/95 shadow-[0_14px_34px_rgba(62,42,24,0.14)] sm:h-28 sm:w-28 md:h-32 md:w-32">
                                      <Image
                                        src={item.image}
                                        alt={`${item.title} photo`}
                                        fill
                                        unoptimized={shouldBypassImageOptimization(item.image)}
                                        className="object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[0.7rem] uppercase tracking-[0.22em] text-[var(--muted)] sm:h-28 sm:w-28 md:h-32 md:w-32">
                                      Moment
                                    </div>
                                  )}
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
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
                        previewStoryImages.length === 1
                          ? ""
                          : previewStoryImages.length === 2
                            ? "sm:grid-cols-2"
                            : "sm:grid-cols-[1.1fr_0.9fr]"
                      }`}
                    >
                      <div className="relative min-h-[340px] overflow-hidden rounded-[1.6rem]">
                        <Image
                          src={previewStoryImages[0]!}
                          alt={`${wedding.story.heading} image 1`}
                          fill
                          unoptimized={shouldBypassImageOptimization(previewStoryImages[0])}
                          className="object-cover"
                        />
                      </div>
                      {previewStoryImages.length > 1 ? (
                        <div className={`grid gap-4 ${previewStoryImages.length === 2 ? "" : "grid-rows-2"}`}>
                          {previewStoryImages.slice(1, 3).map((image, index) => (
                            <div
                              key={image}
                              className={`relative overflow-hidden rounded-[1.5rem] ${previewStoryImages.length === 2 ? "min-h-[340px]" : "min-h-[160px]"}`}
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
                      {galleryImages.map((image, index) => (
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
