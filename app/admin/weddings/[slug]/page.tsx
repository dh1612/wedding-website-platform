import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";
import {
  getWeddingBySlug,
  listCalendarItems,
  listChecklistItems,
  updateWeddingStatus
} from "@/lib/production-repositories";

type AdminWeddingWorkspacePageProps = {
  params: Promise<{ slug: string }>;
};

async function setWeddingStatus(formData: FormData) {
  "use server";

  const slug = String(formData.get("slug") || "").trim();
  const status = String(formData.get("status") || "").trim() as
    | "draft"
    | "approved"
    | "live";

  if (!slug || !status) {
    return;
  }

  await updateWeddingStatus({ slug, status });
}

export default async function AdminWeddingWorkspacePage({
  params
}: AdminWeddingWorkspacePageProps) {
  const { slug } = await params;
  const record = await getWeddingBySlug(slug);

  if (!record?.contentJson) {
    notFound();
  }

  const weddingData = coerceWeddingData(record.contentJson);
  const theme = getThemeById(weddingData.theme);
  const [checklistItems, calendarItems] = await Promise.all([
    listChecklistItems(record.id),
    listCalendarItems(record.id)
  ]);

  const cards = [
    {
      eyebrow: "Website",
      title: "Edit Wedding",
      description: "Update wording, venues, accommodation links, section visibility, and template choice.",
      href: `/admin/weddings/${slug}/edit`,
      button: "Open Editor"
    },
    {
      eyebrow: "Draft Review",
      title: "Preview",
      description: "Review the private draft before the couple makes the guest website live.",
      href: `/preview/${slug}`,
      button: "Open Preview"
    },
    {
      eyebrow: "Guest Replies",
      title: "RSVPs",
      description: "Add or remove guests, check dietary notes, and review RSVP responses for this wedding.",
      href: `/rsvp-dashboard/${slug}`,
      button: "Manage RSVPs"
    },
    {
      eyebrow: "Planning Area",
      title: "Portal",
      description: "Open the couple’s checklist and calendar area tied to this exact wedding record.",
      href: `/couple-portal/${slug}`,
      button: "Open Portal"
    },
    {
      eyebrow: "Tables",
      title: "Seating",
      description: "View the seating workspace and support the couple if they need help moving guests or tables.",
      href: `/plan-your-tables/${slug}`,
      button: "Open Seating"
    },
    {
      eyebrow: "Guest Link",
      title: "Live Website",
      description: record.status === "live"
        ? "This wedding is live. Open the public guest-facing website."
        : "This wedding is not live yet. The guest link appears once it has been made live.",
      href: record.status === "live" ? `/site/${slug}` : `/preview/${slug}`,
      button: record.status === "live" ? "Open Live Site" : "Back To Preview"
    }
  ];

  return (
    <SiteFrame
      currentPath={`/admin/weddings/${slug}`}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="operator"
      adminNavItemsOverride={buildOperatorWeddingNavItems(slug)}
      showFooter={false}
    >
      <PageHero
        eyebrow="Wedding Workspace"
        title={record.title}
        description="Everything for this wedding lives here. Open the exact area you need instead of jumping through generic portal pages."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-8 rounded-[1.8rem] border border-[var(--border)] bg-white/88 p-6 shadow-[var(--shadow)]">
          <p className="eyebrow">Publishing Control</p>
          <h2 className="mt-3 text-3xl">Control when this wedding goes live</h2>
          <p className="prose-copy mt-3">
            Draft previews stay private. Publish from here when the couple has approved the
            website and payment is sorted.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <form action={setWeddingStatus}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="status" value="approved" />
              <button className="accent-panel rounded-full px-5 py-3 text-sm font-medium">
                Keep Private
              </button>
            </form>
            <form action={setWeddingStatus}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="status" value="live" />
              <button className="accent-button rounded-full px-5 py-3 text-sm font-medium">
                Publish Guest Website
              </button>
            </form>
            {record.status === "live" ? (
              <Link
                href={`/site/${slug}`}
                className="accent-outline rounded-full px-5 py-3 text-sm font-medium"
              >
                Open Live Website
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="section-shell rounded-[1.6rem] p-5">
            <p className="eyebrow">Status</p>
            <p className="mt-3 text-3xl capitalize">{record.status}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{record.slug}</p>
          </div>
          <div className="section-shell rounded-[1.6rem] p-5">
            <p className="eyebrow">Guests</p>
            <p className="mt-3 text-3xl">{record.guests.length}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">People currently in this wedding</p>
          </div>
          <div className="section-shell rounded-[1.6rem] p-5">
            <p className="eyebrow">RSVP Responses</p>
            <p className="mt-3 text-3xl">{record.rsvpResponses.length}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Replies saved against this wedding</p>
          </div>
          <div className="section-shell rounded-[1.6rem] p-5">
            <p className="eyebrow">Planning Items</p>
            <p className="mt-3 text-3xl">{checklistItems.length + calendarItems.length}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Checklist and calendar items combined</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="section-shell rounded-[2rem] p-8">
              <p className="eyebrow">{card.eyebrow}</p>
              <h2 className="mt-3 text-3xl">{card.title}</h2>
              <p className="prose-copy mt-3">{card.description}</p>
              <Link href={card.href} className="accent-button mt-6 inline-flex rounded-full px-5 py-3 text-sm font-medium">
                {card.button}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
