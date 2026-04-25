import { PageHero } from "@/components/page-hero";
import { RSVPSection } from "@/components/rsvp-section";
import { SiteFrame } from "@/components/site-frame";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type RSVPPageProps = {
  searchParams?: Promise<{
    mode?: "scroll" | "pages";
    theme?: string;
  }>;
};

export default async function RSVPPage({ searchParams }: RSVPPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/rsvp"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
    >
      <PageHero
        eyebrow="RSVP"
        title="Reply In A Dedicated Section"
        description="A standalone RSVP page is often easier to share directly with guests and feels more like a traditional website flow."
        themeId={theme.id}
      />
      <RSVPSection />
    </SiteFrame>
  );
}
