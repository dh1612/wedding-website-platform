import { CoupleChecklist } from "@/components/couple-checklist";
import { LogoutButton } from "@/components/logout-button";
import { WeddingCalendarPlanner } from "@/components/wedding-calendar-planner";
import Link from "next/link";
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

  return (
    <SiteFrame
      currentPath="/couple-portal"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="couple"
    >
      <PageHero
        eyebrow="Couple Portal"
        title="Wedding Planning Portal"
        description="Your private planning space for checklist progress, guest responses, and seating. This side should feel practical, calm, and easy to click through."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-6 flex justify-end">
          <LogoutButton />
        </div>
        <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <p className="eyebrow">Portal Home</p>
          <h2 className="mt-4 text-4xl">Choose What You Want To Work On</h2>
          <p className="prose-copy mt-4 max-w-3xl text-lg">
            Everything for the wedding is gathered here in one place. Start with the checklist, then move through dates, guest replies, and seating as plans come together.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Link
              href="#checklist"
              className="section-shell rounded-[2rem] p-8 transition hover:-translate-y-1"
            >
              <p className="eyebrow">Start Here</p>
              <h3 className="mt-3 text-3xl">Checklist</h3>
              <p className="prose-copy mt-3">
                Tick off planning jobs, leave comments, and keep all your to-dos in one place.
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
                Add key dates, map them against the wedding, and generate a clean timeline summary that feels closer to project planning.
              </p>
              <div className="mt-6 accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium">
                Open Calendar
              </div>
            </Link>

            <Link
              href={`/rsvp-dashboard?theme=${theme.id}`}
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
              href={`/plan-your-tables?theme=${theme.id}`}
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
              <p className="eyebrow">Planning View</p>
              <h3 className="mt-3 text-3xl">What The Calendar Is For</h3>
              <p className="prose-copy mt-3">
                This gives the couple a clearer big-picture view of the wedding timeline, with milestones like RSVPs, supplier deadlines, dress fittings, final payments, and seating lock-in shown in one generated summary.
              </p>
              <p className="prose-copy mt-4">
                Think of it as the project-management layer of the portal: add dates, click generate, then review the timeline like a lightweight Gantt chart.
              </p>
            </div>
          </div>
        </div>
      </section>
      <WeddingCalendarPlanner
        weddingDateLabel={wedding.date}
        initialItems={calendarItems.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          startDate: item.startDate.toISOString().slice(0, 10),
          endDate: item.endDate.toISOString().slice(0, 10),
          notes: item.notes ?? ""
        }))}
      />
      <CoupleChecklist
        initialItems={checklistItems.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          completed: item.completed,
          notes: item.notes ?? ""
        }))}
      />
    </SiteFrame>
  );
}
