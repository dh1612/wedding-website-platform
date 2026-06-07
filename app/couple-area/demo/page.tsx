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
        <PageHero
          eyebrow="Interactive Demo"
          title="Explore the Premium couple portal"
          description="This is a fully explorable sample portal, built to show how the private planning side can feel once a wedding is underway. You can click around, test the filters, and try the planning tools freely. Nothing is saved in demo mode."
          themeId={theme.id}
          weddingData={weddingData}
          summaryActionHref="/couple-area"
          summaryActionLabel="Back to portal overview"
          summarySecondaryActionHref="/get-started?package=premium"
          summarySecondaryActionLabel="Start Premium"
        />

        <section className="mx-auto w-full max-w-6xl px-6 pb-2 pt-2 lg:px-8">
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/78 px-5 py-4 text-sm leading-7 text-[var(--muted)]">
            Demo mode is active across this portal. You can tick items off, add dates, filter the
            RSVP dashboard, and explore the seating view, but nothing here is stored once you
            leave the page.
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
      </SiteFrame>
      <MarketingFooter />
    </div>
  );
}
