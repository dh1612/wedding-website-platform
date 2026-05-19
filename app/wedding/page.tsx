import { WeddingSitePage } from "@/components/wedding-site-page";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type WeddingPageProps = {
  searchParams?: Promise<{
    theme?: string;
    sample?: string;
  }>;
};

export default async function WeddingPage({ searchParams }: WeddingPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const wedding = getWeddingData(params?.sample);
  const activeTheme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <WeddingSitePage
      currentPath="/wedding"
      siteBasePath="/wedding"
      activeTheme={activeTheme}
      weddingData={wedding}
      demoMode
    />
  );
}
