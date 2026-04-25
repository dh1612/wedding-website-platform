import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { createWeddingDraftAction } from "@/app/admin/actions";
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
    >
      <PageHero
        eyebrow="Operator Backend"
        title="Multi-Wedding Admin"
        description="Your centralized backend for creating, managing, and later duplicating weddings from one shared product database."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Create Wedding</p>
            <h2 className="mt-3 text-3xl">New Draft</h2>
            <p className="prose-copy mt-3">
              Start a new couple as a fresh wedding record in the central database. Later we can add duplicate-from-template and import flows here too.
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
                <p className="eyebrow">Wedding Records</p>
                <h2 className="mt-3 text-3xl">Central List</h2>
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
                          {record._count.guests} guests · {record._count.rsvpResponses} RSVP responses · {record._count.seatingPlans} seating plans
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href="/couple-portal"
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Portal
                        </Link>
                        <Link
                          href="/production"
                          className="accent-panel rounded-full px-4 py-2 text-sm"
                        >
                          Structure
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="accent-panel rounded-[1.5rem] p-5">
                  No weddings in the database yet. Create your first draft on the left.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
