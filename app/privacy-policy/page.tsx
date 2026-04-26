import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <BrandLogo subtitle="Privacy policy" />
          <div className="mt-8 space-y-6 text-[#5f564e]">
            <div>
              <h1 className="text-4xl leading-none text-[#1f1d1a] sm:text-5xl">Privacy Policy</h1>
              <p className="mt-4 text-base leading-7">
                This page explains what information KnotlessWed collects, how it is used, and how
                it is stored while preparing and delivering a wedding website service.
              </p>
            </div>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">What we collect</h2>
              <p className="mt-3 text-base leading-7">
                We may collect names, contact email addresses, wedding details, planning notes,
                guest information, and any other information submitted through the website or shared
                during the service.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">How we use it</h2>
              <p className="mt-3 text-base leading-7">
                Information is used to prepare, review, refine, and deliver the wedding website and
                any related private planning features selected by the couple.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Storage and access</h2>
              <p className="mt-3 text-base leading-7">
                Submitted details may be stored in secure website infrastructure and supporting
                tools used to operate the service. Access is limited to what is needed to deliver
                the work.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Updates and deletion</h2>
              <p className="mt-3 text-base leading-7">
                Couples can request corrections to submitted information. Requests to remove or
                export information can also be made, subject to any legal or operational need to
                retain records for a reasonable period.
              </p>
            </section>
            <section>
              <h2 className="text-2xl text-[#1f1d1a]">Contact</h2>
              <p className="mt-3 text-base leading-7">
                Replace this section with the business contact email before launch, for example
                <span className="font-medium text-[#184b38]"> hello@knotlesswed.ie</span>.
              </p>
            </section>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
