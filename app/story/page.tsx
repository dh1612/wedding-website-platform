import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { StorySection } from "@/components/story-section";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type StoryPageProps = {
  searchParams?: Promise<{
    mode?: "scroll" | "pages";
    theme?: string;
  }>;
};

export default async function StoryPage({ searchParams }: StoryPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/story"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
    >
      <PageHero
        eyebrow="Our Story"
        title="How It All Began"
        description="A dedicated page for the couple's story, ideal for guests who prefer to click through a site rather than scroll through one long page."
        themeId={theme.id}
      />
      <StorySection />
    </SiteFrame>
  );
}
