import Link from "next/link";
import type { Route } from "next";
import { LogoutButton } from "@/components/logout-button";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import {
  createWeddingDraftAction,
  deleteWeddingDraftAction,
  restoreWeddingAction
} from "@/app/admin/actions";
import {
  getAdminDashboardPath,
  getAdminWeddingEditPath,
  getAdminWeddingWorkspacePath
} from "@/lib/admin-path";
import { listRecentlyDeletedWeddings, listWeddings } from "@/lib/production-repositories";
import { getPortalSecurityWarnings } from "@/lib/portal-auth";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";

type AdminPageProps = {
  searchParams?: Promise<{
    theme?: string;
    q?: string;
    status?: "draft" | "approved" | "live" | "all";
    deleted?: string;
    restored?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);
  const searchQuery = params?.q?.trim() ?? "";
  const statusFilter = params?.status ?? "all";
  const deletedSlug = params?.deleted?.trim() ?? "";
  const restoredSlug = params?.restored?.trim() ?? "";
  const weddings = await listWeddings({
    query: searchQuery,
    status: statusFilter
  }).catch(() => []);
  const recentlyDeletedWeddings = await listRecentlyDeletedWeddings().catch(() => []);
  const securityWarnings = getPortalSecurityWarnings();

  return (
    <SiteFrame
      currentPath={getAdminDashboardPath()}
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
        showWeddingSummary={false}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        {securityWarnings.length ? (
          <div className="mt-6 rounded-[1.5rem] border border-[#b86a53]/18 bg-[#fff3ef] px-5 py-4 text-sm leading-6 text-[#8a4c3a]">
            <p className="font-medium">Security action needed</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {securityWarnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
            <p className="mt-3">
              Set these values in Vercel before pushing the admin area harder:{" "}
              <span className="font-medium">ADMIN_PORTAL_PASSWORD</span>,{" "}
              <span className="font-medium">PORTAL_SESSION_SECRET</span>, and{" "}
              <span className="font-medium">COUPLE_PORTAL_PASSWORD</span>.
            </p>
          </div>
        ) : null}
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
              {deletedSlug ? (
                <div className="rounded-[1.4rem] border border-[#b86a53]/18 bg-[#fff3ef] px-5 py-4 text-sm leading-6 text-[#8a4c3a]">
                  Wedding deleted. It can be restored for 7 days from the recently deleted list below.
                </div>
              ) : null}
              {restoredSlug ? (
                <div className="rounded-[1.4rem] border border-[#184b38]/14 bg-[#f6fbf8] px-5 py-4 text-sm leading-6 text-[#486159]">
                  Wedding restored successfully.
                </div>
              ) : null}
              <form className="grid gap-3 rounded-[1.3rem] border border-[var(--border)] bg-white/75 p-4 md:grid-cols-[1fr_220px_auto]">
                <input
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search by couple name, slug, or wedding code"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <select
                  name="status"
                  defaultValue={statusFilter}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                >
                  <option value="all">All statuses</option>
                  <option value="draft">Draft</option>
                  <option value="approved">Approved</option>
                  <option value="live">Live</option>
                </select>
                <button className="accent-button rounded-full px-5 py-3 text-sm font-medium">
                  Filter
                </button>
              </form>
              {weddings.length ? (
                weddings.map((record) => (
                  <div key={record.id} className="accent-panel rounded-[1.5rem] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xl font-medium">{record.title}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          Wedding {record.referenceCode} · {record.slug} · {record.status}
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
                      <div className="flex flex-wrap gap-3 sm:justify-end">
                        <Link
                          href={getAdminWeddingWorkspacePath(record.slug)}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Open Wedding Workspace
                        </Link>
                        <Link
                          href={getAdminWeddingEditPath(record.slug)}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Edit Website
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
                          href={`/${record.slug}` as Route}
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Live Page
                        </Link>
                        <form action={deleteWeddingDraftAction}>
                          <input type="hidden" name="slug" value={record.slug} />
                          <ConfirmSubmitButton
                            message={`Delete wedding ${record.referenceCode}? It will be hidden immediately and can be restored for 7 days from the admin area.`}
                            className="rounded-full border border-[#b86a53]/25 bg-[#fff3ef] px-4 py-2 text-sm text-[#8a4c3a] transition hover:bg-[#fde8e2]"
                          >
                            Delete Wedding
                          </ConfirmSubmitButton>
                        </form>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="accent-panel rounded-[1.5rem] p-5">
                  No client submissions yet. Once someone shares their details, the draft will appear here for review.
                </div>
              )}
              {recentlyDeletedWeddings.length ? (
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
                  <p className="eyebrow">Recently Deleted</p>
                  <h3 className="mt-3 text-2xl">Undo Window</h3>
                  <div className="mt-4 space-y-3">
                    {recentlyDeletedWeddings.map((record) => (
                      <div
                        key={record.id}
                        className="flex flex-col gap-3 rounded-[1.2rem] border border-[var(--border)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium">{record.title}</p>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            Wedding {record.referenceCode} · deleted {new Date(record.deletedAt!).toLocaleDateString("en-IE")} · restore until {new Date(record.restoreUntilAt!).toLocaleDateString("en-IE")}
                          </p>
                        </div>
                        <form action={restoreWeddingAction}>
                          <input type="hidden" name="slug" value={record.slug} />
                          <button className="accent-outline rounded-full px-4 py-2 text-sm font-medium">
                            Restore Wedding
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
