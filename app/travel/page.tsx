import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { TravelSection } from "@/components/travel-section";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type TravelPageProps = {
  searchParams?: Promise<{
    mode?: "scroll" | "pages";
    theme?: string;
  }>;
};

export default async function TravelPage({ searchParams }: TravelPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/travel"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
    >
      <PageHero
        eyebrow="Travel"
        title="Venue, Travel, And Directions"
        description="A stand-alone page for practical logistics, maps, transport, and guest directions."
        themeId={theme.id}
      />
      <TravelSection />
    </SiteFrame>
  );
}
