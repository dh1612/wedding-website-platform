import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MarketingFooter } from "@/components/marketing-footer";
import { buildSampleWebsiteHref } from "@/lib/brand";
import { defaultSampleWebsiteShowcase } from "@/lib/sample-websites";

const exampleHref = buildSampleWebsiteHref();

const packageCards = [
  {
    id: "basic",
    name: "Basic",
    price: "EUR245",
    summary: "An elegant information-only wedding website, built from the details already shared.",
    points: [
      "Done-for-you information website",
      "Schedule, travel, stay and FAQ sections",
      "Private review before it is shared",
      "One premium design direction"
    ]
  },
  {
    id: "smart",
    name: "Smart",
    price: "EUR395",
    summary: "Adds website RSVP with guest tracking and a guided walkthrough.",
    points: [
      "Everything in Basic",
      "RSVP via the website",
      "Guest tracking dashboard",
      "1-hour walkthrough call"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR745",
    summary:
      "The full experience, including digital invites, the private couple portal, AI concierge, and dedicated premium support.",
    points: [
      "Everything in Smart",
      "Digital invite generation",
      "Private couple portal",
      "AI concierge access",
      "Checklist, RSVP and planning tools",
      "Dedicated premium support"
    ]
  }
];

const flowSteps = [
  {
    title: "Share the starting details",
    copy: "Names, date, location, and anything guests need to know so the first version has the right foundation."
  },
  {
    title: "We shape the first draft for you",
    copy: "The wording, layout, and overall direction are curated around your day rather than left to you to assemble."
  },
  {
    title: "You review it privately",
    copy: "Nothing is shared until it feels right, so any changes can be made quietly before guests ever see it."
  },
  {
    title: "We refine the final version together",
    copy: "Details, tone, styling, and guest-facing information are polished until the website feels ready to send out."
  },
  {
    title: "You go live with the right level of support",
    copy: "Choose the package that fits your day, from a clean information site through to RSVP and the full private planning side."
  }
];

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
              View Example Website
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
              Get My Website Started
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
                  View Example Website
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
                  Get My Website Started
                </Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 pt-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-10 lg:px-8 lg:pt-16">
        <div className="space-y-7">
          <div className="space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Wedding websites tailored for you
            </p>
            <h1 className="max-w-3xl text-[3.1rem] leading-none sm:text-[4.4rem] lg:text-6xl">
              Wedding websites tailored to your style, your guests, and your day.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e] sm:text-xl">
              This is a done-for-you service. You tell us what you need, and we create the website
              with you and for you. Choose the package that matches the level of support you want,
              from a beautifully simple guest website to the full planning portal.
            </p>
          </div>

          <div className="rounded-[1.7rem] border border-[#184b38]/10 bg-[#f6fbf8] p-5 sm:p-6">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">How it works</p>
            <h2 className="mt-3 text-2xl leading-tight text-[#184b38] sm:text-3xl">
              A guided, curated process from first draft to final website
            </h2>
            <div className="mt-5 space-y-4">
              {flowSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#184b38] text-xs font-medium text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base font-medium leading-6 text-[#2d241f]">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#6d655d]">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="hidden items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45] md:inline-flex"
            >
              Get My Website Started
            </Link>
            <Link
              href={exampleHref}
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              View Example Website
            </Link>
          </div>

          <div className="rounded-[1.7rem] border border-[#184b38]/10 bg-[#f6fbf8] p-5 text-base leading-7 text-[#486159]">
            Start with a strong first draft, then choose whether you want a simple guest website,
            RSVP through the website, or the full private planning side as well.
          </div>
        </div>

        <div className="self-start rounded-[2rem] bg-[#184b38] p-4 shadow-[0_24px_80px_rgba(18,39,31,0.2)] sm:rounded-[2.4rem] sm:p-5">
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
            <div className="overflow-hidden rounded-[1.6rem] border border-white/16 bg-white/10 sm:rounded-[2rem]">
              <div
                className="h-[300px] w-full bg-cover bg-center sm:h-[500px]"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto w-full max-w-6xl px-6 py-6 lg:px-8 lg:py-10">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Pricing & Features</p>
              <h2 className="text-4xl leading-none sm:text-5xl">Choose the level of support</h2>
              <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
                Choose between an information-only guest website, website RSVP with guest
                tracking, or the full planning side with digital invites and premium support.
              </p>
            </div>
            <Link
              href="/brochure"
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              See full package details
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
                    Get My Website Started
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
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4 lg:px-8 lg:py-10">
        <div className="rounded-[2.2rem] border border-black/6 bg-[#f6fbf8] p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                Why this service
              </p>
              <h2 className="text-4xl leading-none sm:text-5xl">
                A more personal alternative to doing it all in a builder
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                This is a small Irish business, and the support stays direct and hands-on. You are
                not left inside a generic template builder or routed through a support queue. We
                shape the website with you, keep the process manageable, and help you get it to a
                version you feel happy to share.
              </p>
              <div className="rounded-[1.3rem] border border-[#184b38]/12 bg-white px-5 py-4 text-sm leading-7 text-[#486159]">
                If you would rather not spend evenings trying to bend a template builder into the
                right shape, this is built for that exact couple.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-black/6 bg-white p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                  Direct support
                </p>
                <h3 className="mt-3 text-2xl leading-tight">You will always deal directly with me</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f564e]">
                  Questions, edits, and support stay personal. The aim is to keep the process clear
                  and responsive, without overcomplicating it or disappearing behind generic
                  customer support.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-black/6 bg-white p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                  Tailored around you
                </p>
                <h3 className="mt-3 text-2xl leading-tight">The website is shaped around your day</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f564e]">
                  The wording, structure, guest details, and final styling are adjusted around what
                  matters to you, rather than forcing everything into a rigid one-size-fits-all
                  setup.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-black/6 bg-white p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                  Boundaries built in
                </p>
                <h3 className="mt-3 text-2xl leading-tight">Support stays clear, calm, and package-led</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f564e]">
                  The level of input and support is matched to the package chosen, so couples get
                  real help without unclear expectations about what is included.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-black/6 bg-[#184b38] p-6 text-white shadow-[0_18px_50px_rgba(52,35,24,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d9c39f]">
                  Built to be shared
                </p>
                <h3 className="mt-3 text-2xl leading-tight">
                  The goal is a polished website you feel confident sending out
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  From a beautifully simple guest website to the full planning portal, the aim is
                  the same: a wedding website that feels considered, useful, and genuinely yours.
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
                See exactly what you&apos;ll get
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                The quickest way to understand the service is to open a fuller example website and
                see how the guest-facing experience actually comes together.
              </p>
              <div className="rounded-[1.3rem] border border-[#184b38]/12 bg-[#f6fbf8] px-5 py-4 text-sm leading-7 text-[#486159]">
                This sample includes accommodation suggestions, local suppliers, RSVP, and a
                second-day section, so couples can see the richer version of what the website can
                become.
              </div>
              <div className="pt-1">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-sm font-medium text-white"
                >
                  Let us build your website
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
                    backgroundImage: `url('${defaultSampleWebsiteShowcase.image}')`
                  }}
                />
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
                    Public Website Example
                  </p>
                  <h3 className="mt-3 text-3xl">{defaultSampleWebsiteShowcase.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#5f564e]">
                    {defaultSampleWebsiteShowcase.blurb}
                  </p>
                  <p className="mt-5 text-sm font-medium text-[#184b38]">View Example Website</p>
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
                  Premium adds the full couple portal, digital invites styled to match the
                  website, and the most dedicated level of support, so the couple is guided more
                  closely through the final setup rather than left figuring it all out alone.
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
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/6 bg-white/95 p-4 shadow-[0_-12px_30px_rgba(52,35,24,0.1)] backdrop-blur md:hidden">
        <Link
          href="/get-started"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#184b38] px-6 py-3.5 text-sm font-medium text-white"
        >
          Get My Website Started
        </Link>
      </div>
      <MarketingFooter />
    </main>
  );
}
