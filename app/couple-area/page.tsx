import Link from "next/link";

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
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b6e56]">
              David&apos;s Wedding Solutions
            </p>
            <p className="mt-1 text-lg font-semibold">Done-for-you wedding websites</p>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/#example"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              View Example
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
                  View Example
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
              Premium Package Area
            </p>
            <h1 className="text-5xl leading-none sm:text-6xl">
              The supported planning side of the wedding experience
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
              Premium adds a private planning area for RSVPs, checklist notes, key dates, and
              table planning, with real support behind it.
            </p>

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

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started?package=premium"
                className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
              >
                Choose Premium
              </Link>
              <Link
                href="/wedding?theme=aegean-romance"
                className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
              >
                View Public Example
              </Link>
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
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { name: "Top Table", guests: "6 seats", tone: "bg-[#184b38] text-white border-[#184b38]" },
                    { name: "Family Table", guests: "8 seats", tone: "bg-[#faf7f2] text-[#241f1b] border-[#e8ddd0]" },
                    { name: "Friends Table", guests: "10 seats", tone: "bg-[#faf7f2] text-[#241f1b] border-[#e8ddd0]" }
                  ].map((table) => (
                    <div
                      key={table.name}
                      className={`rounded-[1.2rem] border p-5 ${table.tone}`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.24em] opacity-80">Table</p>
                      <p className="mt-3 text-xl">{table.name}</p>
                      <p className="mt-2 text-sm opacity-80">{table.guests}</p>
                    </div>
                  ))}
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
      </section>
    </main>
  );
}
