import Link from "next/link";

const brochurePages = [
  {
    eyebrow: "Page 1",
    title: "Done-for-you wedding websites",
    copy:
      "A calm overview of the service, the design quality, and the low-effort process for the couple.",
    bullets: ["Beautiful guest-facing website", "Minimal effort for the couple", "Private review before anything goes live"]
  },
  {
    eyebrow: "Page 2",
    title: "Packages at a glance",
    copy:
      "A clear view of Basic, Smart, and Premium so couples can quickly understand the difference without reading a long sales page.",
    bullets: ["Basic from EUR195", "Smart adds AI polish", "Premium includes the private couple area"]
  },
  {
    eyebrow: "Page 3",
    title: "Private couple area",
    copy:
      "A visual preview of the extra planning tools available in the fuller package, including RSVP updates, checklist support, and key dates.",
    bullets: ["RSVP overview", "Wedding checklist", "Key dates and reminders"]
  }
];

export default function BrochurePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-14 lg:px-8 lg:pb-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Digital Brochure</p>
            <h1 className="text-5xl leading-none sm:text-6xl">A quick visual guide to the service</h1>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              This gives couples a cleaner page-by-page feel of what is included, without needing to read every part of the main website first.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-sm font-medium text-white"
              style={{ color: "#ffffff", backgroundColor: "#184b38" }}
            >
              Start Your Website
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-sm font-medium text-[#4e453f]"
              style={{ color: "#4e453f", backgroundColor: "#ffffff" }}
            >
              Back To Home
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {brochurePages.map((page, index) => (
            <section
              key={page.title}
              className="grid gap-6 rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] lg:grid-cols-[0.95fr_1.05fr]"
            >
              <div className="space-y-4">
                <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">{page.eyebrow}</p>
                <h2 className="text-4xl leading-none sm:text-5xl">{page.title}</h2>
                <p className="text-lg leading-8 text-[#5f564e]">{page.copy}</p>
                <div className="space-y-3 pt-2">
                  {page.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 text-base leading-7 text-[#453c35]">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#b48c58]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.8rem] bg-[#184b38] p-5 shadow-[0_22px_60px_rgba(18,39,31,0.18)]">
                {index === 0 ? (
                  <div className="grid h-full gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                    <div
                      className="min-h-[260px] rounded-[1.5rem] bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
                      }}
                    />
                    <div className="grid gap-4">
                      <div
                        className="min-h-[140px] rounded-[1.5rem] bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
                        }}
                      />
                      <div className="rounded-[1.5rem] bg-white/92 p-5">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Included</p>
                        <p className="mt-3 text-xl leading-tight text-[#241f1b]">
                          Design, structure, and review handled in one process.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {index === 1 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ["Basic", "EUR195"],
                      ["Smart", "EUR345"],
                      ["Premium", "EUR595"]
                    ].map(([name, price], cardIndex) => (
                      <div
                        key={name}
                        className={`rounded-[1.5rem] p-5 ${cardIndex === 2 ? "bg-white text-[#184b38]" : "bg-white/10 text-white"}`}
                      >
                        <p className="text-[11px] uppercase tracking-[0.28em] opacity-80">Package</p>
                        <p className="mt-3 text-2xl">{name}</p>
                        <p className="mt-4 text-3xl">{price}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {index === 2 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.5rem] bg-white p-5">
                      <p className="text-xl text-[#184b38]">Guest overview</p>
                      <p className="mt-3 text-sm leading-6 text-[#5f564e]">See responses and keep the guest list tidy.</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white p-5">
                      <p className="text-xl text-[#184b38]">Checklist</p>
                      <p className="mt-3 text-sm leading-6 text-[#5f564e]">Keep suppliers, reminders, and planning notes in one place.</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white p-5">
                      <p className="text-xl text-[#184b38]">Key dates</p>
                      <p className="mt-3 text-sm leading-6 text-[#5f564e]">A clear planning view without another complicated tool.</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
