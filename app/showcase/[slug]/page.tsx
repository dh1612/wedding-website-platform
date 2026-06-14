import { redirect } from "next/navigation";
import { WeddingSitePage } from "@/components/wedding-site-page";
import { getWeddingSiteBySlug } from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";
import type { WeddingData } from "@/types/wedding";

type ShowcaseWeddingBySlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function buildShowcaseWeddingData(weddingData: WeddingData): WeddingData {
  return {
    ...weddingData,
    hero: {
      eyebrow: weddingData.hero?.eyebrow ?? "Wedding Day",
      previewNote:
        weddingData.hero?.previewNote ??
        "This showcase version is here to share the look and feel of the website safely.",
      primaryActionLabel: "Wedding Details",
      primaryActionHref: "#faq",
      secondaryActionLabel: "Travel & Stay",
      secondaryActionHref: "#travel"
    },
    rsvp: {
      ...weddingData.rsvp,
      interactiveFormEnabled: false,
      label: "Website Enquiries",
      description:
        "This showcase version is shared for design inspiration only, so guest reply handling is not active on this page.",
      panelDescription:
        "The live couple website includes a tailored RSVP setup, but public showcase links keep that part switched off for privacy."
    },
    aiConciergeEnabled: false,
    sectionVisibility: {
      heroEyebrow: weddingData.sectionVisibility?.heroEyebrow ?? true,
      date: weddingData.sectionVisibility?.date ?? true,
      locationSummary: weddingData.sectionVisibility?.locationSummary ?? true,
      tagline: weddingData.sectionVisibility?.tagline ?? true,
      announcement: weddingData.sectionVisibility?.announcement ?? true,
      heroActions: weddingData.sectionVisibility?.heroActions ?? true,
      previewNote: weddingData.sectionVisibility?.previewNote ?? true,
      schedule: weddingData.sectionVisibility?.schedule ?? true,
      travel: weddingData.sectionVisibility?.travel ?? true,
      ceremonyCard: weddingData.sectionVisibility?.ceremonyCard ?? true,
      receptionCard: weddingData.sectionVisibility?.receptionCard ?? true,
      transportCard: weddingData.sectionVisibility?.transportCard ?? true,
      directionsCard: weddingData.sectionVisibility?.directionsCard ?? true,
      relaxedNote: weddingData.sectionVisibility?.relaxedNote ?? true,
      accommodation: weddingData.sectionVisibility?.accommodation ?? true,
      suppliers: weddingData.sectionVisibility?.suppliers ?? false,
      dayTwo: weddingData.sectionVisibility?.dayTwo ?? false,
      story: weddingData.sectionVisibility?.story ?? true,
      gallery: weddingData.sectionVisibility?.gallery ?? true,
      registry: weddingData.sectionVisibility?.registry ?? true,
      rsvp: false,
      faq: weddingData.sectionVisibility?.faq ?? true,
      aiConcierge: false
    }
  };
}

export default async function ShowcaseWeddingBySlugPage({
  params
}: ShowcaseWeddingBySlugPageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord) {
    redirect("/");
  }

  const plannerSettings = (weddingRecord.plannerSettingsJson ?? {}) as {
    websiteUnlocked?: boolean;
  };
  const publicContent = weddingRecord.liveContentJson ?? weddingRecord.contentJson;
  const websiteUnlocked =
    typeof plannerSettings.websiteUnlocked === "boolean"
      ? plannerSettings.websiteUnlocked
      : weddingRecord.status === "live";

  if (!publicContent || weddingRecord.status !== "live" || !websiteUnlocked) {
    redirect("/");
  }

  const weddingData = buildShowcaseWeddingData(coerceWeddingData(publicContent));
  const activeTheme = getThemeById(weddingData.theme);

  return (
    <WeddingSitePage
      currentPath={`/showcase/${slug}`}
      siteBasePath={`/showcase/${slug}`}
      activeTheme={activeTheme}
      weddingData={weddingData}
    />
  );
}
