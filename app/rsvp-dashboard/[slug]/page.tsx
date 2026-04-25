import { redirect } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { RSVPManager } from "@/components/rsvp-manager";
import { SiteFrame } from "@/components/site-frame";
import { buildPortalNavItems } from "@/lib/site-navigation";
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

  return (
    <SiteFrame
      currentPath={`/rsvp-dashboard/${slug}`}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      adminNavItemsOverride={buildPortalNavItems(`/couple-portal/${slug}`)}
      weddingData={weddingData}
    >
      <PageHero
        eyebrow="RSVP Dashboard"
        title="Guest Responses At A Glance"
        description="Manage the guest list, review RSVP responses, and manually add or remove guests for this wedding."
        themeId={theme.id}
      />
      <RSVPManager guests={guests} apiBasePath={`/api/portal/${slug}`} />
    </SiteFrame>
  );
}
