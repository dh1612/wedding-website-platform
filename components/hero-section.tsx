import Image from "next/image";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";
import type { WeddingData } from "@/types/wedding";

type HeroSectionProps = {
  themeId: string;
  weddingData?: WeddingData;
};

function SharedActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href="#rsvp"
        className="accent-button rounded-full px-6 py-3 text-center text-sm font-medium"
      >
        RSVP Details
      </a>
      <a
        href="#faq"
        className="accent-outline rounded-full px-6 py-3 text-center text-sm font-medium transition hover:bg-white/80"
      >
        Wedding Details
      </a>
    </div>
  );
}

export function HeroSection({ themeId, weddingData }: HeroSectionProps) {
  const wedding = weddingData ?? getWeddingData();
  const theme = getThemeById(themeId);
  const heroImage = theme.heroImage;
  const detailImage = theme.detailImage;

  if (theme.heroLayout === "full-bleed") {
    return (
      <section id="top" className="mx-auto w-full max-w-6xl px-6 pb-10 pt-4 lg:px-8 lg:pb-18">
        <div className="relative min-h-[640px] overflow-hidden rounded-[2rem] border border-black/5 shadow-[var(--shadow)]">
          <Image src={heroImage} alt={`${theme.name} hero`} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,33,33,0.56)_0%,rgba(20,33,33,0.2)_46%,rgba(20,33,33,0.18)_100%)]" />
          {detailImage ? (
            <div className="absolute bottom-6 right-6 hidden h-56 w-44 overflow-hidden rounded-[1.5rem] border border-white/30 bg-white/10 shadow-[var(--shadow)] backdrop-blur md:block">
              <Image
                src={detailImage}
                alt={`${theme.name} detail`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
            </div>
          ) : null}
          <div className="relative flex min-h-[640px] items-end px-8 py-10 sm:px-12 lg:px-16">
            <div className="max-w-2xl rounded-[2rem] border border-white/20 bg-white/12 p-8 text-white backdrop-blur-md sm:p-10">
              <p className="text-xs uppercase tracking-[0.34em] text-white/72">
                Wedding Day
              </p>
              <h1 className="mt-4 text-5xl leading-none sm:text-6xl lg:text-7xl">
                {wedding.couple}
              </h1>
              <div className="mt-5 space-y-2 text-base uppercase tracking-[0.24em] text-white/74 sm:text-lg">
                <p>{wedding.date}</p>
                <p>{wedding.locationSummary}</p>
              </div>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                {wedding.tagline}
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/76">
                {wedding.announcement}
              </p>
              <div className="mt-8">
                <SharedActions />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme.heroLayout === "editorial-frame") {
    return (
      <section
        id="top"
        className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 pt-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-18"
      >
        <div className="section-shell relative overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-14">
          <div className="absolute inset-0" style={{ background: "var(--hero-glow)" }} />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="eyebrow">Wedding Day</p>
              <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
                {wedding.couple}
              </h1>
              <div className="space-y-2 text-lg text-[var(--muted)] sm:text-xl">
                <p>{wedding.date}</p>
                <p>{wedding.locationSummary}</p>
              </div>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
              {wedding.tagline}
            </p>
            <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
              {wedding.announcement}
            </p>
            <SharedActions />
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <div className="absolute inset-y-0 right-0 w-[88%] rounded-[2rem] border border-[var(--border)] bg-[var(--accent-soft)] shadow-[var(--shadow)]" />
          <div className="absolute left-0 top-8 h-[86%] w-[82%] overflow-hidden rounded-[2rem] border border-white/40 bg-white p-3 shadow-[var(--shadow)]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
              <Image src={heroImage} alt={`${theme.name} hero`} fill priority className="object-cover" />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 max-w-sm rounded-[1.6rem] border border-[var(--border)] bg-white/92 p-6 shadow-[var(--shadow)] backdrop-blur">
            <p className="eyebrow">Welcome</p>
            <p className="mt-3 text-lg leading-7 text-[var(--foreground)]">
              Everything guests need for the day is gathered here, from timings and travel to key details for the celebration.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (theme.heroLayout === "panorama") {
    return (
      <section id="top" className="mx-auto w-full max-w-6xl px-6 pb-10 pt-4 lg:px-8 lg:pb-18">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[var(--shadow)]">
          <div className="relative min-h-[400px]">
            <Image src={heroImage} alt={`${theme.name} hero`} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,29,28,0.18)_0%,rgba(19,29,28,0.44)_100%)]" />
          </div>
          <div className="section-shell -mt-14 relative mx-6 mb-6 rounded-[2rem] p-8 sm:p-10 lg:mx-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <p className="eyebrow">Wedding Day</p>
                <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
                  {wedding.couple}
                </h1>
                <div className="space-y-2 text-lg text-[var(--muted)] sm:text-xl">
                  <p>{wedding.date}</p>
                  <p>{wedding.locationSummary}</p>
                </div>
              </div>
              <div className="space-y-5">
                <p className="text-lg leading-8 text-[var(--muted)]">{wedding.tagline}</p>
                <p className="text-base leading-7 text-[var(--muted)]">
                  {wedding.announcement}
                </p>
                <SharedActions />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme.heroLayout === "collage") {
    return (
      <section
        id="top"
        className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 pt-4 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-18"
      >
        <div className="section-shell relative overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-14">
          <div className="absolute -right-8 top-10 h-28 w-28 rounded-full border-[14px] border-[var(--gold)]/50" />
          <div className="absolute right-12 top-24 h-20 w-20 rounded-full border-[10px] border-[var(--accent)]/30" />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="eyebrow">Wedding Day</p>
              <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
                {wedding.couple}
              </h1>
              <div className="space-y-2 text-lg text-[var(--muted)] sm:text-xl">
                <p>{wedding.date}</p>
                <p>{wedding.locationSummary}</p>
              </div>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
              {wedding.tagline}
            </p>
            <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
              {wedding.announcement}
            </p>
            <SharedActions />
          </div>
        </div>
        <div className="grid min-h-[520px] gap-5 lg:grid-rows-[1fr_0.58fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[var(--shadow)]">
            <Image src={heroImage} alt={`${theme.name} hero`} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          </div>
          <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="accent-panel rounded-[1.6rem] p-6">
              <p className="eyebrow">{wedding.ceremony.title}</p>
              <p className="mt-3 text-2xl leading-tight">{wedding.ceremony.time}</p>
            </div>
            <div className="section-shell rounded-[1.6rem] p-6">
              <p className="text-base leading-7 text-[var(--muted)]">
                {wedding.reception.location}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme.heroLayout === "split") {
    return (
      <section
        id="top"
        className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 pt-4 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:pb-18"
      >
        <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[var(--shadow)]">
          <Image src={heroImage} alt={`${theme.name} hero`} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,28,24,0.2)_0%,rgba(17,28,24,0.5)_100%)]" />
        </div>
        <div className="section-shell relative overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-14">
          <div
            className="absolute inset-0 opacity-100"
            style={{
              background:
                "radial-gradient(circle at 18% 16%, rgba(255,246,214,0.95) 0 1.2px, transparent 2px), radial-gradient(circle at 42% 12%, rgba(255,236,190,0.8) 0 1px, transparent 1.8px), radial-gradient(circle at 78% 20%, rgba(255,248,223,0.9) 0 1.3px, transparent 2.1px), linear-gradient(180deg, rgba(38,71,60,0.08), transparent 55%)"
            }}
          />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="eyebrow">Wedding Day</p>
              <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
                {wedding.couple}
              </h1>
              <div className="space-y-2 text-lg text-[var(--muted)] sm:text-xl">
                <p>{wedding.date}</p>
                <p>{wedding.locationSummary}</p>
              </div>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
              {wedding.tagline}
            </p>
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/78">
              {wedding.announcement}
            </p>
            <SharedActions />
          </div>
        </div>
      </section>
    );
  }

  if (theme.heroLayout === "cinematic") {
    return (
      <section id="top" className="mx-auto w-full max-w-6xl px-6 pb-10 pt-4 lg:px-8 lg:pb-18">
        <div className="hero-shell relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[var(--shadow)]">
          <Image src={heroImage} alt={`${theme.name} hero`} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,15,0.34)_0%,rgba(8,18,15,0.44)_24%,rgba(8,18,15,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,52,43,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%)]" />
          <div className="relative flex min-h-[620px] flex-col items-center justify-center px-8 py-16 text-center text-white sm:px-14">
            <div className="max-w-3xl space-y-7">
              <p className="text-xs uppercase tracking-[0.42em] text-white/70 sm:text-sm">
                Wedding Day
              </p>
              <h1 className="winter-hero-title text-6xl leading-none sm:text-7xl lg:text-[7rem]">
                {wedding.couple}
              </h1>
              <div className="space-y-3 text-base uppercase tracking-[0.28em] text-white/80 sm:text-lg">
                <p>{wedding.date}</p>
                <p>{wedding.locationSummary}</p>
              </div>
              <p className="mx-auto max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                {wedding.tagline}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row">
                <a
                  href="#rsvp"
                  className="rounded-full border border-white/30 bg-white/12 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/18"
                >
                  RSVP Details
                </a>
                <a
                  href="#faq"
                  className="rounded-full border border-white/16 bg-black/16 px-6 py-3 text-sm font-medium text-white/88 backdrop-blur transition hover:bg-black/22"
                >
                  Wedding Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 pt-4 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-18"
    >
      <div className="section-shell relative overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <div className="absolute inset-0" style={{ background: "var(--hero-glow)" }} />
        <div className="relative space-y-8">
          <div className="space-y-4">
            <p className="eyebrow">Wedding Day</p>
            <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">
              {wedding.couple}
            </h1>
            <div className="space-y-2 text-lg text-[var(--muted)] sm:text-xl">
              <p>{wedding.date}</p>
              <p>{wedding.locationSummary}</p>
            </div>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
            {wedding.tagline}
          </p>
          <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
            {wedding.announcement}
          </p>
          <SharedActions />
        </div>
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[var(--shadow)]">
        <Image src={heroImage} alt={`${wedding.couple} hero`} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
      </div>
    </section>
  );
}
