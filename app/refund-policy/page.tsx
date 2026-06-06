import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { SUPPORT_EMAIL } from "@/lib/brand";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <BrandLogo subtitle="Refund policy" />
          <div className="mt-8 space-y-6 text-[#5f564e]">
            <div>
              <h1 className="text-4xl leading-none text-[#1f1d1a] sm:text-5xl">Refund Policy</h1>
              <p className="mt-4 text-base leading-7">
                This policy explains how refunds are handled for website bookings, refinement work,
                and related support.
              </p>
            </div>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Before work begins</h2>
              <p className="mt-3 text-base leading-7">
                If a client changes their mind before any meaningful refinement work has started
                after payment, a full refund may be offered.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">After drafting has started</h2>
              <p className="mt-3 text-base leading-7">
                The private preview is the free first draft. Once payment has been made and
                refinement work has started, refunds may be partial rather than full, to reflect
                time already spent preparing the site, content, and support.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Completed work</h2>
              <p className="mt-3 text-base leading-7">
                Once the agreed work has been delivered for review or made live with approval,
                refunds will usually not be available unless otherwise agreed in writing.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Questions</h2>
              <p className="mt-3 text-base leading-7">
                Questions about refunds or cancellations can be sent to
                <span className="font-medium text-[#184b38]"> {SUPPORT_EMAIL}</span>.
              </p>
            </section>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
