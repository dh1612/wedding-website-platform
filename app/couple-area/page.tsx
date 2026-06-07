import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
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

          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/8 bg-white text-[#184b38] [&::-webkit-details-marker]:hidden">
              <span className="text-2xl leading-none">≡</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-[1.5rem] border border-black/6 bg-white p-4 shadow-[0_20px_50px_rgba(52,35,24,0.12)]">
              <div className="flex flex-col gap-2">
                {marketingNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/get-started?package=premium"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-3 text-sm font-medium text-white"
                >
                  Start Premium
                </Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 lg:px-8">
        <div className="space-y-4 rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-12">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Premium Couple Portal
          </p>
          <h1 className="text-5xl leading-none sm:text-6xl">
            A calm private planning space, alongside the wedding website
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
            Premium adds a private couple area for the planning side of the wedding. It is where
            couples can review RSVPs, keep key dates together, work through a checklist, and see a
            clearer live picture of what still needs attention.
          </p>
          <div className="rounded-[1.3rem] border border-[#184b38]/12 bg-[#f6fbf8] px-5 py-4 text-sm leading-7 text-[#486159]">
            Premium includes digital invites, the full private planning area, AI concierge access,
            and a more dedicated level of support while everything is being finalised. You can
            explore the live demo below without affecting any real wedding data.
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/couple-area/demo"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Open Live Portal Demo
            </Link>
            <Link
              href="/get-started?package=premium"
              className="inline-flex items-center justify-center rounded-full border border-[#d9c7b5] bg-white px-6 py-3 text-sm font-medium text-[#5f564e] transition hover:bg-[#faf7f2]"
            >
              Start A Premium Draft
            </Link>
          </div>
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
