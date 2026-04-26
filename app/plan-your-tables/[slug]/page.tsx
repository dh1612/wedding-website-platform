import { redirect } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SeatingPlanner } from "@/components/seating-planner";
import { SiteFrame } from "@/components/site-frame";
import { mockGuests, sampleTables } from "@/lib/mock-wedding-ops";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
import { getWeddingSiteBySlug } from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type PlanYourTablesBySlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PlanYourTablesBySlugPage({
  params
}: PlanYourTablesBySlugPageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord?.contentJson) {
    redirect("/");
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const theme = getThemeById(weddingData.theme);

  return (
    <SiteFrame
      currentPath={`/plan-your-tables/${slug}`}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="operator"
      adminNavItemsOverride={buildOperatorWeddingNavItems(slug)}
      showFooter={false}
      weddingData={weddingData}
    >
      <PageHero
        eyebrow="Plan Your Tables"
        title="Seating Planner Preview"
        description="A private seating workspace for this wedding. The room builder is still using preview data, but the portal link is now tied to the correct couple."
        themeId={theme.id}
      />
      <SeatingPlanner guests={mockGuests} tables={sampleTables} />
    </SiteFrame>
  );
}
