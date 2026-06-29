import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingMobileMenu } from "@/components/marketing-mobile-menu";
import { BRAND_NAME, buildSampleWebsiteHref } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Why Crafted | ${BRAND_NAME}`,
  description:
    "Why Crafted Wedding Sites exists as a done-for-you alternative to free wedding website builders, with a focus on time, polish, and personal support."
};

const exampleHref = buildSampleWebsiteHref();

const reasons = [
  {
    title: "Time",
    copy:
      "A free platform may cost less in money, but it can cost more in evenings, second-guessing, and headspace. Crafted is for couples who would rather not make the website another job on the list."
  },
  {
    title: "Polish",
    copy:
      "The difference is often not one dramatic feature. It is the quieter things: structure, pacing, wording, day-two plans, accommodation guidance, and a final result that feels more considered from start to finish."
  },
  {
    title: "Support",
    copy:
      "No ticket queues, no generic chatbot replies, and no trying to explain your wedding to a platform. When you need an amendment or update, it stays direct, human, and hands-on."
  }
];

export default function WhyCraftedPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <BrandLogo subtitle="Why Crafted" />

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              Home
            </Link>
            <Link
              href={exampleHref}
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              View Example Website
            </Link>
            <Link
              href="/brochure"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              Brochure
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              Contact
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Get My Website Started
            </Link>
          </nav>

          <MarketingMobileMenu
            items={[
              { href: "/", label: "Home" },
              { href: exampleHref, label: "View Example Website" },
              { href: "/brochure", label: "Brochure" },
              { href: "/contact", label: "Contact" }
            ]}
            ctaHref="/get-started"
            ctaLabel="Get My Website Started"
          />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-6 pt-10 lg:px-8 lg:pb-10 lg:pt-14">
        <div className="grid gap-8 rounded-[2.5rem] border border-black/6 bg-white/88 p-8 shadow-[0_24px_70px_rgba(52,35,24,0.08)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
          <div className="space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Why Crafted</p>
            <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
              Your wedding website should not feel like another job
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              There are free wedding website options, and for some couples they are exactly the
              right fit. Crafted Wedding Sites exists for the couples who do not want to build it
              all themselves, and who care about how the final result feels for both them and their
              guests.
            </p>
            <div className="rounded-[1.6rem] border border-[#184b38]/12 bg-[#f6fbf8] px-5 py-4 text-base leading-7 text-[#486159]">
              This is not about pretending free options are bad. It is about being honest that
              time, calm, and quality have value too.
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-[#184b38] p-4 shadow-[0_24px_80px_rgba(18,39,31,0.18)]">
            <div
              className="h-[320px] rounded-[1.7rem] bg-cover bg-center sm:h-[420px]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(24,75,56,0.10),rgba(24,75,56,0.18)), url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80')"
              }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Free options are valid
            </p>
            <h2 className="mt-4 text-4xl leading-none sm:text-5xl">
              Who a free builder can be perfect for
            </h2>
            <ul className="mt-6 space-y-3 pl-5 text-base leading-7 text-[#5f564e] marker:text-[#b48c58]">
              <li>Couples who enjoy editing and building things themselves</li>
              <li>Couples who want the lowest possible cost</li>
              <li>Couples who are happy to work within a template structure</li>
              <li>Couples who do not mind spending evenings refining layout and wording</li>
            </ul>
          </article>

          <article className="rounded-[2rem] border border-[#184b38]/12 bg-[#f6fbf8] p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Where Crafted fits in
            </p>
            <h2 className="mt-4 text-4xl leading-none text-[#184b38] sm:text-5xl">
              What you are really paying for here
            </h2>
            <ul className="mt-6 space-y-3 pl-5 text-base leading-7 text-[#486159] marker:text-[#184b38]">
              <li>Someone shaping the website for you rather than handing you a blank canvas</li>
              <li>A more considered, premium-feeling guest experience</li>
              <li>Direct support for questions, amendments, and refinement</li>
              <li>Less time spent fighting a builder and more time spent on your wedding</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-4xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              An honest comparison
            </p>
            <h2 className="text-4xl leading-none sm:text-5xl">
              It is not software access you are really buying
            </h2>
            <p className="text-lg leading-8 text-[#5f564e]">
              You are buying time back, design judgement, support, and a calmer route to something
              that feels polished.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-black/6 bg-[#fcfaf7] p-7">
              <h3 className="text-3xl leading-tight">With a typical builder</h3>
              <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-[#5f564e] marker:text-[#b48c58]">
                <li>You choose the template and work out the structure</li>
                <li>You decide how to organise guest information and travel details</li>
                <li>You refine wording, spacing, layout, and mobile flow yourself</li>
                <li>You troubleshoot the final details if something looks off</li>
              </ul>
            </div>

            <div className="rounded-[1.8rem] border border-[#184b38]/12 bg-[#f6fbf8] p-7">
              <h3 className="text-3xl leading-tight text-[#184b38]">With Crafted Wedding Sites</h3>
              <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-[#486159] marker:text-[#184b38]">
                <li>You share the key details and choose a design direction</li>
                <li>We shape the first version for you</li>
                <li>We guide tone, structure, and guest-facing clarity</li>
                <li>You review privately before anything is shared</li>
                <li>The final website feels more bespoke without becoming another job on your list</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="grid gap-10 rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:grid-cols-3 lg:p-14">
          {reasons.map((reason) => (
            <article key={reason.title} className="space-y-3">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                {reason.title}
              </p>
              <h2 className="text-4xl leading-none sm:text-[2.8rem]">{reason.title}</h2>
              <p className="text-base leading-7 text-[#5f564e]">{reason.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-4 lg:px-8 lg:pb-16">
        <div className="rounded-[2.2rem] border border-black/6 bg-[#184b38] p-8 text-white shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-4xl space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#d9c39f]">What happens next</p>
            <h2 className="text-4xl leading-none sm:text-5xl">
              Start with a first draft, then refine it together
            </h2>
            <div className="grid gap-5 pt-2 lg:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c39f]">Step 1</p>
                <p className="mt-3 text-base leading-7 text-white/84">
                  Choose a design direction and share your rough details.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c39f]">Step 2</p>
                <p className="mt-3 text-base leading-7 text-white/84">
                  Review your private first draft and see the direction clearly.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c39f]">Step 3</p>
                <p className="mt-3 text-base leading-7 text-white/84">
                  Refine it together and go live with something polished.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#184b38] transition hover:bg-[#f3ece2]"
              >
                Start Your First Draft
              </Link>
              <Link
                href={exampleHref}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/8"
              >
                View Example Website
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
