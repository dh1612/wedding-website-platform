import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ClientIntakeForm } from "@/components/client-intake-form";
import { MarketingFooter } from "@/components/marketing-footer";
import type { IntakePackage } from "@/lib/intake";

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
            Skip the stress of building a wedding website.
          </h1>
          <p className="text-lg leading-8 text-[#5f564e]">
            We build it for you. Just tell us what your guests need to know — we handle the rest.
          </p>
          <p className="max-w-3xl text-base leading-7 text-[#5f564e]">
            No DIY. No setup. No back and forth. Get a beautiful, ready-to-share wedding website
            in minutes.
          </p>
          <div className="space-y-2 text-sm leading-6 text-[#6d655d]">
            <p>• Most couples complete this in under 2 minutes</p>
            <p>• No payment required upfront</p>
            <p>• Private review before anything is shared</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#builder"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white"
            >
              Get My Website Started
            </a>
            <Link
              href="/wedding?theme=aegean-romance"
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
