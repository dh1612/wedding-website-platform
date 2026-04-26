import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import {
  createWeddingDraftAction,
  deleteWeddingDraftAction
} from "@/app/admin/actions";
import { listWeddings } from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type AdminPageProps = {
  searchParams?: Promise<{
    theme?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);
  const weddings = await listWeddings().catch(() => []);

  return (
    <SiteFrame
      currentPath="/admin"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="operator"
      adminNavItemsOverride={[]}
      showFooter={false}
    >
      <PageHero
        eyebrow="Operator Backend"
        title="Preparation Queue"
        description="Use this dashboard to open each wedding's own workspace. Once inside a wedding, you can manage its preview, portal, RSVPs, checklist support, and seating separately."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Manual Draft</p>
            <h2 className="mt-3 text-3xl">Create One Yourself</h2>
            <p className="prose-copy mt-3">
              This is still useful for manual setups, but the main path is now client submission first, followed by your own review and polish.
            </p>
            <form action={createWeddingDraftAction} className="mt-6 space-y-4">
              <input
                name="title"
                placeholder="Example: Olivia & Liam"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="eventDate"
                type="date"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <button className="accent-button rounded-full px-6 py-3 text-sm font-medium">
                Create Draft Wedding
              </button>
            </form>
          </div>

          <div className="section-shell rounded-[2rem] p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Client Submissions</p>
                <h2 className="mt-3 text-3xl">Needs Review</h2>
              </div>
              <div className="accent-panel rounded-full px-4 py-2 text-sm">
                {weddings.length} weddings
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {weddings.length ? (
                weddings.map((record) => (
                  <div key={record.id} className="accent-panel rounded-[1.5rem] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xl font-medium">{record.title}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {record.slug} · {record.status}
                          {record.eventDate
                            ? ` · ${new Date(record.eventDate).toLocaleDateString("en-IE")}`
                            : ""}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          Submitted {new Date(record.createdAt).toLocaleDateString("en-IE")}
                          {(() => {
                            const plannerSettings = record.plannerSettingsJson as
                              | { intake?: { email?: string; packageTier?: string } }
                              | null;
                            const email = plannerSettings?.intake?.email;
                            const packageTier = plannerSettings?.intake?.packageTier;
                            if (!email && !packageTier) return "";
                            return ` · ${packageTier ? `${packageTier} package` : ""}${packageTier && email ? " · " : ""}${email ?? ""}`;
                          })()}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {record._count.guests} guests · {record._count.rsvpResponses} RSVP responses · {record._count.seatingPlans} seating plans
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/weddings/${record.slug}`}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Open Wedding Workspace
                        </Link>
                        <Link
                          href={`/preview/${record.slug}`}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Review Draft
                        </Link>
                        <Link
                          href={`/couple-portal/${record.slug}`}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Couple Portal
                        </Link>
                        <Link
                          href={`/rsvp-dashboard/${record.slug}`}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          RSVP Manager
                        </Link>
                        <Link
                          href={`/plan-your-tables/${record.slug}`}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Seating
                        </Link>
                        <Link
                          href={`/site/${record.slug}`}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Live Page
                        </Link>
                        {record.status === "draft" ? (
                          <form action={deleteWeddingDraftAction}>
                            <input type="hidden" name="slug" value={record.slug} />
                            <button
                              type="submit"
                              className="rounded-full border border-[#b86a53]/25 bg-[#fff3ef] px-4 py-2 text-sm text-[#8a4c3a] transition hover:bg-[#fde8e2]"
                            >
                              Delete Draft
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="accent-panel rounded-[1.5rem] p-5">
                  No client submissions yet. Once someone shares their details, the draft will appear here for review.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
