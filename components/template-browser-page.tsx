import { AccommodationSection } from "@/components/accommodation-section";
import { FAQSection } from "@/components/faq-section";
import { GalleryRegistrySection } from "@/components/gallery-registry-section";
import { HeroSection } from "@/components/hero-section";
import { RSVPSection } from "@/components/rsvp-section";
import { ScheduleSection } from "@/components/schedule-section";
import { SectionLinksPanel } from "@/components/section-links-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StorySection } from "@/components/story-section";
import { ThemeShowcase } from "@/components/theme-showcase";
import { TravelSection } from "@/components/travel-section";
import type { SiteMode } from "@/lib/site-navigation";
import type { ThemeDefinition } from "@/lib/themes";

type TemplateBrowserPageProps = {
  activeTheme: ThemeDefinition;
  mode: SiteMode;
};

export function TemplateBrowserPage({
  activeTheme,
  mode
}: TemplateBrowserPageProps) {
  return (
    <main data-theme={activeTheme.id} style={activeTheme.style}>
      <SiteHeader currentPath="/templates" mode={mode} themeId={activeTheme.id} />
      <HeroSection themeId={activeTheme.id} />
      <ThemeShowcase activeThemeId={activeTheme.id} />
      {mode === "pages" ? (
        <>
          <SectionLinksPanel themeId={activeTheme.id} />
          <GalleryRegistrySection />
          <SiteFooter />
        </>
      ) : (
        <>
          <StorySection />
          <ScheduleSection />
          <TravelSection />
          <AccommodationSection />
          <FAQSection />
          <RSVPSection />
          <GalleryRegistrySection />
          <SiteFooter />
        </>
      )}
    </main>
  );
}
