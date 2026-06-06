import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { DemoPortalHome } from "@/components/demo-portal-home";
import { MarketingFooter } from "@/components/marketing-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ensurePortalWedding,
  listCalendarItems,
  listChecklistItems
} from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

const marketingNavItems = [
  { href: "/#example", label: "View Example Website" },
  { href: "/couple-area", label: "View Premium Couple Area Demo" },
  { href: "/#packages", label: "Packages" }
];

export default async function CoupleAreaPage() {
  const wedding = getWeddingData("manor-house");
  const previewWedding = {
    ...wedding,
    couple: "Private Couple Area",
    locationSummary: "Premium planning portal preview"
  };
  const theme = getThemeById("soft-blush");
  const portalWedding = await ensurePortalWedding();
  const [checklistItems, calendarItems] = await Promise.all([
    listChecklistItems(portalWedding.id),
    listCalendarItems(portalWedding.id)
  ]);

  const demoNavItems = [
    { label: "Portal Home", path: "/couple-area#portal-home" },
    { label: "Checklist", path: "/couple-area#checklist-demo" },
    { label: "Calendar", path: "/couple-area#calendar-demo" },
    { label: "RSVPs", path: "/couple-area#rsvp-demo" },
    { label: "Seating", path: "/couple-area#seating-demo" }
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-2 md:flex">
            {marketingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition hover:bg-white ${
                  item.href === "/couple-area" ? "bg-[#184b38] text-white" : "text-[#6b5c50]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/get-started?package=premium"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#215b45]"
            >
              Start Premium
            </Link>
          </nav>

          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/8 bg-white text-[#184b38] [&::-webkit-details-marker]:hidden">
              <span className="text-2xl leading-none">≡</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-[1.5rem] border border-black/6 bg-white p-4 shadow-[0_20px_50px_rgba(52,35,24,0.12)]">
              <div className="flex flex-col gap-2">
                {marketingNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-sm text-[#4e453f] hover:bg-[#faf7f2]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/get-started?package=premium"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[#184b38] px-5 py-3 text-sm font-medium text-white"
                >
                  Start Premium
                </Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 lg:px-8">
        <div className="space-y-4 rounded-[2.2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-12">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Premium Couple Portal Preview
          </p>
          <h1 className="text-5xl leading-none sm:text-6xl">
            See what the private planning side adds
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#5f564e]">
            This is a customer-facing preview of the Premium couple portal, so couples can see how
            the checklist, RSVP dashboard, key dates, and seating view fit alongside the wedding
            website before deciding if they want the fuller planning side.
          </p>
          <div className="rounded-[1.3rem] border border-[#184b38]/12 bg-[#f6fbf8] px-5 py-4 text-sm leading-7 text-[#486159]">
            Premium includes digital invites, the full private planning area, AI concierge access,
            and a more dedicated level of support while everything is being finalised.
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div
          data-theme={theme.id}
          style={theme.style}
          className="mx-auto w-full max-w-6xl rounded-[2.4rem] border border-black/6 bg-white/50 shadow-[0_24px_70px_rgba(52,35,24,0.08)]"
        >
          <SiteHeader
            currentPath="/couple-area"
            mode="pages"
            themeId={theme.id}
            adminView
            portalType="couple"
            adminNavItemsOverride={demoNavItems}
            weddingData={previewWedding}
            homeHref="/couple-area"
          />
          <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-10">
            <div className="mb-6 flex justify-end">
              <div className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]">
                Preview mode
              </div>
            </div>
            <DemoPortalHome
              checklistItems={checklistItems.map((item) => ({
                id: item.id,
                title: item.title,
                category: item.category,
                completed: item.completed,
                notes: item.notes ?? ""
              }))}
              calendarItems={calendarItems.map((item) => ({
                id: item.id,
                title: item.title,
                category: item.category,
                startDate: item.startDate.toISOString().slice(0, 10),
                endDate: item.endDate.toISOString().slice(0, 10),
                notes: item.notes ?? ""
              }))}
              weddingDateLabel={wedding.date}
            />
          </section>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
