import { AccommodationSection } from "@/components/accommodation-section";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type StayPageProps = {
  searchParams?: Promise<{
    mode?: "scroll" | "pages";
    theme?: string;
  }>;
};

export default async function StayPage({ searchParams }: StayPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/stay"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
    >
      <PageHero
        eyebrow="Accommodation"
        title="Where To Stay"
        description="A separate accommodation page is useful for guests booking rooms from mobile while travelling."
        themeId={theme.id}
      />
      <AccommodationSection />
    </SiteFrame>
  );
}
