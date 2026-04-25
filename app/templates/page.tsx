import { TemplateBrowserPage } from "@/components/template-browser-page";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";
import type { SiteMode } from "@/lib/site-navigation";

type TemplatesPageProps = {
  searchParams?: Promise<{
    mode?: SiteMode;
    theme?: string;
  }>;
};

export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const activeTheme = getThemeById(params?.theme ?? wedding.theme);
  const mode = params?.mode === "pages" ? "pages" : "scroll";

  return <TemplateBrowserPage activeTheme={activeTheme} mode={mode} />;
}
