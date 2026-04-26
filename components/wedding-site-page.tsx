import { AccommodationSection } from "@/components/accommodation-section";
import { FAQSection } from "@/components/faq-section";
import { GalleryRegistrySection } from "@/components/gallery-registry-section";
import { HeroSection } from "@/components/hero-section";
import { RSVPSection } from "@/components/rsvp-section";
import { ScheduleSection } from "@/components/schedule-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StorySection } from "@/components/story-section";
import { TravelSection } from "@/components/travel-section";
import type { SiteMode } from "@/lib/site-navigation";
import type { ThemeDefinition } from "@/lib/themes";
import type { WeddingData } from "@/types/wedding";

type WeddingSitePageProps = {
  currentPath: string;
  siteBasePath: string;
  activeTheme: ThemeDefinition;
  weddingData: WeddingData;
  mode?: SiteMode;
  conciergeApiPath?: string;
  demoMode?: boolean;
  previewMode?: boolean;
};

export function WeddingSitePage({
  currentPath,
  siteBasePath,
  activeTheme,
  weddingData,
  mode = "scroll",
  conciergeApiPath,
  demoMode = false,
  previewMode = false
}: WeddingSitePageProps) {
  return (
    <main data-theme={activeTheme.id} style={activeTheme.style}>
      <SiteHeader
        currentPath={currentPath}
        mode={mode}
        themeId={activeTheme.id}
        siteBasePath={siteBasePath}
        allowModeToggle={false}
        weddingData={weddingData}
        returnHref={demoMode ? "/" : undefined}
        returnLabel={demoMode ? "Return to Home" : undefined}
      />
      {previewMode ? (
        <section className="mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8">
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--accent-soft)] px-6 py-5 text-sm leading-7 text-[var(--foreground)]">
            This is a private draft preview. Sample wording and details can be edited before the
            couple makes the site live for guests.
          </div>
        </section>
      ) : null}
      <HeroSection themeId={activeTheme.id} weddingData={weddingData} previewMode={previewMode} />
      <FAQSection
        weddingData={weddingData}
        conciergeApiPath={conciergeApiPath}
      />
      <StorySection weddingData={weddingData} previewMode={previewMode} />
      <ScheduleSection weddingData={weddingData} />
      <TravelSection weddingData={weddingData} />
      <AccommodationSection weddingData={weddingData} />
      <RSVPSection weddingData={weddingData} demoMode={demoMode} />
      <GalleryRegistrySection weddingData={weddingData} />
      <SiteFooter weddingData={weddingData} demoMode={demoMode} />
    </main>
  );
}
