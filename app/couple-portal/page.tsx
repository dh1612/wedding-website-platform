import { DemoPortalHome } from "@/components/demo-portal-home";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import {
  ensurePortalWedding,
  listCalendarItems,
  listChecklistItems
} from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type CouplePortalPageProps = {
  searchParams?: Promise<{
    theme?: string;
  }>;
};

export default async function CouplePortalPage({
  searchParams
}: CouplePortalPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);
  const portalWedding = await ensurePortalWedding();
  const [checklistItems, calendarItems] = await Promise.all([
    listChecklistItems(portalWedding.id),
    listCalendarItems(portalWedding.id)
  ]);
  const demoNavItems = [
    { label: "Portal Home", path: `/couple-portal?theme=${theme.id}#portal-home` },
    { label: "Checklist", path: `/couple-portal?theme=${theme.id}#checklist-demo` },
    { label: "Calendar", path: `/couple-portal?theme=${theme.id}#calendar-demo` },
    { label: "RSVPs", path: `/couple-portal?theme=${theme.id}#rsvp-demo` },
    { label: "Seating", path: `/couple-portal?theme=${theme.id}#seating-demo` }
  ];

  return (
    <SiteFrame
      currentPath="/couple-portal"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="couple"
      adminNavItemsOverride={demoNavItems}
    >
      <PageHero
        eyebrow="Couple Portal"
        title="Wedding Planning Portal"
        description="Your private planning space for checklist progress, guest responses, and seating. This side should feel practical, calm, and easy to click through."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-6 flex justify-end">
          <div className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]">
            Read-only demo
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
    </SiteFrame>
  );
}
