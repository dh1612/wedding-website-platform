import { AccommodationSection } from "@/components/accommodation-section";
import { DayTwoSection } from "@/components/day-two-section";
import { FAQSection } from "@/components/faq-section";
import { GalleryRegistrySection } from "@/components/gallery-registry-section";
import { HeroSection } from "@/components/hero-section";
import { RSVPSection } from "@/components/rsvp-section";
import { ScheduleSection } from "@/components/schedule-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SuppliersSection } from "@/components/suppliers-section";
import { TravelSection } from "@/components/travel-section";
import { getFontPresetById } from "@/lib/font-presets";
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
  rsvpApiPath?: string;
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
  rsvpApiPath,
  demoMode = false,
  previewMode = false
}: WeddingSitePageProps) {
  const fontPresetStyle = getFontPresetById(weddingData.fontPreset).style;
  const previewContext = previewMode ? "draft" : demoMode ? "sample" : "live";
  const visibility = weddingData.sectionVisibility;
  const showTravel = previewMode || (visibility?.travel ?? true);
  const showAccommodation = previewMode || (visibility?.accommodation ?? true);
  const showSchedule = previewMode || (visibility?.schedule ?? true);
  const showDayTwo = visibility?.dayTwo ?? false;
  const showRsvp = previewMode || (visibility?.rsvp ?? true);
  const showSuppliers = visibility?.suppliers ?? false;

  return (
    <main
      data-theme={activeTheme.id}
      data-preview-context={previewContext}
      style={{ ...activeTheme.style, ...fontPresetStyle }}
    >
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
            Private preview: this first draft shows the direction of your website. Sample content
            may appear where details are still missing. If you&apos;d like to proceed, use the booking
            link below and we&apos;ll refine everything together before the guest version goes live.
          </div>
        </section>
      ) : null}
      <HeroSection themeId={activeTheme.id} weddingData={weddingData} previewMode={previewMode} />
      {showTravel ? (
        <TravelSection
          weddingData={weddingData}
          previewMode={previewMode}
          themeId={activeTheme.id}
        />
      ) : null}
      {showAccommodation ? (
        <AccommodationSection
          weddingData={weddingData}
          previewMode={previewMode}
          themeId={activeTheme.id}
        />
      ) : null}
      {showSchedule ? (
        <ScheduleSection
          weddingData={weddingData}
          previewMode={previewMode}
          themeId={activeTheme.id}
        />
      ) : null}
      {showDayTwo ? (
        <DayTwoSection weddingData={weddingData} />
      ) : null}
      {showRsvp ? (
        <RSVPSection
          weddingData={weddingData}
          demoMode={demoMode}
          previewMode={previewMode}
          rsvpApiPath={rsvpApiPath}
          themeId={activeTheme.id}
        />
      ) : null}
      {showSuppliers ? (
        <SuppliersSection weddingData={weddingData} />
      ) : null}
      <GalleryRegistrySection
        weddingData={weddingData}
        previewMode={previewMode}
        themeId={activeTheme.id}
      />
      <FAQSection
        weddingData={weddingData}
        conciergeApiPath={conciergeApiPath}
        previewMode={previewMode}
        themeId={activeTheme.id}
      />
      <SiteFooter weddingData={weddingData} demoMode={demoMode} />
    </main>
  );
}
