import Link from "next/link";
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
    summary: "Adds copy polish and a more refined first version with less back-and-forth.",
    points: [
      "Everything in Basic",
      "AI-assisted wording polish",
      "More finished first version",
      "Optional concierge touches"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR645",
    summary: "Includes the website plus the private couple area and planning support.",
    points: [
      "Everything in Smart",
      "Private couple area",
      "Checklist, RSVP and planning tools",
      "Higher-touch delivery"
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

const featuredThemes = weddingThemes.slice(0, 3);

const portalPreviewCards = [
  {
    label: "Checklist",
    title: "A calm task list for the final details",
    tone: "soft"
  },
  {
    label: "RSVP View",
    title: "Guest replies that stay easy to read",
    tone: "white"
  },
  {
    label: "Key Dates",
    title: "Important deadlines in one timeline",
    tone: "dark"
  },
  {
    label: "Seating Plan",
    title: "A clearer way to think through tables",
    tone: "soft"
  }
];

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] pb-24 text-[#1f1d1a] md:pb-0">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b6e56]">
              David&apos;s Wedding Solutions
            </p>
            <p className="mt-1 text-lg font-semibold">Done-for-you wedding websites</p>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <a href="#example" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              View Example
            </a>
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
                <a href="#example" className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]">
                  View Example
                </a>
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

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-10 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-16">
        <div className="space-y-7">
          <div className="space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Done-for-you wedding websites
            </p>
            <h1 className="max-w-3xl text-5xl leading-none sm:text-6xl lg:text-7xl">
              We build your wedding website for you
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e] sm:text-xl">
              No DIY builder. No complicated setup. Just a beautiful, ready-to-share website.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Start Your Website
            </Link>
            <Link
              href={exampleHref}
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              View Example
            </Link>
          </div>

          <div className="space-y-1">
            <p className="text-sm leading-6 text-[#6d655d]">
              Takes ~2 minutes to get your first version started.
            </p>
            <p className="text-sm leading-6 text-[#184b38]">
              No payment needed to get your first version started.
            </p>
          </div>

          <div className="rounded-[1.7rem] border border-[#184b38]/10 bg-[#f6fbf8] p-5 text-base leading-7 text-[#486159]">
            This is not a DIY builder. We prepare the first version for you. You review, we refine, then you go live.
          </div>
        </div>

        <div className="rounded-[2.4rem] bg-[#184b38] p-5 shadow-[0_24px_80px_rgba(18,39,31,0.2)]">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/16 bg-white/10">
              <div
                className="h-[380px] w-full bg-cover bg-center sm:h-[500px]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
                }}
              />
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[1.7rem] border border-white/16 bg-white/10">
                <div
                  className="h-[220px] w-full bg-cover bg-center sm:h-[280px]"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
                  }}
                />
              </div>
              <div className="rounded-[1.7rem] border border-white/12 bg-white/92 p-6 shadow-[0_20px_60px_rgba(17,28,23,0.18)]">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">Service promise</p>
                <p className="mt-3 text-2xl leading-tight">
                  A polished first version, prepared for you.
                </p>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  The couple shares the basics. The website is prepared, checked, and only then sent back for review.
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
                The quickest way to understand the service is to see the kind of website and private couple area a couple would actually receive.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={exampleHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-sm font-medium text-white"
                >
                  View Full Example
                </Link>
                <Link
                  href="/couple-area"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
                >
                  See Couple Area Preview
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
                    </div>
                  ))}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/82 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-3xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">How It Works</p>
            <h2 className="text-4xl leading-none sm:text-5xl">
              A simple five-step process
            </h2>
            <p className="text-lg leading-8 text-[#5f564e]">
              Done-for-you from the start, with a private review before anything is shared.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {flowSteps.map((title, index) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-black/6 bg-[#f8f4ef] p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a7d64]">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-2xl leading-tight text-[#2b2621]">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="space-y-5">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Packages</p>
          <h2 className="text-4xl leading-none sm:text-5xl">Choose the level of support</h2>
          <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
            Every package is a done-for-you service, not a DIY builder.
          </p>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#7a7168]">
          Done-for-you service. Not a DIY builder.
        </p>
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
              <Link
                href={`/get-started?package=${pkg.id}`}
                className={`mt-7 inline-flex rounded-full px-5 py-3 text-sm font-medium transition ${
                  index === 2
                    ? "bg-white text-[#184b38] hover:bg-[#f3ece2]"
                    : "bg-[#184b38] text-white hover:bg-[#215b45]"
                }`}
              >
                Start With {pkg.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="why-us" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="rounded-[2.2rem] border border-black/6 bg-[#fdfaf6] p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Not A Website Builder</p>
              <h2 className="text-4xl leading-none sm:text-5xl">A service with smart software underneath</h2>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                The website is prepared for the couple. The software simply helps deliver it faster and more smoothly.
              </p>
              <div className="grid gap-4">
                {reassurancePoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-black/6 bg-white/84 p-5 text-lg font-medium text-[#2d241f] shadow-[0_14px_40px_rgba(52,35,24,0.08)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Focus On Your Wedding</p>
              <h3 className="text-3xl leading-tight sm:text-4xl">The point is to take the website off the couple’s plate</h3>
              <div className="grid gap-4">
                {emotionalPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-black/6 bg-white/84 p-5 text-lg font-medium text-[#2d241f] shadow-[0_14px_40px_rgba(52,35,24,0.08)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-[1.5rem] border border-[#184b38]/10 bg-[#f6fbf8] p-5 text-sm leading-7 text-[#486159]">
                Couples do not need to learn a builder, fill in every field perfectly, or be ready with every detail on day one.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-2 lg:px-8 lg:py-6">
        <div className="rounded-[2rem] border border-black/6 bg-white/84 p-6 shadow-[0_18px_50px_rgba(52,35,24,0.08)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Need More Detail?</p>
              <h2 className="text-3xl leading-tight sm:text-4xl">The brochure gives a quicker visual overview</h2>
              <p className="max-w-2xl text-base leading-7 text-[#5f564e]">
                Browse design directions, packages, and the private couple area without reading a long sales page.
              </p>
            </div>
            <Link
              href="/brochure"
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              View Brochure
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Three Style Directions</p>
            <h2 className="text-4xl leading-none sm:text-5xl">A quick feel for the design range</h2>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              Every website is prepared for the couple, but the style direction still shapes how it feels.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredThemes.map((theme) => (
              <Link
                key={theme.id}
                href={`/wedding?theme=${theme.id}`}
                className="overflow-hidden rounded-[1.7rem] border border-black/6 bg-[#fcfaf7] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(52,35,24,0.12)]"
              >
                <div className="h-40 w-full" style={theme.previewStyle} />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl">{theme.name}</h3>
                    <span className="text-[11px] uppercase tracking-[0.26em] text-[#9a7d64]">
                      {theme.season}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[#184b38]">{theme.label}</p>
                </div>
              </Link>
            ))}
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
