import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeddingSitePage } from "@/components/wedding-site-page";
import {
  getPrivateVenuePreviewPageData,
  privateVenuePreviewSlugs
} from "@/lib/private-venue-previews";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return privateVenuePreviewSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getPrivateVenuePreviewPageData(slug);

  if (!pageData) {
    return {
      title: "Private venue preview",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  return {
    title: pageData.metadataTitle,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function PrivateVenuePreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = getPrivateVenuePreviewPageData(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <WeddingSitePage
      currentPath={pageData.routePath}
      siteBasePath={pageData.routePath}
      activeTheme={pageData.theme}
      weddingData={pageData.weddingData}
    />
  );
}
