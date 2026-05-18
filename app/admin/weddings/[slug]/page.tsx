import Link from "next/link";
import type { Route } from "next";
import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { getPackagePaymentLink, getPaymentStatusLabel, type PaymentStatus } from "@/lib/payment";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";
import {
  getWeddingBySlug,
  listCalendarItems,
  listChecklistItems,
  updateWeddingAccessState
} from "@/lib/production-repositories";

type AdminWeddingWorkspacePageProps = {
  params: Promise<{ slug: string }>;
};

async function updateWeddingAccessAction(formData: FormData) {
  "use server";

  const slug = String(formData.get("slug") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const websiteUnlocked = String(formData.get("websiteUnlocked") || "").trim();
  const portalUnlocked = String(formData.get("portalUnlocked") || "").trim();
  const clearUnlockRequest = String(formData.get("clearUnlockRequest") || "").trim();
  const paymentStatus = String(formData.get("paymentStatus") || "").trim();

  if (!slug) {
    return;
  }

  await updateWeddingAccessState({
    slug,
    status: status
      ? (status as "draft" | "approved" | "live")
      : undefined,
    websiteUnlocked:
      websiteUnlocked === "true" ? true : websiteUnlocked === "false" ? false : undefined,
    portalUnlocked:
      portalUnlocked === "true" ? true : portalUnlocked === "false" ? false : undefined,
    unlockRequestedAt: clearUnlockRequest === "true" ? null : undefined,
    paymentStatus:
      paymentStatus === "unpaid" ||
      paymentStatus === "payment_requested" ||
      paymentStatus === "paid"
        ? paymentStatus
        : undefined,
    paymentRequestedAt:
      paymentStatus === "payment_requested" ? new Date().toISOString() : undefined,
    paymentCompletedAt:
      paymentStatus === "paid"
        ? new Date().toISOString()
        : paymentStatus === "unpaid"
          ? null
        : undefined
  });

  redirect(`/admin/weddings/${slug}`);
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
  const plannerSettings = (record.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
    websiteUnlocked?: boolean;
    portalUnlocked?: boolean;
    unlockRequestedAt?: string | null;
    paymentStatus?: PaymentStatus;
    paymentRequestedAt?: string | null;
    paymentCompletedAt?: string | null;
  };
  const packageTier = plannerSettings.packageTier ?? "smart";
  const paymentStatus = plannerSettings.paymentStatus ?? "unpaid";
  const paymentLink = getPackagePaymentLink(packageTier);
  const websiteUnlocked =
    typeof plannerSettings.websiteUnlocked === "boolean"
      ? plannerSettings.websiteUnlocked
      : record.status === "live";
  const portalUnlocked = plannerSettings.portalUnlocked === true;
  const unlockRequestedAt = plannerSettings.unlockRequestedAt;
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
      eyebrow: "Stationery",
      title: "Invitations",
      description: "Generate a theme-matched invitation suite using the wedding details already saved on the website.",
      href: `/admin/weddings/${slug}/invitation`,
      button: "Generate Invitations"
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
      description:
        packageTier === "premium"
          ? "Open the couple’s checklist and calendar area tied to this exact wedding record."
          : "The private couple portal is a premium feature, but you can still access the tools here as the operator.",
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
      href: record.status === "live" ? `/${slug}` : `/preview/${slug}`,
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
        showWeddingSummary={false}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-8 rounded-[1.8rem] border border-[var(--border)] bg-white/88 p-6 shadow-[var(--shadow)]">
          <p className="eyebrow">Publishing Control</p>
          <h2 className="mt-3 text-3xl">Control when this wedding goes live</h2>
          <p className="prose-copy mt-3">
            Draft previews stay private. Unlock the website and, when included, the premium
            portal from here after approval or payment.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-4">
              <p className="eyebrow">Package</p>
              <p className="mt-3 text-2xl capitalize">{packageTier}</p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-4">
              <p className="eyebrow">Payment</p>
              <p className="mt-3 text-2xl">{getPaymentStatusLabel(paymentStatus)}</p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-4">
              <p className="eyebrow">Website</p>
              <p className="mt-3 text-2xl">{websiteUnlocked ? "Unlocked" : "Locked"}</p>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-4">
              <p className="eyebrow">Portal</p>
              <p className="mt-3 text-2xl">
                {packageTier === "premium"
                  ? portalUnlocked
                    ? "Unlocked"
                    : "Locked"
                  : "Not Included"}
              </p>
            </div>
          </div>
          {unlockRequestedAt ? (
            <div className="mt-5 rounded-[1.2rem] border border-[#184b38]/14 bg-[#f6fbf8] px-4 py-4 text-sm leading-6 text-[#486159]">
              Unlock requested on {new Date(unlockRequestedAt).toLocaleString("en-IE", {
                dateStyle: "medium",
                timeStyle: "short"
              })}.
            </div>
          ) : null}
          <div className="mt-5 rounded-[1.2rem] border border-[var(--border)] bg-white/78 px-4 py-4 text-sm leading-6 text-[var(--muted)]">
            {paymentLink
              ? "A package payment link is configured for this wedding. You can still mark payment manually and unlock the website or portal yourself."
              : "No package payment link is configured yet. The unlock flow can still be handled manually from this admin area."}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <form action={updateWeddingAccessAction}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="paymentStatus" value="unpaid" />
              <button className="accent-panel rounded-full px-5 py-3 text-sm font-medium">
                Mark Unpaid
              </button>
            </form>
            <form action={updateWeddingAccessAction}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="paymentStatus" value="paid" />
              <input type="hidden" name="clearUnlockRequest" value="true" />
              <button className="accent-outline rounded-full px-5 py-3 text-sm font-medium">
                Mark Paid
              </button>
            </form>
            <form action={updateWeddingAccessAction}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="status" value="approved" />
              <input type="hidden" name="websiteUnlocked" value="false" />
              <button className="accent-panel rounded-full px-5 py-3 text-sm font-medium">
                Keep Website Private
              </button>
            </form>
            <form action={updateWeddingAccessAction}>
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="status" value="live" />
              <input type="hidden" name="websiteUnlocked" value="true" />
              <input type="hidden" name="clearUnlockRequest" value="true" />
              <button className="accent-button rounded-full px-5 py-3 text-sm font-medium">
                Unlock Website And Publish
              </button>
            </form>
            {packageTier === "premium" ? (
              <form action={updateWeddingAccessAction}>
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="portalUnlocked" value={portalUnlocked ? "false" : "true"} />
                <input type="hidden" name="clearUnlockRequest" value="true" />
                <button className="accent-outline rounded-full px-5 py-3 text-sm font-medium">
                  {portalUnlocked ? "Lock Couple Portal" : "Unlock Couple Portal"}
                </button>
              </form>
            ) : (
              <div className="rounded-full border border-[var(--border)] bg-white/72 px-5 py-3 text-sm text-[var(--muted)]">
                Couple portal unlock is available on premium only
              </div>
            )}
            {record.status === "live" ? (
              <Link
                href={`/${slug}` as Route}
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
