import { CoupleChecklist } from "@/components/couple-checklist";
import { MarketingFooter } from "@/components/marketing-footer";
import { PageHero } from "@/components/page-hero";
import { RSVPManager } from "@/components/rsvp-manager";
import { SeatingPlanner } from "@/components/seating-planner";
import { SiteFrame } from "@/components/site-frame";
import { WeddingCalendarPlanner } from "@/components/wedding-calendar-planner";
import {
  demoPortalCalendarItems,
  demoPortalChecklistItems,
  demoPortalCustomQuestionLabels,
  demoPortalCustomQuestions,
  demoPortalGuests,
  getDemoPortalWeddingData
} from "@/lib/demo-portal-data";
import { getThemeById } from "@/lib/themes";

export default function CoupleAreaDemoPage() {
  const weddingData = getDemoPortalWeddingData();
  const theme = getThemeById("soft-blush");

  const demoNavItems = [
    { label: "Portal Home", path: "/couple-area/demo" },
    { label: "Checklist", path: "/couple-area/demo#checklist" },
    { label: "Calendar", path: "/couple-area/demo#calendar" },
    { label: "RSVPs", path: "/couple-area/demo#rsvp" },
    { label: "Seating", path: "/couple-area/demo#seating" }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)]">
      <SiteFrame
        currentPath="/couple-area/demo"
        mode="pages"
        themeId={theme.id}
        themeStyle={theme.style}
        adminView
        portalType="couple"
        adminNavItemsOverride={demoNavItems}
        weddingData={weddingData}
        homeHref="/couple-area"
        showFooter={false}
      >
        <section className="mx-auto w-full max-w-6xl px-6 pb-2 pt-6 lg:px-8">
          <div className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--accent-soft)] px-5 py-4 text-sm leading-7 text-[var(--foreground)]">
            This demo shows the private planning side couples get with Premium.
          </div>
        </section>

        <PageHero
          eyebrow="Interactive Demo"
          title="Explore the Premium couple portal"
          description="Your guests use their wedding website for the details they need. This private Premium portal is the couple’s side behind the scenes — for tasks, key dates, RSVPs, guest tracking and seating."
          themeId={theme.id}
          weddingData={weddingData}
          summaryActionHref="/wedding?theme=soft-blush&sample=manor-house"
          summaryActionLabel="View matching guest website"
          summarySecondaryActionHref="/packages/premium"
          summarySecondaryActionLabel="View Premium Package"
        />

        <section className="mx-auto w-full max-w-6xl px-6 pb-2 pt-2 lg:px-8">
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/78 px-5 py-4 text-sm leading-7 text-[var(--muted)]">
            This is a fully interactive demo. Click around freely — nothing is saved.
          </div>
        </section>

        <CoupleChecklist
          initialItems={demoPortalChecklistItems.map((item) => ({ ...item }))}
          demoMode
        />

        <WeddingCalendarPlanner
          weddingDateLabel={weddingData.date}
          initialItems={demoPortalCalendarItems.map((item) => ({ ...item }))}
          demoMode
        />

        <section id="rsvp">
          <RSVPManager
            guests={demoPortalGuests.map((guest) => ({ ...guest }))}
            customQuestionLabels={demoPortalCustomQuestionLabels}
            customSelectableQuestions={demoPortalCustomQuestions}
            showMealChoice
            demoMode
          />
        </section>

        <section id="seating" className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
          <SeatingPlanner guests={demoPortalGuests.map((guest) => ({ ...guest }))} tables={[]} />
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-2 lg:px-8">
          <div className="rounded-[2rem] border border-[var(--border)] bg-white/86 px-8 py-8 text-center shadow-[0_18px_50px_rgba(52,35,24,0.06)] sm:px-10 sm:py-10">
            <p className="mx-auto max-w-3xl text-lg leading-8 text-[var(--foreground)]">
              Like the idea of a beautiful guest website with a private planning portal behind it?
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/packages/premium"
                className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#215b45]"
              >
                View Premium Package
              </a>
            </div>
          </div>
        </section>
      </SiteFrame>
      <MarketingFooter />
    </div>
  );
}
