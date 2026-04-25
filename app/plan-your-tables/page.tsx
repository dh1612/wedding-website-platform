import { PageHero } from "@/components/page-hero";
import { SeatingPlanner } from "@/components/seating-planner";
import { SiteFrame } from "@/components/site-frame";
import { getThemeById } from "@/lib/themes";
import { mockGuests, sampleTables } from "@/lib/mock-wedding-ops";
import { getWeddingData } from "@/lib/wedding-data";

type PlanYourTablesPageProps = {
  searchParams?: Promise<{
    theme?: string;
  }>;
};

export default async function PlanYourTablesPage({
  searchParams
}: PlanYourTablesPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/plan-your-tables"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
    >
      <PageHero
        eyebrow="Plan Your Tables"
        title="Seating Planner Preview"
        description="A visual planning workspace for 150 guests. This is mock data for now, but it shows how the planner could look once saved seating progress is backed by a database."
        themeId={theme.id}
      />
      <SeatingPlanner guests={mockGuests} tables={sampleTables} />
    </SiteFrame>
  );
}
