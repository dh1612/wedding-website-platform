import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PageHero } from "@/components/page-hero";
import { PortalLockedState } from "@/components/portal-locked-state";
import { RSVPManager } from "@/components/rsvp-manager";
import { SiteFrame } from "@/components/site-frame";
import { getPortalCookieName, readPortalSessionScope } from "@/lib/portal-auth";
import { buildOperatorWeddingNavItems, buildPortalNavItems } from "@/lib/site-navigation";
import {
  getWeddingSiteBySlug,
  listPortalGuests
} from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type RSVPDashboardBySlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RSVPDashboardBySlugPage({
  params
}: RSVPDashboardBySlugPageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord?.id || !weddingRecord.contentJson) {
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
        currentPath={`/rsvp-dashboard/${slug}`}
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
          title="RSVP tools unlock with the private portal"
          description="Guest reply management is part of the private planning area and is only opened once that portal has been unlocked."
        />
      </SiteFrame>
    );
  }

  const guests = await listPortalGuests(weddingRecord.id);
  const portalBasePath = `/couple-portal/${slug}`;
  const publicHomeHref = `/${slug}`;
  const customQuestionLabels = Object.fromEntries(
    (weddingData.rsvp.form?.customQuestions ?? []).map((question) => [
      question.id,
      question.label
    ])
  );
  const customSelectableQuestions = (weddingData.rsvp.form?.customQuestions ?? []).filter(
    (question) => question.type === "select" || question.type === "multiselect"
  );

  return (
    <SiteFrame
      currentPath={`/rsvp-dashboard/${slug}`}
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
        eyebrow="RSVP Dashboard"
        title="Guest Responses At A Glance"
        description="Manage the guest list, review RSVP responses, and manually add or remove guests for this wedding."
        themeId={theme.id}
        weddingData={weddingData}
        summaryActionHref={isOperatorView ? publicHomeHref : portalBasePath}
        summaryActionLabel={isOperatorView ? "Open guest website" : "Back to portal home"}
        summarySecondaryActionHref={isOperatorView ? undefined : publicHomeHref}
        summarySecondaryActionLabel={isOperatorView ? undefined : "Open guest website"}
      />
      <RSVPManager
        guests={guests}
        apiBasePath={`/api/portal/${slug}`}
        customQuestionLabels={customQuestionLabels}
        customSelectableQuestions={customSelectableQuestions}
        showMealChoice={weddingData.rsvp.form?.enableMealChoice ?? true}
      />
    </SiteFrame>
  );
}
