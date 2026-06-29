import type { Metadata } from "next";
import { FAQSection } from "@/components/faq-section";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { BRAND_NAME } from "@/lib/brand";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

export const metadata: Metadata = {
  title: `Wedding Website FAQs | ${BRAND_NAME}`,
  description:
    "See the kinds of practical questions wedding guests often ask and how Crafted Wedding Sites keeps guest information clear and easy to find."
};

type FAQPageProps = {
  searchParams?: Promise<{
    mode?: "scroll" | "pages";
    theme?: string;
  }>;
};

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath="/faq"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
    >
      <PageHero
        eyebrow="FAQ"
        title="Questions Guests Ask Most"
        description="This page keeps practical guest answers together and works especially well when the AI concierge is enabled."
        themeId={theme.id}
      />
      <FAQSection />
    </SiteFrame>
  );
}
