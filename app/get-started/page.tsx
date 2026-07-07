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
            Let&apos;s start your wedding website.
          </h1>
          <p className="text-lg leading-8 text-[#5f564e]">
            Share a few simple details and I&apos;ll create your first private draft. Nothing goes
            live until you&apos;ve reviewed it together.
          </p>
          <div className="grid gap-3 rounded-[1.5rem] border border-black/6 bg-white/70 px-5 py-4 text-sm leading-6 text-[#6d655d] sm:grid-cols-2">
            <p>✓ Takes around 2 minutes</p>
            <p>✓ Rough details are absolutely fine</p>
            <p>✓ Nothing is shared publicly</p>
            <p>✓ Personal support throughout</p>
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
      <section className="mx-auto w-full max-w-6xl px-6 pb-6 lg:px-8 lg:pb-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_18px_50px_rgba(52,35,24,0.06)] sm:p-10">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            What happens next?
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Step 1", "Complete the short form."],
              ["Step 2", "I build your first private draft."],
              ["Step 3", "We refine it together."],
              ["Step 4", "Only then is your website shared with guests."]
            ].map(([step, copy]) => (
              <div
                key={step}
                className="rounded-[1.4rem] border border-[#eadac9] bg-[#fcfaf7] px-5 py-5"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">{step}</p>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">{copy}</p>
              </div>
            ))}
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
