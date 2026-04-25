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
};

export function WeddingSitePage({
  currentPath,
  siteBasePath,
  activeTheme,
  weddingData,
  mode = "scroll",
  conciergeApiPath
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
      />
      <HeroSection themeId={activeTheme.id} weddingData={weddingData} />
      <StorySection weddingData={weddingData} />
      <ScheduleSection weddingData={weddingData} />
      <TravelSection weddingData={weddingData} />
      <AccommodationSection weddingData={weddingData} />
      <FAQSection
        weddingData={weddingData}
        conciergeApiPath={conciergeApiPath}
      />
      <RSVPSection weddingData={weddingData} />
      <GalleryRegistrySection weddingData={weddingData} />
      <SiteFooter weddingData={weddingData} />
    </main>
  );
}
