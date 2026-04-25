import Link from "next/link";
import { weddingThemes } from "@/lib/themes";

const packageCards = [
  {
    id: "basic",
    name: "Basic",
    price: "EUR195",
    summary: "A polished done-for-you wedding website created from the couple's details and prepared for private review.",
    points: [
      "Guided details form",
      "Story, schedule, travel, FAQ and registry",
      "Private review link",
      "One premium design direction"
    ]
  },
  {
    id: "smart",
    name: "Smart",
    price: "EUR345",
    summary: "Adds AI-assisted copy polishing and a smarter guest-ready finish with less manual tidying.",
    points: [
      "Everything in Basic",
      "AI text polish from rough notes",
      "Optional AI guest concierge",
      "A more polished first version"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR595",
    summary: "The website plus private planning tools for couples who want a fuller digital wedding setup.",
    points: [
      "Everything in Smart",
      "Private couple area",
      "Checklist, RSVP and planning tools",
      "Higher-touch delivery"
    ]
  }
];

const featurePoints = [
  "A guided details form turns wedding notes into a beautifully organised first version",
  "Optional AI can tidy rough wording into polished guest-facing copy",
  "Every website is checked privately before the review link is shared",
  "The whole service is done for the couple, not handed back as a builder"
];

const flowSteps = [
  {
    step: "01",
    title: "Choose a package",
    copy: "Select the level of support that best suits the wedding."
  },
  {
    step: "02",
    title: "Share the details",
    copy: "Send over what is known so far, even if it is only rough notes."
  },
  {
    step: "03",
    title: "We prepare it",
    copy: "A polished first version of the website is prepared."
  },
  {
    step: "04",
    title: "Review privately",
    copy: "A private review link is shared once the first version has been checked."
  },
  {
    step: "05",
    title: "Go live",
    copy: "Once approved, the website is ready to share with guests."
  }
];

export default function MarketingHomePage() {
  const featuredThemes = weddingThemes.slice(0, 6);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b6e56]">
              David&apos;s Wedding Solutions
            </p>
            <p className="mt-1 text-lg font-semibold">Done-for-you wedding websites</p>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            <a href="#how-it-works" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              How It Works
            </a>
            <a href="#packages" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Packages
            </a>
            <Link
              href="/couple-area"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              Couple Area
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
              style={{ color: "#ffffff", backgroundColor: "#184b38" }}
            >
              Share Your Details
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-16">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Done-for-you wedding websites
            </p>
            <h1 className="max-w-3xl text-5xl leading-none sm:text-6xl lg:text-7xl">
              Beautiful wedding websites, prepared with minimal effort from the couple
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5f564e] sm:text-xl">
              No DIY builder, no complicated setup, and no need for the couple to have every detail ready from day one. The process is simple, guided, and handled for them.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
              style={{ color: "#ffffff", backgroundColor: "#184b38" }}
            >
              Share Your Details
            </Link>
            <a
              href="#packages"
              className="rounded-full border border-[#d8cfc5] bg-white/80 px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-white"
              style={{ color: "#4e453f", backgroundColor: "#ffffff" }}
            >
              See Packages
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.6rem] border border-black/6 bg-white/70 p-5 shadow-[0_18px_50px_rgba(52,35,24,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a7d64]">Starting from</p>
              <p className="mt-3 text-3xl">EUR195</p>
            </div>
            <div className="rounded-[1.6rem] border border-black/6 bg-white/70 p-5 shadow-[0_18px_50px_rgba(52,35,24,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a7d64]">Delivery model</p>
              <p className="mt-3 text-3xl">Done For You</p>
            </div>
            <div className="rounded-[1.6rem] border border-black/6 bg-white/70 p-5 shadow-[0_18px_50px_rgba(52,35,24,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a7d64]">Client effort</p>
              <p className="mt-3 text-3xl">Minimal</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute inset-x-0 top-0 h-[78%] rounded-[2.4rem] bg-[#184b38]" />
          <div className="absolute left-5 top-5 h-[54%] w-[48%] overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_24px_80px_rgba(18,39,31,0.28)]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
              }}
            />
          </div>
          <div className="absolute right-5 top-20 h-[44%] w-[38%] overflow-hidden rounded-[1.7rem] border border-white/20 shadow-[0_24px_80px_rgba(18,39,31,0.28)]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
              }}
            />
          </div>
          <div className="absolute bottom-8 left-10 right-10 rounded-[2rem] border border-black/6 bg-white/88 p-7 shadow-[0_24px_80px_rgba(47,31,20,0.14)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">What makes it different</p>
            <p className="mt-4 text-2xl leading-tight">
              This is not a DIY builder. It is a service with automation underneath.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5f564e]">
              The value is in the guided handover, polished templates, review step, and the reusable backend that lets each new wedding launch quickly.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-14">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/82 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="max-w-3xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">How It Works</p>
            <h2 className="text-4xl leading-none sm:text-5xl">
              A simple step-by-step flow that feels easy for the couple
            </h2>
            <p className="text-lg leading-8 text-[#5f564e]">
              The whole experience is designed to feel easy. The couple shares the essentials, and the service turns that into a guest-ready first version.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {flowSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-black/6 bg-[#f8f4ef] p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a7d64]">
                  Step {item.step}
                </p>
                <h3 className="mt-3 text-2xl leading-tight text-[#2b2621]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featurePoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-black/6 bg-[#fcfaf7] p-5 text-base leading-7 text-[#453c35]"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-14">
        <div className="space-y-5">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Packages</p>
          <h2 className="text-4xl leading-none sm:text-5xl">Choose the level of polish and support</h2>
          <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
            Every package starts with the same core idea: the couple shares the details, and the service turns them into an elegant wedding website. The higher tiers add extra polish and planning support.
          </p>
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
              <Link
                href={`/get-started?package=${pkg.id}`}
                className={`mt-7 inline-flex rounded-full px-5 py-3 text-sm font-medium transition ${
                  index === 2
                    ? "bg-white text-[#184b38] hover:bg-[#f3ece2]"
                    : "bg-[#184b38] text-white hover:bg-[#215b45]"
                }`}
                style={
                  index === 2
                    ? { color: "#184b38", backgroundColor: "#ffffff" }
                    : { color: "#ffffff", backgroundColor: "#184b38" }
                }
              >
                Choose {pkg.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-14">
        <div className="rounded-[2.2rem] border border-black/6 bg-[#fdfaf6] p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Couple Area</p>
              <h2 className="text-4xl leading-none sm:text-5xl">A calm private space for the couple after the website is underway</h2>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                The public website is the first part of the service. After that, couples can have their own private area for RSVPs, planning notes, checklists, and key dates.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/couple-area"
                  className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
                  style={{ color: "#ffffff", backgroundColor: "#184b38" }}
                >
                  Explore The Couple Area
                </Link>
                <Link
                  href="/couple-area"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
                  style={{ color: "#4e453f", backgroundColor: "#ffffff" }}
                >
                  See Couple Area Preview
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_20px_50px_rgba(52,35,24,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Guest List</p>
                <h3 className="mt-3 text-2xl">RSVPs and guest updates</h3>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  A simple place to see who is coming, add guests manually, and keep the list organised.
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_20px_50px_rgba(52,35,24,0.08)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Planning</p>
                <h3 className="mt-3 text-2xl">Checklist and key dates</h3>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  Couples can keep important to-dos and dates together without juggling separate tools.
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-black/6 bg-[#184b38] p-7 text-white shadow-[0_20px_50px_rgba(24,75,56,0.18)] md:col-span-2">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#d8c6a7]">Premium Feature</p>
                <h3 className="mt-3 text-3xl leading-tight">A planning space that feels supportive, not complicated</h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/82">
                  This sits behind the main website service, so couples first understand the beautiful guest-facing website and then discover the extra value of a private planning space.
                </p>
                <div className="mt-6 rounded-[1.2rem] bg-white/10 p-4">
                  <p className="text-sm font-medium text-white">Checklist, RSVPs, key dates, and planning notes</p>
                  <p className="mt-2 text-sm text-white/78">Everything sits in one calm private area, so the couple is not piecing things together across separate tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-14">
        <div className="rounded-[2.2rem] border border-black/6 bg-white/84 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Templates</p>
              <h2 className="text-4xl leading-none sm:text-5xl">Preview the style directions behind the service</h2>
              <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
                Samples are there to show the quality and range of the finished product. They support the sale, but the main path is still package selection and sharing your details.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#215b45]"
              style={{ color: "#ffffff", backgroundColor: "#184b38" }}
            >
              Browse Templates
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredThemes.map((theme) => (
              <Link
                key={theme.id}
                href={`/templates?theme=${theme.id}`}
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
                  <p className="mt-3 text-base leading-7 text-[#5f564e]">{theme.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2.2rem] bg-[#184b38] p-8 text-white shadow-[0_26px_80px_rgba(18,39,31,0.24)] sm:p-10 lg:flex lg:items-end lg:justify-between lg:p-14">
          <div className="max-w-2xl space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#d8c6a7]">Enquiries</p>
            <h2 className="text-4xl leading-none sm:text-5xl">A cleaner funnel for ads, DMs, and enquiries</h2>
            <p className="text-lg leading-8 text-white/82">
              Couples land here, choose a package, share the wedding details, and then receive a private review link once the first version has been prepared. The deeper planning tools stay behind the scenes until they are needed.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-center text-sm font-medium text-[#184b38] shadow-sm transition hover:bg-[#f3ece2]"
              style={{ color: "#184b38", backgroundColor: "#ffffff" }}
            >
              Share Your Details
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full border border-white/24 px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-white/10"
              style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.24)" }}
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
