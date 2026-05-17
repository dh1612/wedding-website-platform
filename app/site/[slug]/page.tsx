import { redirect } from "next/navigation";
import { WeddingSitePage } from "@/components/wedding-site-page";
import { getThemeById } from "@/lib/themes";
import { getWeddingSiteBySlug } from "@/lib/production-repositories";
import { coerceWeddingData } from "@/lib/wedding-data";

type SitePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SitePage({ params }: SitePageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord) {
    redirect("/");
  }

  const plannerSettings = (weddingRecord.plannerSettingsJson ?? {}) as {
    websiteUnlocked?: boolean;
  };
  const publicContent = weddingRecord?.liveContentJson ?? weddingRecord?.contentJson;
  const websiteUnlocked =
    typeof plannerSettings.websiteUnlocked === "boolean"
      ? plannerSettings.websiteUnlocked
      : weddingRecord.status === "live";

  if (!publicContent || weddingRecord.status !== "live" || !websiteUnlocked) {
    redirect("/");
  }

  const weddingData = coerceWeddingData(publicContent);
  const activeTheme = getThemeById(weddingData.theme);

  return (
    <WeddingSitePage
      currentPath={`/site/${slug}`}
      siteBasePath={`/site/${slug}`}
      activeTheme={activeTheme}
      weddingData={weddingData}
      conciergeApiPath={`/api/ask/${slug}`}
      rsvpApiPath={`/api/rsvp/${slug}`}
    />
  );
}
