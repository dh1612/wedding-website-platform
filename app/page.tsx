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
  const featuredThemes = weddingThemes.slice(0, 3);

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
            <a href="#couple-area" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Couple Area
            </a>
            <a href="#templates" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Templates
            </a>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
              style={{ color: "#ffffff", backgroundColor: "#184b38" }}
            >
              Start Your Website
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
              Start Your Website
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

        <div className="rounded-[2.4rem] bg-[#184b38] p-5 shadow-[0_24px_80px_rgba(18,39,31,0.2)]">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/16 bg-white/10">
              <div
                className="h-[380px] w-full bg-cover bg-center sm:h-[520px]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
                }}
              />
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[1.7rem] border border-white/16 bg-white/10">
                <div
                  className="h-[240px] w-full bg-cover bg-center sm:h-[300px]"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
                  }}
                />
              </div>
              <div className="rounded-[1.7rem] border border-white/12 bg-white/92 p-6 shadow-[0_20px_60px_rgba(17,28,23,0.18)]">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#9a7d64]">What makes it different</p>
                <p className="mt-3 text-2xl leading-tight">
                  A done-for-you service with beautiful design, structure, and review built in.
                </p>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  Couples share what they know, the first version is prepared for them, and everything stays private until it is ready to review.
                </p>
              </div>
            </div>
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
              Five clear steps, with no builder feel and no complicated setup.
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

      <section id="couple-area" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-14">
        <div className="rounded-[2.2rem] border border-black/6 bg-[#fdfaf6] p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Couple Area</p>
              <h2 className="text-4xl leading-none sm:text-5xl">A calm private space for the couple after the website is underway</h2>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                For couples who choose the fuller package, there is also a private planning space for RSVP updates, checklists, and key dates.
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
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_20px_50px_rgba(52,35,24,0.08)]">
                <h3 className="text-2xl">RSVPs</h3>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  Keep the guest list organised without a spreadsheet.
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_20px_50px_rgba(52,35,24,0.08)]">
                <h3 className="text-2xl">Checklist</h3>
                <p className="mt-3 text-base leading-7 text-[#5f564e]">
                  Keep suppliers, reminders, and wedding tasks in one place.
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-black/6 bg-[#184b38] p-6 text-white shadow-[0_20px_50px_rgba(24,75,56,0.18)]">
                <h3 className="text-2xl">Key Dates</h3>
                <p className="mt-3 text-base leading-7 text-white/82">
                  A simple planning overview without turning the process into another job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-14">
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
    </main>
  );
}
