import { redirect } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { RSVPManager } from "@/components/rsvp-manager";
import { SiteFrame } from "@/components/site-frame";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
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
  const guests = await listPortalGuests(weddingRecord.id);
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
      portalType="operator"
      adminNavItemsOverride={buildOperatorWeddingNavItems(slug)}
      showFooter={false}
      weddingData={weddingData}
    >
      <PageHero
        eyebrow="RSVP Dashboard"
        title="Guest Responses At A Glance"
        description="Manage the guest list, review RSVP responses, and manually add or remove guests for this wedding."
        themeId={theme.id}
        weddingData={weddingData}
      />
      <RSVPManager
        guests={guests}
        apiBasePath={`/api/portal/${slug}`}
        customQuestionLabels={customQuestionLabels}
        customSelectableQuestions={customSelectableQuestions}
      />
    </SiteFrame>
  );
}
