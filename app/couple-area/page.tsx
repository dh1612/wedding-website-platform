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

const supportCards = [
  "A real person can help shape the couple area around the wedding, not just hand over software.",
  "Premium makes more sense for couples who want support with changes, reminders, and planning details.",
  "The planning side stays private and calm, while the public website stays guest-ready."
];

export default function CoupleAreaPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-14 lg:px-8 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Private Couple Area</p>
            <h1 className="text-5xl leading-none sm:text-6xl">
              The premium planning side of the wedding experience
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
              Premium is not just a website. It adds a private space for RSVPs, planning dates, checklist items, and seating decisions in one calmer place.
            </p>
            <p className="max-w-2xl text-base leading-7 text-[#486159]">
              It also adds a more hands-on service. AI can help with wording and structure, but
              Premium is where real support matters most when plans shift and details get busy.
            </p>
            <div className="rounded-[1.4rem] border border-[#184b38]/12 bg-[#f6fbf8] px-5 py-4 text-sm leading-7 text-[#486159]">
              Premium includes a 1-hour walkthrough call so the couple can be guided through RSVPs,
              checklist items, key dates, and the planning area properly.
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a7d64]">RSVPs</p>
                <p className="mt-2 text-2xl text-[#184b38]">One place</p>
              </div>
              <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a7d64]">Dates</p>
                <p className="mt-2 text-2xl text-[#184b38]">Clear timeline</p>
              </div>
              <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a7d64]">Tables</p>
                <p className="mt-2 text-2xl text-[#184b38]">Visual planning</p>
              </div>
            </div>
            <div className="rounded-[1.4rem] border border-black/6 bg-[#faf7f2] px-5 py-4 text-sm leading-7 text-[#6f665e]">
              This is a read-only preview of the couple experience. It shows the value of the private area without opening the live planning tools to the public.
            </div>
            <div className="grid gap-3">
              {supportCards.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-black/6 bg-white/80 px-4 py-3 text-sm leading-6 text-[#4e453f]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started?package=premium"
                className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
                style={{ color: "#ffffff", backgroundColor: "#184b38" }}
              >
                Choose Premium
              </Link>
              <Link
                href="/couple-area"
                className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
                style={{ color: "#4e453f", backgroundColor: "#ffffff" }}
              >
                You Are Viewing The Preview
              </Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-6 shadow-[0_24px_70px_rgba(52,35,24,0.1)] sm:p-8">
            <div className="rounded-[1.5rem] bg-[#184b38] p-6 text-white">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#d8c6a7]">Premium Includes</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.2rem] bg-white/10 p-4">
                  <p className="text-sm font-medium">Wedding checklist</p>
                  <p className="mt-2 text-sm text-white/78">Keep tasks and reminders in one calm place.</p>
                </div>
                <div className="rounded-[1.2rem] bg-white/10 p-4">
                  <p className="text-sm font-medium">Guest responses</p>
                  <p className="mt-2 text-sm text-white/78">See replies and guest changes more clearly.</p>
                </div>
                <div className="rounded-[1.2rem] bg-white/10 p-4">
                  <p className="text-sm font-medium">Planning dates</p>
                  <p className="mt-2 text-sm text-white/78">Track RSVP reminders, supplier deadlines, and final tasks.</p>
                </div>
                <div className="rounded-[1.2rem] bg-white/10 p-4">
                  <p className="text-sm font-medium">Seating plan view</p>
                  <p className="mt-2 text-sm text-white/78">Think through groups and table choices more visually.</p>
                </div>
                <div className="rounded-[1.2rem] bg-white/10 p-4 md:col-span-2">
                  <p className="text-sm font-medium">1-hour premium walkthrough</p>
                  <p className="mt-2 text-sm text-white/78">A guided video call to help the couple get comfortable with the planning area and use it well from the start.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-6 lg:px-8 lg:py-10">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Inside The Experience</p>
            <h2 className="text-4xl leading-none sm:text-5xl">A look at the kind of features included in the couple area</h2>
            <p className="text-lg leading-8 text-[#5f564e]">
              Rather than opening the live private area from the sales page, this section shows the feel of it in a cleaner and more controlled way.
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
                  <p className="mt-2 text-sm text-[#6f665e]">Couples can think through groupings, awkward combinations, and top table choices before finalising the room plan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-6 lg:px-8 lg:py-10">
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

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.2rem] bg-[#184b38] p-8 text-white shadow-[0_26px_80px_rgba(18,39,31,0.24)] sm:p-10 lg:flex lg:items-end lg:justify-between lg:p-14">
          <div className="max-w-2xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#d8c6a7]">Premium Support</p>
            <h2 className="text-4xl leading-none sm:text-5xl">The website stays front and centre. Real support stays behind it.</h2>
            <p className="text-lg leading-8 text-white/82">
              This is where the Premium package earns its place. The website stays guest-facing and
              elegant, while the couple gets a calmer private space and a real person helping when
              the details start moving quickly.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-center text-sm font-medium text-[#184b38] transition hover:bg-[#f3ece2]"
              style={{ color: "#184b38", backgroundColor: "#ffffff" }}
            >
              Back To Homepage
            </Link>
            <Link
              href="/get-started?package=premium"
              className="inline-flex items-center justify-center rounded-full border border-white/24 px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-white/10"
              style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.24)" }}
            >
              Start Premium
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
