import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { packageOffers } from "@/lib/package-offers";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return packageOffers.map((offer) => ({ slug: offer.id }));
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const offer = packageOffers.find((item) => item.id === slug);

  if (!offer) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <BrandLogo subtitle={`${offer.name} package`} />
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/#example"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              View Example
            </Link>
            <Link
              href="/brochure#packages"
              className="rounded-full px-4 py-2 text-sm text-[#6b5c50] transition hover:bg-white"
            >
              Back To Brochure
            </Link>
            <Link
              href={`/get-started?package=${offer.id}`}
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Start {offer.name}
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 lg:px-8 lg:pb-14">
        <div className="rounded-[2.5rem] border border-black/6 bg-white/88 p-8 shadow-[0_24px_70px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                {offer.accentLabel}
              </p>
              <h1 className="text-5xl leading-none sm:text-6xl">{offer.heroTitle}</h1>
              <p className="max-w-2xl text-lg leading-8 text-[#5f564e]">{offer.heroCopy}</p>
              <p className="text-base leading-7 text-[#184b38]">{offer.valueNote}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/get-started?package=${offer.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
                >
                  Start {offer.name}
                </Link>
                <Link
                  href="/wedding?theme=aegean-romance"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
                >
                  View Public Example
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#184b38] p-6 text-white shadow-[0_24px_80px_rgba(18,39,31,0.2)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#d8c6a7]">At a glance</p>
              <h2 className="mt-4 text-4xl">{offer.name}</h2>
              <p className="mt-4 text-4xl">{offer.price}</p>
              <div className="mt-6 grid gap-3">
                {offer.included.map((item) => (
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

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-[2.3rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              What this actually gives the couple
            </p>
            <h2 className="text-4xl leading-none sm:text-5xl">Why {offer.name} is worth it</h2>
            <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
              This package is designed to reduce effort, remove guesswork, and make the couple feel
              supported rather than handed a tool.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {offer.features.map((feature, index) => (
              <article
                key={feature.title}
                className={`rounded-[1.8rem] p-7 shadow-[0_18px_50px_rgba(52,35,24,0.08)] ${
                  index === 0
                    ? "bg-[#184b38] text-white"
                    : "border border-black/6 bg-[#fcfaf7] text-[#241f1b]"
                }`}
              >
                <p
                  className={`text-[11px] uppercase tracking-[0.28em] ${
                    index === 0 ? "text-[#d8c6a7]" : "text-[#9a7d64]"
                  }`}
                >
                  Feature
                </p>
                <h3 className="mt-4 text-3xl">{feature.title}</h3>
                <p
                  className={`mt-4 text-base leading-7 ${
                    index === 0 ? "text-white/84" : "text-[#5f564e]"
                  }`}
                >
                  {feature.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/get-started?package=${offer.id}`}
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Choose {offer.name}
            </Link>
            <Link
              href="/brochure#packages"
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-7 py-3.5 text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
            >
              Back To Packages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
