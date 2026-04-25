import Link from "next/link";
import { weddingThemes } from "@/lib/themes";

const brochureThemes = weddingThemes.slice(0, 3);

const packageSlides = [
  {
    name: "Basic",
    price: "EUR245",
    copy: "A polished guest-facing website, prepared from the details already shared."
  },
  {
    name: "Smart",
    price: "EUR395",
    copy: "Adds AI-assisted copy polish and a more refined first version."
  },
  {
    name: "Premium",
    price: "EUR645",
    copy: "Includes the website plus the private couple area and planning support."
  }
];

const portalCards = [
  {
    title: "RSVP view",
    copy: "A clear guest overview without spreadsheets or back-and-forth messages."
  },
  {
    title: "Checklist",
    copy: "Important tasks and supplier reminders kept in one calm place."
  },
  {
    title: "Key dates",
    copy: "A simple planning timeline for the final weeks before the wedding."
  }
];

export default function BrochurePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/88 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b6e56]">
              Digital Brochure
            </p>
            <p className="mt-1 text-lg font-semibold">A visual walkthrough of the service</p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <a href="#overview" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Overview
            </a>
            <a href="#designs" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Designs
            </a>
            <a href="#packages" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Packages
            </a>
            <a href="#portal" className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white">
              Couple Area
            </a>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white"
              style={{ color: "#ffffff", backgroundColor: "#184b38" }}
            >
              Start Your Website
            </Link>
          </div>
        </div>
      </header>

      <section id="overview" className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 lg:px-8 lg:pb-14">
        <div className="rounded-[2.5rem] border border-black/6 bg-white/88 p-8 shadow-[0_24px_70px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Slide 1</p>
              <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
                A done-for-you wedding website, explained visually
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">
                This brochure gives a quicker feel for the service: what it looks like, how it works, what is included, and what the private couple area adds.
              </p>
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

            <div className="rounded-[2.2rem] bg-[#184b38] p-5 shadow-[0_24px_80px_rgba(18,39,31,0.2)]">
              <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                <div
                  className="min-h-[320px] rounded-[1.7rem] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1200')"
                  }}
                />
                <div className="grid gap-4">
                  <div
                    className="min-h-[150px] rounded-[1.5rem] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900')"
                    }}
                  />
                  <div className="rounded-[1.5rem] bg-white/92 p-5">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">What makes it work</p>
                    <p className="mt-3 text-xl leading-tight">
                      Beautiful design on the front, guided structure and review behind the scenes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="designs" className="mx-auto w-full max-w-6xl px-6 py-6 lg:px-8 lg:py-10">
        <div className="rounded-[2.5rem] border border-black/6 bg-white/88 p-8 shadow-[0_24px_70px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Slide 2</p>
            <h2 className="text-4xl leading-none sm:text-5xl">A few design directions, shown like a visual deck</h2>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              These are sample directions only. The point is to show style, quality, and the kind of finish the couple can expect.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {brochureThemes.map((theme) => (
              <Link
                key={theme.id}
                href={`/wedding?theme=${theme.id}`}
                className="overflow-hidden rounded-[1.9rem] border border-black/6 bg-[#fcfaf7] shadow-[0_18px_50px_rgba(52,35,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(52,35,24,0.12)]"
              >
                <div className="h-56 w-full" style={theme.previewStyle} />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-3xl leading-tight">{theme.name}</h3>
                    <span className="text-[11px] uppercase tracking-[0.26em] text-[#9a7d64]">
                      {theme.season}
                    </span>
                  </div>
                  <p className="mt-3 text-base font-medium text-[#184b38]">{theme.label}</p>
                  <p className="mt-3 text-base leading-7 text-[#5f564e]">{theme.description}</p>
                  <p className="mt-5 text-sm font-medium text-[#184b38]">Open sample website</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto w-full max-w-6xl px-6 py-6 lg:px-8 lg:py-10">
        <div className="rounded-[2.5rem] border border-black/6 bg-white/88 p-8 shadow-[0_24px_70px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Slide 3</p>
            <h2 className="text-4xl leading-none sm:text-5xl">Packages at a glance</h2>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              A quick visual comparison for couples who want to understand the options without reading a long list first.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {packageSlides.map((item, index) => (
              <article
                key={item.name}
                className={`rounded-[1.9rem] p-7 shadow-[0_18px_50px_rgba(52,35,24,0.08)] ${
                  index === 2 ? "bg-[#184b38] text-white" : "border border-black/6 bg-[#fcfaf7] text-[#241f1b]"
                }`}
              >
                <p className={`text-[11px] uppercase tracking-[0.28em] ${index === 2 ? "text-[#d8c6a7]" : "text-[#9a7d64]"}`}>
                  Package
                </p>
                <h3 className="mt-4 text-4xl">{item.name}</h3>
                <p className={`mt-4 text-4xl ${index === 2 ? "text-white" : "text-[#184b38]"}`}>{item.price}</p>
                <p className={`mt-5 text-base leading-7 ${index === 2 ? "text-white/82" : "text-[#5f564e]"}`}>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portal" className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-10">
        <div className="rounded-[2.5rem] border border-black/6 bg-white/88 p-8 shadow-[0_24px_70px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Slide 4</p>
            <h2 className="text-4xl leading-none sm:text-5xl">The private couple area</h2>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              In the fuller package, the website can be paired with a private planning area for RSVPs, checklists, and key dates.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {portalCards.map((card, index) => (
              <article
                key={card.title}
                className={`rounded-[1.9rem] p-7 shadow-[0_18px_50px_rgba(52,35,24,0.08)] ${
                  index === 1 ? "bg-[#184b38] text-white" : "border border-black/6 bg-[#fcfaf7] text-[#241f1b]"
                }`}
              >
                <p className={`text-[11px] uppercase tracking-[0.28em] ${index === 1 ? "text-[#d8c6a7]" : "text-[#9a7d64]"}`}>
                  Feature
                </p>
                <h3 className="mt-4 text-3xl">{card.title}</h3>
                <p className={`mt-4 text-base leading-7 ${index === 1 ? "text-white/84" : "text-[#5f564e]"}`}>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
