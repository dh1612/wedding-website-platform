import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MarketingMobileMenu } from "@/components/marketing-mobile-menu";
import { MarketingFooter } from "@/components/marketing-footer";

const marketingNavItems = [
  { href: "/#example", label: "View Example Website" },
  { href: "/couple-area", label: "View Premium Couple Area Demo" },
  { href: "/contact", label: "Contact" },
  { href: "/#packages", label: "Packages" }
];

export default async function CoupleAreaPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-2 md:flex">
            {marketingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition hover:bg-white ${
                  item.href === "/couple-area" ? "bg-[#184b38] text-white" : "text-[#6b5c50]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/get-started?package=premium"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Start Premium
            </Link>
          </nav>

          <MarketingMobileMenu
            items={marketingNavItems}
            ctaHref="/get-started?package=premium"
            ctaLabel="Start Premium"
          />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 lg:px-8">
        <div className="space-y-4 rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-12">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Premium Couple Portal
          </p>
          <h1 className="text-5xl leading-none sm:text-6xl">
            Your private planning space, behind the wedding website.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
            While your guests use the wedding website for timings, travel, accommodation and
            RSVPs, you get a private Couple Portal to manage the planning side — guest replies,
            checklists, seating, key dates and final details.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/couple-area/demo"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Explore Live Portal Demo
            </Link>
            <Link
              href="/packages/premium"
              className="inline-flex items-center justify-center rounded-full border border-[#d9c7b5] bg-white px-6 py-3 text-sm font-medium text-[#5f564e] transition hover:bg-[#faf7f2]"
            >
              View Premium Package
            </Link>
          </div>
          <p className="text-sm leading-7 text-[#7b6d62]">
            The Couple Portal is included with Premium.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-8 lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_18px_50px_rgba(52,35,24,0.06)] sm:p-10">
          <p className="text-[12px] uppercase tracking-[0.32em] text-[#9a7d64]">
            Two Sides Of The Experience
          </p>
          <h2 className="mt-4 text-4xl leading-tight">
            Guest website on the outside. Planning portal on the inside.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#eadac9] bg-[#fffaf5] p-6">
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#9a7d64]">
                For your guests
              </p>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#5f564e]">
                <li>Wedding details</li>
                <li>Timings</li>
                <li>Travel and accommodation</li>
                <li>FAQs</li>
                <li>RSVP</li>
              </ul>
            </div>
            <div className="rounded-[1.5rem] border border-[#184b38]/12 bg-[#f6fbf8] p-6">
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#6b8b80]">
                For you
              </p>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#486159]">
                <li>RSVP dashboard</li>
                <li>Guest tracking</li>
                <li>Seating planner</li>
                <li>Checklist</li>
                <li>Key dates</li>
                <li>Planning notes</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-[#7b6d62]">
            Your guests get a polished place to find the details. You get a calmer way to keep
            everything organised.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
          <p className="text-[12px] uppercase tracking-[0.32em] text-[#9a7d64]">What It Includes</p>
          <h2 className="mt-4 text-4xl leading-tight">A better view of the planning side</h2>
          <div className="mt-6 space-y-5 text-[15px] leading-7 text-[#5f564e]">
            <p>
              Instead of leaving planning spread across notes, screenshots, and message threads,
              the Premium portal gathers the practical side of the wedding into one private space.
            </p>
            <p>
              Couples can review guest replies, keep track of next steps, map key dates, and work
              through seating with a clearer live overview of what is done and what still needs
              attention.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
          <p className="text-[12px] uppercase tracking-[0.32em] text-[#9a7d64]">Inside The Demo</p>
          <div className="mt-6 grid gap-4">
            {[
              "Checklist with sample planning tasks and notes",
              "Calendar timeline with realistic wedding milestones",
              "RSVP dashboard with sample guest numbers, filters, and dietary notes",
              "Seating view to show how the room-planning side feels"
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-[#eadac9] bg-[#fffaf5] px-4 py-4 text-sm leading-7 text-[#5f564e]"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-[#7b6d62]">
            The live demo is fully explorable, but any edits inside it are only for preview and
            reset when you leave the page.
          </p>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
