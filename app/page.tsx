import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { weddingThemes } from "@/lib/themes";

const exampleHref = "/wedding?theme=aegean-romance";

const packageCards = [
  {
    id: "basic",
    name: "Basic",
    price: "EUR245",
    summary: "A polished wedding website, prepared from the details already shared.",
    points: [
      "Done-for-you website setup",
      "Schedule, travel, FAQ and RSVP sections",
      "Private review before it is shared",
      "One premium design direction"
    ]
  },
  {
    id: "smart",
    name: "Smart",
    price: "EUR395",
    summary: "A more polished first version, shaped faster with support behind the scenes.",
    points: [
      "Everything in Basic",
      "AI-supported first draft",
      "More finished first version",
      "Optional concierge touches"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR645",
    summary: "Includes the website, the private planning area, and a guided premium handover.",
    points: [
      "Everything in Smart",
      "Private couple area",
      "Checklist, RSVP and planning tools",
      "1-hour walkthrough call"
    ]
  }
];

const flowSteps = [
  "Choose a package",
  "Share your details",
  "We prepare your first version",
  "You review privately",
  "We refine it and go live"
];

const reassurancePoints = [
  "We prepare everything for you",
  "You review before it goes live",
  "No setup, no tech, no stress"
];

const emotionalPoints = [
  "No late nights building pages",
  "No chasing guests for info",
  "Everything handled for you"
];

const trustPoints = [
  "Done-for-you service",
  "Real support from first draft to final review",
  "Private review before guests see anything"
];

const supportPoints = [
  "A real person checks the first version before it goes anywhere live.",
  "The first draft can be shaped faster behind the scenes, while the service still feels personal.",
  "Changes, questions, and final touches are handled with support, not guesswork."
];

const featuredThemes = weddingThemes.slice(0, 3);

const portalPreviewCards = [
  {
    label: "Checklist",
    title: "A calm task list for the final details",
    tone: "soft",
    detail: "Tasks, notes, and reminders"
  },
  {
    label: "RSVP View",
    title: "Guest replies that stay easy to read",
    tone: "white",
    detail: "Attending, pending, declined"
  },
  {
    label: "Key Dates",
    title: "Important deadlines in one timeline",
    tone: "dark",
    detail: "Payments, reminders, wedding week"
  },
  {
    label: "Seating Plan",
    title: "A clearer way to think through tables",
    tone: "soft",
    detail: "Desktop-first planning view"
  }
];

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] pb-24 text-[#1f1d1a] md:pb-0">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href={exampleHref}
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              View Guest Website Example
            </Link>
            <Link
              href="/couple-area"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              View Premium Couple Area Demo
            </Link>
            <a href="#packages" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Packages
            </a>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Start Your Website
            </Link>
          </nav>

          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/8 bg-white text-[#184b38] [&::-webkit-details-marker]:hidden">
              <span className="text-2xl leading-none">≡</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-[1.5rem] border border-black/6 bg-white p-4 shadow-[0_20px_50px_rgba(52,35,24,0.12)]">
              <div className="flex flex-col gap-2">
                <Link
                  href={exampleHref}
                  className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]"
                >
                  View Guest Website Example
                </Link>
                <Link
                  href="/couple-area"
                  className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]"
                >
                  View Premium Couple Area Demo
                </Link>
                <a href="#how-it-works" className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]">
                  How It Works
                </a>
                <a href="#packages" className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]">
                  Packages
                </a>
                <Link
                  href="/get-started"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-3 text-sm font-medium text-white"
                >
                  Start Your Website
                </Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pt-16">
        <div className="space-y-7">
          <div className="space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Beautiful wedding websites, built for you
            </p>
            <h1 className="max-w-3xl text-[3.35rem] leading-none sm:text-6xl lg:text-7xl">
              We build your wedding website for you
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e] sm:text-xl">
              No DIY builder. No complicated setup. Just a beautiful, ready-to-share website, with an optional private couple area for RSVPs, planning notes, key dates, and seating.
            </p>
            <p className="max-w-2xl text-base leading-7 text-[#486159]">
              AI can help shape the first version, but every couple still has a real person
              behind the service to guide changes, review details, and get everything ready to
              share.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="hidden items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45] md:inline-flex"
            >
              Start Your Website
            </Link>
            <Link
              href={exampleHref}
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              View Guest Website Example
            </Link>
          </div>

          <div className="space-y-1">
            <p className="text-sm leading-6 text-[#6d655d]">
              Takes ~2 minutes to get your first version started.
            </p>
            <p className="text-sm leading-6 text-[#184b38]">
              No payment needed to get your first version started.
            </p>
            <p className="text-sm leading-6 text-[#5f564e]">
              Most couples choose Smart for a more finished first version with less back-and-forth.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {trustPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-black/8 bg-white/80 px-4 py-2 text-sm text-[#4e453f]"
              >
                {point}
              </span>
            ))}
          </div>

          <div className="rounded-[1.7rem] border border-[#184b38]/10 bg-[#f6fbf8] p-5 text-base leading-7 text-[#486159]">
            This is not a DIY builder. We prepare the first version for you. You review, we refine, then you go live.
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#184b38] p-4 shadow-[0_24px_80px_rgba(18,39,31,0.2)] sm:rounded-[2.4rem] sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[1.6rem] border border-white/16 bg-white/10 sm:rounded-[2rem]">
              <div
                className="h-[300px] w-full bg-cover bg-center sm:h-[500px]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
                }}
              />
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-white/16 bg-white/10 sm:rounded-[1.7rem]">
                <div
                  className="h-[180px] w-full bg-cover bg-center sm:h-[280px]"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
                  }}
                />
              </div>
                <div className="rounded-[1.4rem] border border-white/12 bg-white/92 p-5 shadow-[0_20px_60px_rgba(17,28,23,0.18)] sm:rounded-[1.7rem] sm:p-6">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">Smart package highlight</p>
                  <p className="mt-3 text-2xl leading-tight">
                  A more polished first version, prepared faster behind the scenes.
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  Couples can send rough notes. Smart helps shape those into something more
                  refined, then a real person checks the first version before it is sent for
                  review.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section id="example" className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-10">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                Real Example
              </p>
              <h2 className="text-4xl leading-none sm:text-5xl">
                See what your wedding website could look like
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                The quickest way to understand the service is to see the kind of website, support,
                and private couple area a couple would actually receive.
              </p>
              <div className="rounded-[1.3rem] border border-[#184b38]/12 bg-[#f6fbf8] px-5 py-4 text-sm leading-7 text-[#486159]">
                Premium includes a 1-hour video walkthrough, so the couple can be shown exactly how
                to use the private planning area rather than being left to figure it out alone.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={exampleHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-sm font-medium text-white"
                >
                  View Full Guest Website
                </Link>
                <Link
                  href="/couple-area"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
                >
                  View Premium Couple Area Demo
                </Link>
              </div>
            </div>
            <div className="grid gap-5">
              <Link
                href={exampleHref}
                className="overflow-hidden rounded-[2rem] border border-black/6 bg-[#fcfaf7] shadow-[0_18px_50px_rgba(52,35,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(52,35,24,0.12)]"
              >
                <div
                  className="h-[240px] w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
                  }}
                />
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                    Public Website Example
                  </p>
                  <h3 className="mt-3 text-3xl">Aegean destination example</h3>
                  <p className="mt-3 text-base leading-7 text-[#5f564e]">
                    A guest-facing site with hero, schedule, travel details, story, and RSVP flow already styled and ready to explore.
                  </p>
                  <p className="mt-5 text-sm font-medium text-[#184b38]">View guest website example</p>
                </div>
              </Link>

              <Link
                href="/couple-area"
                className="rounded-[2rem] border border-black/6 bg-[#f7fbf8] p-6 shadow-[0_18px_50px_rgba(52,35,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(52,35,24,0.12)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                      Private Couple Area
                    </p>
                    <h3 className="mt-3 text-3xl">See the planning side too</h3>
                  </div>
                  <span className="rounded-full bg-[#184b38] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white">
                    Premium
                  </span>
                </div>
                <p className="mt-4 text-base leading-7 text-[#5f564e]">
                  Premium adds the private planning area plus a 1-hour walkthrough call, so the
                  couple is not left to figure the features out alone.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {portalPreviewCards.map((card) => (
                    <div
                      key={card.label}
                      className={`rounded-[1.2rem] border p-4 ${
                        card.tone === "dark"
                          ? "border-[#184b38] bg-[#184b38] text-white"
                          : card.tone === "white"
                            ? "border-[#ddd4ca] bg-white text-[#241f1b]"
                            : "border-[#e6ddd2] bg-[#fbf7f2] text-[#241f1b]"
                      }`}
                    >
                      <p
                        className={`text-[11px] uppercase tracking-[0.28em] ${
                          card.tone === "dark" ? "text-[#d8c6a7]" : "text-[#9a7d64]"
                        }`}
                      >
                        {card.label}
                      </p>
                      <p className="mt-3 text-lg leading-tight">{card.title}</p>
                      <p
                        className={`mt-2 text-sm leading-6 ${
                          card.tone === "dark" ? "text-white/78" : "text-[#6b625a]"
                        }`}
                      >
                        {card.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-[1.1rem] border border-black/6 bg-white px-4 py-3 text-sm leading-6 text-[#4e453f]">
                  Includes a guided 1-hour video call to walk through the premium area together.
                </div>
              </Link>

              <div className="rounded-[2rem] border border-black/6 bg-white p-6 shadow-[0_18px_50px_rgba(52,35,24,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                  Human support
                </p>
                <h3 className="mt-3 text-3xl">AI helps. A real person still handles the service.</h3>
                <div className="mt-4 space-y-3">
                  {supportPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-[1rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#4e453f]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Pricing & Features</p>
              <h2 className="text-4xl leading-none sm:text-5xl">Choose the level of support</h2>
              <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
                The website is always done for the couple. The higher packages add AI polish,
                premium planning support, and a stronger human-guided service around it.
              </p>
              <p className="text-sm leading-6 text-[#184b38]">
                Done-for-you service. Not a DIY builder.
              </p>
            </div>
            <Link
              href="/brochure"
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              View Pricing & Features
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {packageCards.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`rounded-[2rem] border p-7 shadow-[0_22px_70px_rgba(52,35,24,0.1)] ${
                  index === 2
                    ? "border-[#184b38] bg-[#184b38] text-white"
                    : "border-black/6 bg-white/86 text-[#241f1b]"
                }`}
              >
                <p className={`text-[11px] uppercase tracking-[0.32em] ${index === 2 ? "text-[#d9c39f]" : "text-[#9a7d64]"}`}>
                  Package
                </p>
                <h3 className="mt-4 text-3xl leading-tight">{pkg.name}</h3>
                <p className={`mt-4 text-3xl ${index === 2 ? "text-[#f0e6d8]" : "text-[#184b38]"}`}>{pkg.price}</p>
                <p className={`mt-5 text-base leading-7 ${index === 2 ? "text-white/82" : "text-[#5f564e]"}`}>
                  {pkg.summary}
                </p>
                <p className={`mt-3 text-sm leading-6 ${index === 2 ? "text-white/72" : "text-[#486159]"}`}>
                  Every package includes a real person reviewing the first version before it is
                  shared for feedback.
                </p>
                <div className="mt-6 space-y-3">
                  {pkg.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <span className={`mt-2 h-2.5 w-2.5 rounded-full ${index === 2 ? "bg-[#f0e6d8]" : "bg-[#b48c58]"}`} />
                      <span className={`text-sm leading-6 ${index === 2 ? "text-white/88" : "text-[#423a34]"}`}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/get-started?package=${pkg.id}`}
                    className={`inline-flex rounded-full px-5 py-3 text-sm font-medium transition ${
                      index === 2
                        ? "bg-white text-[#184b38] hover:bg-[#f3ece2]"
                        : "bg-[#184b38] text-white hover:bg-[#215b45]"
                    }`}
                  >
                    Start With {pkg.name}
                  </Link>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className={`inline-flex rounded-full border px-5 py-3 text-sm font-medium transition ${
                      index === 2
                        ? "border-white/18 bg-transparent text-white hover:bg-white/8"
                        : "border-[#d8cfc5] bg-white text-[#4e453f] hover:bg-[#faf7f2]"
                    }`}
                  >
                    See more
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr_0.95fr]">
            <div className="rounded-[1.5rem] border border-black/6 bg-[#fdfaf6] p-6">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">How It Works</p>
              <div className="mt-4 space-y-3">
                {flowSteps.map((title, index) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#184b38] text-xs font-medium text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-[#4e453f]">{title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/6 bg-[#fdfaf6] p-6">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">Why Couples Choose This</p>
              <div className="mt-4 space-y-3">
                {[...reassurancePoints, ...emotionalPoints].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-black/6 bg-white/80 px-4 py-3 text-sm leading-6 text-[#2d241f]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/6 bg-[#f7fbf8] p-6">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">Three Style Directions</p>
              <div className="mt-4 space-y-3">
                {featuredThemes.map((theme) => (
                  <Link
                    key={theme.id}
                    href={`/wedding?theme=${theme.id}`}
                    className="block overflow-hidden rounded-[1rem] border border-black/6 bg-white"
                  >
                    <div className="h-24 w-full" style={theme.previewStyle} />
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-[#241f1b]">{theme.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#9a7d64]">{theme.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/6 bg-white/95 p-4 shadow-[0_-12px_30px_rgba(52,35,24,0.1)] backdrop-blur md:hidden">
        <Link
          href="/get-started"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#184b38] px-6 py-3.5 text-sm font-medium text-white"
        >
          Start Your Website
        </Link>
      </div>
    </main>
  );
}
