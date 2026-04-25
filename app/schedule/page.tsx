import { PageHero } from "@/components/page-hero";
import { ScheduleSection } from "@/components/schedule-section";
import { SiteFrame } from "@/components/site-frame";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type SchedulePageProps = {
  searchParams?: Promise<{
    mode?: "scroll" | "pages";
    theme?: string;
  }>;
};

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/schedule"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
    >
      <PageHero
        eyebrow="Schedule"
        title="The Plan For The Day"
        description="This route-based layout makes the timeline easier to reference quickly from the top navigation."
        themeId={theme.id}
      />
      <ScheduleSection />
    </SiteFrame>
  );
}
