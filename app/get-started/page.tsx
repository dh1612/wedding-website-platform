import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ClientIntakeForm } from "@/components/client-intake-form";
import { MarketingFooter } from "@/components/marketing-footer";
import { BRAND_NAME, buildSampleWebsiteHref } from "@/lib/brand";
import type { IntakePackage } from "@/lib/intake";

export const metadata: Metadata = {
  title: `Start Your Wedding Website | ${BRAND_NAME}`,
  description:
    "Start your wedding website with Crafted Wedding Sites. Share the essentials and receive a polished first draft with guided, done-for-you support."
};

type GetStartedPageProps = {
  searchParams?: Promise<{
    package?: IntakePackage;
  }>;
};

export default async function GetStartedPage({
  searchParams
}: GetStartedPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const packageTier =
    params?.package === "basic" ||
    params?.package === "smart" ||
    params?.package === "premium"
      ? params.package
      : "smart";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-6xl px-6 pt-14 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <BrandLogo subtitle="Start your website" />
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Start Your Website
          </p>
          <h1 className="text-5xl leading-none sm:text-6xl">
            Start with the heart of the day, and we&apos;ll shape the website around it.
          </h1>
          <p className="text-lg leading-8 text-[#5f564e]">
            You don&apos;t need to build this alone. Share the essentials, and we&apos;ll turn them
            into a wedding website that feels thoughtful, personal, and ready to share.
          </p>
          <p className="max-w-3xl text-base leading-7 text-[#5f564e]">
            There&apos;s no pressure to have every detail perfectly written. Start with what you know,
            and we&apos;ll shape a strong first draft around the parts that matter most to your guests.
          </p>
          <div className="space-y-2 text-sm leading-6 text-[#6d655d]">
            <p>• Most couples complete this in under 2 minutes</p>
            <p>• Light details are absolutely fine for the first draft</p>
            <p>• Nothing is shared publicly before you have reviewed it</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#builder"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white"
            >
              Get My Website Started
            </a>
            <Link
              href={buildSampleWebsiteHref()}
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-6 py-3 text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              View Example Website
            </Link>
          </div>
        </div>
      </section>
      <div id="builder">
        <ClientIntakeForm initialPackage={packageTier} />
      </div>
      <MarketingFooter />
    </main>
  );
}
