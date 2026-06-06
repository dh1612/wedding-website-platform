import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { BRAND_NAME } from "@/lib/brand";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <BrandLogo subtitle="Terms" />
          <div className="mt-8 space-y-6 text-[#5f564e]">
            <div>
              <h1 className="text-4xl leading-none text-[#1f1d1a] sm:text-5xl">Terms of Service</h1>
              <p className="mt-4 text-base leading-7">
                These terms describe the basis on which {BRAND_NAME} provides done-for-you wedding
                website services, optional planning tools, and related support.
              </p>
            </div>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Service scope</h2>
              <p className="mt-3 text-base leading-7">
                The service includes preparing a wedding website based on information supplied by
                the couple, sharing a private review version, refining it where agreed, and making
                it live when approved.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Client responsibilities</h2>
              <p className="mt-3 text-base leading-7">
                Clients are responsible for providing accurate content, reviewing drafts in a timely
                way, and confirming when a site is approved for sharing or publication.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Revisions</h2>
              <p className="mt-3 text-base leading-7">
                Reasonable revisions are included within the agreed scope. Large content changes,
                extra rounds of revision, or additional features may require a new quote or upgraded
                package.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Payment and timing</h2>
              <p className="mt-3 text-base leading-7">
                The private preview is the first draft stage. Payment confirms the selected package
                and is the point where hands-on refinement work begins. Delivery timelines, calls,
                and any extra rounds of work depend on the package purchased and the speed of client
                feedback.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Liability</h2>
              <p className="mt-3 text-base leading-7">
                {BRAND_NAME} is not responsible for losses caused by inaccurate information supplied
                by the client, delays in approvals, or third-party platform interruptions outside
                reasonable control.
              </p>
            </section>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
