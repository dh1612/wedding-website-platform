import Link from "next/link";
import type { Route } from "next";
import { WeddingSitePage } from "@/components/wedding-site-page";
import {
  getPackageDisplayName,
  getPackageDisplayPrice,
  getPackagePaymentLink
} from "@/lib/payment";
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
  const packageName = getPackageDisplayName(packageTier);
  const packagePrice = getPackageDisplayPrice(packageTier);
  const paymentLink = getPackagePaymentLink(packageTier);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8">
        <div className="rounded-[1.8rem] border border-black/8 bg-[#17313c] px-6 py-5 text-white shadow-[0_18px_60px_rgba(23,49,60,0.16)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/65">
                Private Review
              </p>
              <h1 className="mt-2 text-3xl">
                {weddingRecord.title}
              </h1>
              <p className="mt-2 text-sm text-white/75">
                This first draft is here to show the direction of your website. Sample content may
                appear where details are still missing.
              </p>
              <div className="mt-4 rounded-[1.1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm leading-6 text-white/78">
                <span className="font-medium text-white">{packageName}</span>
                {packagePrice ? ` · ${packagePrice}` : ""}. If the direction feels right, use the
                booking link below and we&apos;ll refine the content and style together before
                anything goes live.
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:max-w-[30rem] lg:justify-end">
              {packageTier === "premium" ? (
                <Link
                  href="/couple-area/demo"
                  className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
                >
                  View Couple Portal Demo Area
                </Link>
              ) : null}
              <Link
                href={`/unlock/${slug}`}
                className="rounded-full border border-white/18 bg-white px-5 py-3 text-sm font-medium text-[#17313c]"
              >
                {paymentLink ? "Continue If You'd Like To Proceed" : "Ask About Next Steps"}
              </Link>
              {weddingRecord.status === "live" ? (
                <Link
                  href={`/${slug}` as Route}
                  className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
                >
                  Open Public Website
                </Link>
              ) : null}
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
