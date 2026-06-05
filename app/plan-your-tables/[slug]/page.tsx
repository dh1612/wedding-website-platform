import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PageHero } from "@/components/page-hero";
import { PortalLockedState } from "@/components/portal-locked-state";
import { SeatingPlanner } from "@/components/seating-planner";
import { SiteFrame } from "@/components/site-frame";
import { getPortalCookieName, readPortalSessionScope } from "@/lib/portal-auth";
import { buildOperatorWeddingNavItems, buildPortalNavItems } from "@/lib/site-navigation";
import {
  getWeddingSiteBySlug,
  listPortalGuests
} from "@/lib/production-repositories";
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
  const plannerSettings = (weddingRecord.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
    portalUnlocked?: boolean;
  };
  const packageTier = plannerSettings.packageTier ?? "smart";
  const portalUnlocked = plannerSettings.portalUnlocked === true && packageTier === "premium";
  const cookieStore = await cookies();
  const sessionScope = await readPortalSessionScope(
    cookieStore.get(getPortalCookieName())?.value
  );
  const isOperatorView = sessionScope === "admin";

  if (!isOperatorView && !portalUnlocked) {
    return (
      <SiteFrame
        currentPath={`/plan-your-tables/${slug}`}
        mode="pages"
        themeId={theme.id}
        themeStyle={theme.style}
        adminView
        portalType="couple"
        weddingData={weddingData}
      >
        <PortalLockedState
          slug={slug}
          isPremiumPackage={packageTier === "premium"}
          title="The seating plan opens with the private portal"
          description="Table planning is part of the premium private planning area and unlocks after approval or payment."
        />
      </SiteFrame>
    );
  }

  const guests = await listPortalGuests(weddingRecord.id);
  const portalBasePath = `/couple-portal/${slug}`;
  const publicHomeHref = `/${slug}`;

  return (
    <SiteFrame
      currentPath={`/plan-your-tables/${slug}`}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType={isOperatorView ? "operator" : "couple"}
      adminNavItemsOverride={
        isOperatorView ? buildOperatorWeddingNavItems(slug) : buildPortalNavItems(portalBasePath)
      }
      showFooter={false}
      weddingData={weddingData}
      homeHref={isOperatorView ? publicHomeHref : portalBasePath}
    >
      <PageHero
        eyebrow="Plan Your Tables"
        title="Seating Planner Preview"
        description="A private seating workspace for this wedding. The guest list now comes from this wedding record, so you are only seeing guests tied to this couple."
        themeId={theme.id}
        weddingData={weddingData}
        summaryActionHref={isOperatorView ? publicHomeHref : portalBasePath}
        summaryActionLabel={isOperatorView ? "Open guest website" : "Back to portal home"}
        summarySecondaryActionHref={isOperatorView ? undefined : publicHomeHref}
        summarySecondaryActionLabel={isOperatorView ? undefined : "Open guest website"}
      />
      <SeatingPlanner guests={guests} tables={[]} />
    </SiteFrame>
  );
}
