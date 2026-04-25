import { redirect } from "next/navigation";
import Link from "next/link";
import { CoupleChecklist } from "@/components/couple-checklist";
import { LogoutButton } from "@/components/logout-button";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { WeddingCalendarPlanner } from "@/components/wedding-calendar-planner";
import { buildPortalNavItems } from "@/lib/site-navigation";
import {
  getWeddingSiteBySlug,
  listCalendarItems,
  listChecklistItems
} from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type CouplePortalBySlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CouplePortalBySlugPage({
  params
}: CouplePortalBySlugPageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord?.id || !weddingRecord.contentJson) {
    redirect("/");
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const theme = getThemeById(weddingData.theme);
  const [checklistItems, calendarItems] = await Promise.all([
    listChecklistItems(weddingRecord.id),
    listCalendarItems(weddingRecord.id)
  ]);
  const portalBasePath = `/couple-portal/${slug}`;
  const navItems = buildPortalNavItems(portalBasePath);

  return (
    <SiteFrame
      currentPath={portalBasePath}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="couple"
      adminNavItemsOverride={navItems}
      weddingData={weddingData}
    >
      <PageHero
        eyebrow="Couple Portal"
        title={`${weddingData.couple} Planning Portal`}
        description="A private planning space for checklist progress, guest replies, key dates, and the seating plan."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-6 flex justify-end">
          <LogoutButton />
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <p className="eyebrow">Portal Home</p>
          <h2 className="mt-4 text-4xl">Choose What To Work On</h2>
          <p className="prose-copy mt-4 max-w-3xl text-lg">
            Everything for {weddingData.couple} is gathered here in one place. Start with the checklist, then move through dates, guest replies, and seating as plans come together.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Link
              href="#checklist"
              className="section-shell rounded-[2rem] p-8 transition hover:-translate-y-1"
            >
              <p className="eyebrow">Start Here</p>
              <h3 className="mt-3 text-3xl">Checklist</h3>
              <p className="prose-copy mt-3">
                Keep wedding jobs, notes, and planning reminders in one place.
              </p>
              <div className="mt-6 accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium">
                Open Checklist
              </div>
            </Link>

            <Link
              href="#calendar"
              className="section-shell rounded-[2rem] p-8 transition hover:-translate-y-1"
            >
              <p className="eyebrow">Timeline</p>
              <h3 className="mt-3 text-3xl">Calendar Planner</h3>
              <p className="prose-copy mt-3">
                Add key dates and keep a clear view of what is coming up before the wedding.
              </p>
              <div className="mt-6 accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium">
                Open Calendar
              </div>
            </Link>

            <Link
              href={`/rsvp-dashboard/${slug}`}
              className="section-shell rounded-[2rem] p-8 transition hover:-translate-y-1"
            >
              <p className="eyebrow">Guests</p>
              <h3 className="mt-3 text-3xl">RSVP Dashboard</h3>
              <p className="prose-copy mt-3">
                See who is attending, who still needs a reply, and any dietary requirements or notes.
              </p>
              <div className="mt-6 accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium">
                Open RSVPs
              </div>
            </Link>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Link
              href={`/plan-your-tables/${slug}`}
              className="section-shell rounded-[2rem] p-8 transition hover:-translate-y-1"
            >
              <p className="eyebrow">Seating</p>
              <h3 className="mt-3 text-3xl">Plan Your Tables</h3>
              <p className="prose-copy mt-3">
                Build the room layout, place tables, and decide where each guest should sit.
              </p>
              <div className="mt-6 accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium">
                Open Seating Plan
              </div>
            </Link>

            <div className="section-shell rounded-[2rem] p-8">
              <p className="eyebrow">Private Access</p>
              <h3 className="mt-3 text-3xl">This Portal Belongs To This Wedding</h3>
              <p className="prose-copy mt-3">
                This private area is connected to the same wedding record as the public website, so checklist items, guest replies, and key dates stay tied to the correct couple.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WeddingCalendarPlanner
        weddingDateLabel={weddingData.date}
        initialItems={calendarItems.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          startDate: item.startDate.toISOString().slice(0, 10),
          endDate: item.endDate.toISOString().slice(0, 10),
          notes: item.notes ?? ""
        }))}
        apiBasePath={`/api/portal/${slug}`}
      />
      <CoupleChecklist
        initialItems={checklistItems.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          completed: item.completed,
          notes: item.notes ?? ""
        }))}
        apiBasePath={`/api/portal/${slug}`}
      />
    </SiteFrame>
  );
}
