import Link from "next/link";
import { WeddingSitePage } from "@/components/wedding-site-page";
import { getThemeById } from "@/lib/themes";
import {
  getWeddingSiteBySlug
} from "@/lib/production-repositories";
import { coerceWeddingData } from "@/lib/wedding-data";
import { redirect } from "next/navigation";

type PreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord?.contentJson) {
    redirect("/");
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const activeTheme = getThemeById(weddingData.theme);
  const plannerSettings = (weddingRecord.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
  };
  const packageTier = plannerSettings.packageTier ?? "smart";

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8">
        <div className="rounded-[1.8rem] border border-black/8 bg-[#17313c] px-6 py-5 text-white shadow-[0_18px_60px_rgba(23,49,60,0.16)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/65">
                Private Review
              </p>
              <h1 className="mt-2 text-3xl">
                {weddingRecord.title}
              </h1>
              <p className="mt-2 text-sm text-white/75">
                This page is a private draft for review only. Going live is handled from the
                operator admin area after approval and payment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {packageTier === "premium" ? (
                <Link
                  href={`/couple-portal?theme=${activeTheme.id}`}
                  className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
                >
                  View Couple Portal Demo Area
                </Link>
              ) : (
                <div className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm text-white/72">
                  Private couple portal is a premium-only feature
                </div>
              )}
              <Link
                href={`/unlock/${slug}`}
                className="rounded-full border border-white/18 bg-white px-5 py-3 text-sm font-medium text-[#17313c]"
              >
                Unlock My Website
              </Link>
              {weddingRecord.status === "live" ? (
                <Link
                  href={`/site/${slug}`}
                  className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
                >
                  Open Public Website
                </Link>
              ) : (
                <div className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm text-white/72">
                  The shareable guest link appears after you unlock and publish it from admin
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <WeddingSitePage
        currentPath={`/preview/${slug}`}
        siteBasePath={`/preview/${slug}`}
        activeTheme={activeTheme}
        weddingData={weddingData}
        conciergeApiPath={`/api/ask/${slug}`}
        rsvpApiPath={`/api/rsvp/${slug}`}
        previewMode
      />
    </>
  );
}
