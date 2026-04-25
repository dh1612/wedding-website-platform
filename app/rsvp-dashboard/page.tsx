import { RSVPManager } from "@/components/rsvp-manager";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import {
  ensurePortalWedding,
  listPortalGuests
} from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type RSVPDashboardPageProps = {
  searchParams?: Promise<{
    theme?: string;
  }>;
};

export default async function RSVPDashboardPage({
  searchParams
}: RSVPDashboardPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);
  const portalWedding = await ensurePortalWedding();
  const guests = await listPortalGuests(portalWedding.id);

  return (
    <SiteFrame
      currentPath="/rsvp-dashboard"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
    >
      <PageHero
        eyebrow="RSVP Dashboard"
        title="Guest Responses At A Glance"
        description="Manage the guest list, review RSVP responses, and manually add or remove guests from the portal."
        themeId={theme.id}
      />
      <RSVPManager guests={guests} />
    </SiteFrame>
  );
}
