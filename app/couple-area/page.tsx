import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";

const featureCards = [
  {
    title: "Guest List & RSVPs",
    copy:
      "Keep names, replies, and last-minute changes in one place without needing separate spreadsheets."
  },
  {
    title: "Checklist & Notes",
    copy:
      "A simple way to keep track of wedding to-dos, reminders, and planning notes."
  },
  {
    title: "Dates & Timeline",
    copy:
      "See key dates together, from RSVP reminders to final payments and the wedding week."
  },
  {
    title: "Seating Plan",
    copy:
      "Start thinking visually about tables, guest groups, and where everyone will feel most comfortable."
  }
];

const includedItems = [
  "Wedding checklist",
  "Guest responses and RSVP overview",
  "Key dates and planning timeline",
  "Desktop-first seating plan workspace",
  "1-hour premium walkthrough call"
];

export default function CoupleAreaPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/#example"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              View Guest Website Example
            </Link>
            <Link
              href="/#packages"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              Packages
            </Link>
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
                <Link
                  href="/#example"
                  className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]"
                >
                  View Guest Website Example
                </Link>
                <Link
                  href="/#packages"
                  className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]"
                >
                  Packages
                </Link>
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

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-14 lg:px-8 lg:pb-16">
        <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Premium Package Demo
            </p>
            <h1 className="text-5xl leading-none sm:text-6xl">
              The supported planning side of the wedding experience
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
              Premium adds a private planning area for RSVPs, checklist notes, key dates, and
              table planning, with real support behind it.
            </p>
            <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6d655d]">
              This is a read-only demo preview. It is there to show the layout and value of the
              private area, not to let visitors edit live planning tools.
            </div>

            <div className="rounded-[1.7rem] border border-[#184b38]/14 bg-[#184b38] p-6 text-white shadow-[0_22px_70px_rgba(18,39,31,0.22)]">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#d8c6a7]">
                1-Hour Walkthrough Call
              </p>
              <h2 className="mt-3 text-3xl leading-tight">
                A guided video call to walk through everything together
              </h2>
              <p className="mt-4 text-base leading-7 text-white/82">
                Couples are not left alone with software. Premium includes a 1-hour call to walk
                through the private area, answer questions, and make sure everything feels clear
                from the start.
              </p>
            </div>

          </div>

          <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-6 shadow-[0_24px_70px_rgba(52,35,24,0.1)] sm:p-8">
            <div className="rounded-[1.5rem] bg-[#184b38] p-6 text-white">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#d8c6a7]">
                Premium Includes
              </p>
              <div className="mt-5 grid gap-3">
                {includedItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm leading-6 text-white/88"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-8">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Inside The Premium Area
            </p>
            <h2 className="text-4xl leading-none sm:text-5xl">
              A visual look at what the couple actually gets
            </h2>
            <p className="text-lg leading-8 text-[#5f564e]">
              The private area keeps planning details clearer without taking focus away from the
              public wedding website.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-[1.8rem] border border-black/6 bg-[#fcfaf7] p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Screen 1</p>
              <h3 className="mt-3 text-2xl">Checklist view</h3>
              <div className="mt-5 rounded-[1.3rem] border border-[#d8cfc5] bg-white p-5">
                <div className="space-y-3">
                  <div className="rounded-[1rem] border border-[#e8ddd0] bg-[#faf7f2] px-4 py-3">
                    <p className="text-sm font-medium text-[#184b38]">Confirm final guest list</p>
                    <p className="mt-2 text-sm text-[#6f665e]">Check evening guests and last dietary notes.</p>
                  </div>
                  <div className="rounded-[1rem] border border-[#e8ddd0] bg-[#faf7f2] px-4 py-3">
                    <p className="text-sm font-medium text-[#184b38]">Share wedding-week timings</p>
                    <p className="mt-2 text-sm text-[#6f665e]">Transport, arrival windows, and final reminders.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-black/6 bg-[#fcfaf7] p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Screen 2</p>
              <h3 className="mt-3 text-2xl">RSVP overview</h3>
              <div className="mt-5 rounded-[1.3rem] border border-[#d8cfc5] bg-white p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1rem] bg-[#edf6f2] p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#3e6b59]">Attending</p>
                    <p className="mt-2 text-3xl text-[#184b38]">82</p>
                  </div>
                  <div className="rounded-[1rem] bg-[#faf7f2] p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a7d64]">Pending</p>
                    <p className="mt-2 text-3xl text-[#4e453f]">26</p>
                  </div>
                  <div className="rounded-[1rem] bg-[#faf7f2] p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a7d64]">Declined</p>
                    <p className="mt-2 text-3xl text-[#4e453f]">9</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[1rem] border border-[#e8ddd0] bg-[#faf7f2] px-4 py-3">
                  <p className="text-sm font-medium text-[#184b38]">Replies stay easy to follow</p>
                  <p className="mt-2 text-sm text-[#6f665e]">Guest responses stay organised without needing to manage separate spreadsheets.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-black/6 bg-[#fcfaf7] p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Screen 3</p>
              <h3 className="mt-3 text-2xl">Key dates view</h3>
              <div className="mt-5 rounded-[1.3rem] border border-[#d8cfc5] bg-white p-5">
                <div className="space-y-3">
                  <div className="rounded-[1rem] bg-[#184b38] px-4 py-3 text-white">
                    <p className="text-sm font-medium">RSVP reminder</p>
                    <p className="mt-2 text-sm text-white/78">12 Aug 2027</p>
                  </div>
                  <div className="rounded-[1rem] bg-[#faf7f2] px-4 py-3">
                    <p className="text-sm font-medium text-[#184b38]">Final supplier payments</p>
                    <p className="mt-2 text-sm text-[#6f665e]">28 Aug 2027</p>
                  </div>
                  <div className="rounded-[1rem] bg-[#faf7f2] px-4 py-3">
                    <p className="text-sm font-medium text-[#184b38]">Wedding-week handover</p>
                    <p className="mt-2 text-sm text-[#6f665e]">14 Sep 2027</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-black/6 bg-[#fcfaf7] p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)] xl:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Screen 4</p>
              <h3 className="mt-3 text-2xl">Seating plan view</h3>
              <div className="mt-5 rounded-[1.3rem] border border-[#d8cfc5] bg-white p-5">
                <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="rounded-[1.2rem] border border-[#e8ddd0] bg-[#faf7f2] p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a7d64]">
                      Guest cards
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Emma +1", "Groom's Aunt", "College Friends", "Bridesmaids", "Family of 4"].map(
                        (guest) => (
                          <span
                            key={guest}
                            className="rounded-full border border-[#d8cfc5] bg-white px-3 py-2 text-xs font-medium text-[#4e453f] shadow-[0_8px_20px_rgba(52,35,24,0.06)]"
                          >
                            {guest}
                          </span>
                        )
                      )}
                    </div>
                    <div className="mt-4 rounded-[1rem] border border-dashed border-[#c7b8aa] bg-white/80 px-4 py-3 text-sm text-[#6f665e]">
                      Drag guests onto tables to try different layouts.
                    </div>
                  </div>

                  <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-[#e8ddd0] bg-[radial-gradient(circle_at_center,_rgba(24,75,56,0.06),_transparent_58%),linear-gradient(180deg,#fbf8f4_0%,#f4ede4_100%)] p-5">
                    <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#9a7d64] shadow-[0_8px_20px_rgba(52,35,24,0.08)]">
                      Drag + drop demo
                    </div>
                    <div className="absolute left-[12%] top-[16%] w-[32%] rounded-[1.2rem] border border-[#184b38] bg-[#184b38] p-4 text-white shadow-[0_16px_30px_rgba(24,75,56,0.2)]">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Top Table</p>
                      <p className="mt-2 text-xl">6 seats</p>
                      <p className="mt-3 text-xs text-white/72">Couple, parents, best man, maid of honour</p>
                    </div>
                    <div className="absolute left-[54%] top-[20%] flex h-28 w-28 items-center justify-center rounded-full border border-[#e8ddd0] bg-white text-center shadow-[0_14px_28px_rgba(52,35,24,0.08)]">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a7d64]">Table 1</p>
                        <p className="mt-2 text-sm text-[#184b38]">Family</p>
                      </div>
                    </div>
                    <div className="absolute left-[24%] top-[58%] flex h-28 w-28 items-center justify-center rounded-full border border-[#e8ddd0] bg-white text-center shadow-[0_14px_28px_rgba(52,35,24,0.08)]">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a7d64]">Table 2</p>
                        <p className="mt-2 text-sm text-[#184b38]">Friends</p>
                      </div>
                    </div>
                    <div className="absolute left-[62%] top-[60%] flex h-28 w-28 items-center justify-center rounded-full border border-[#e8ddd0] bg-white text-center shadow-[0_14px_28px_rgba(52,35,24,0.08)]">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a7d64]">Table 3</p>
                        <p className="mt-2 text-sm text-[#184b38]">Work</p>
                      </div>
                    </div>
                    <div className="absolute left-[47%] top-[44%] rounded-full bg-[#184b38] px-3 py-2 text-xs font-medium text-white shadow-[0_12px_24px_rgba(24,75,56,0.22)]">
                      Emma +1
                    </div>
                    <div className="absolute left-[39%] top-[49%] text-2xl text-[#9a7d64]">↗</div>
                    <div className="absolute bottom-4 left-4 rounded-[1rem] border border-[#e8ddd0] bg-white/92 px-4 py-3 text-sm text-[#6f665e] shadow-[0_10px_24px_rgba(52,35,24,0.06)]">
                      Guests and tables can be rearranged visually in the full planner.
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-[1rem] border border-[#e8ddd0] bg-[#faf7f2] px-4 py-3">
                  <p className="text-sm font-medium text-[#184b38]">A visual starting point for table planning</p>
                  <p className="mt-2 text-sm text-[#6f665e]">Best explored on desktop or tablet when the couple is ready to map things out properly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.8rem] border border-black/6 bg-white/86 p-7 shadow-[0_20px_60px_rgba(52,35,24,0.08)]"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Feature</p>
              <h2 className="mt-4 text-3xl leading-tight">{card.title}</h2>
              <p className="mt-4 text-base leading-7 text-[#5f564e]">{card.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-black/6 bg-white/88 p-7 text-center shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a7d64]">Ready for the fuller setup?</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Premium is for couples who want the website and the planning support together</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#5f564e]">
            Once the couple has seen what the private area actually looks like, the next step is
            simply choosing Premium and getting the first version started.
          </p>
          <div className="mt-6">
            <Link
              href="/get-started?package=premium"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Choose Premium
            </Link>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
