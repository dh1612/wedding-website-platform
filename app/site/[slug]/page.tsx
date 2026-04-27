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

  if (!weddingRecord?.contentJson || weddingRecord.status !== "live") {
    redirect("/");
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const activeTheme = getThemeById(weddingData.theme);

  return (
    <WeddingSitePage
      currentPath={`/site/${slug}`}
      siteBasePath={`/site/${slug}`}
      activeTheme={activeTheme}
      weddingData={weddingData}
      conciergeApiPath={`/api/ask/${slug}`}
      rsvpApiPath={`/api/portal/${slug}/guests`}
    />
  );
}
