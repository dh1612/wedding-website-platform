import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingMobileMenu } from "@/components/marketing-mobile-menu";
import { BRAND_NAME, buildSampleWebsiteHref } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Why Crafted | ${BRAND_NAME}`,
  description:
    "Why couples choose Crafted Wedding Sites for a calmer, more supported route to a polished wedding website."
};

const exampleHref = buildSampleWebsiteHref();

const reasons = [
  {
    title: "Time",
    copy:
      "Skip hours spent building and tweaking a website yourself."
  },
  {
    title: "Clarity",
    copy:
      "Your guests always know where to find timings, travel, accommodation and RSVP details."
  },
  {
    title: "Support",
    copy:
      "Real guidance and refinements from a real person, not a support ticket."
  },
  {
    title: "Peace of mind",
    copy: "Nothing goes live until you're genuinely happy with it."
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
              Why couples choose Crafted Wedding Sites
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              You could absolutely build a wedding website yourself.
            </p>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">Many couples do.</p>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              Crafted Wedding Sites is for couples who would rather spend their time planning their
              wedding than learning another website builder.
            </p>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              We build it with you, refine it with you, and make sure both you and your guests have
              a better experience.
            </p>
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
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl leading-none sm:text-5xl">What you&apos;re really paying for</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason, index) => (
              <article
                key={reason.title}
                className={
                  index % 2 === 1
                    ? "rounded-[1.6rem] border border-[#184b38]/12 bg-[#f6fbf8] p-6"
                    : "rounded-[1.6rem] border border-black/6 bg-[#fcfaf7] p-6"
                }
              >
                <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                  {reason.title}
                </p>
                <h3 className="mt-4 text-3xl leading-tight sm:text-[2rem]">{reason.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#5f564e]">{reason.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-4xl leading-none sm:text-5xl">DIY builder vs Crafted Wedding Sites</h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-black/6 bg-[#fcfaf7] p-7">
              <h3 className="text-3xl leading-tight">DIY Builder</h3>
              <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-[#5f564e] marker:text-[#b48c58]">
                <li>Build everything yourself</li>
                <li>Choose layouts yourself</li>
                <li>Write all wording yourself</li>
                <li>Troubleshoot issues yourself</li>
                <li>Generic support</li>
              </ul>
            </div>

            <div className="rounded-[1.8rem] border border-[#184b38]/12 bg-[#f6fbf8] p-7">
              <h3 className="text-3xl leading-tight text-[#184b38]">Crafted Wedding Sites</h3>
              <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-[#486159] marker:text-[#184b38]">
                <li>Done-for-you first draft</li>
                <li>Personal refinements</li>
                <li>Guest-focused structure</li>
                <li>Private review before launch</li>
                <li>Direct support from David</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-4 lg:px-8 lg:pb-16">
        <div className="rounded-[2.2rem] border border-black/6 bg-[#184b38] p-8 text-white shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-4xl space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#d9c39f]">What happens next</p>
            <div className="space-y-1 text-lg leading-8 text-white/84">
              <p>You&apos;re not paying for access to software.</p>
              <p>
                You&apos;re paying to save time, reduce stress, and give your guests a better
                experience.
              </p>
            </div>
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
