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
                This policy should be finalised before taking live payments. The wording below is a
                practical placeholder that can be reviewed with a solicitor or policy tool.
              </p>
            </div>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Before work begins</h2>
              <p className="mt-3 text-base leading-7">
                If a client changes their mind before any meaningful work has started, a full refund
                may be offered.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">After drafting has started</h2>
              <p className="mt-3 text-base leading-7">
                Once work has started on the first version, refunds may be partial rather than
                full, to reflect time already spent preparing the site and content.
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
                Replace this section with the business contact email before launch, for example
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
