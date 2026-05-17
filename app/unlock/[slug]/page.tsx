import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import {
  getPackageDisplayName,
  getPackageDisplayPrice,
  getPackagePaymentLink,
  getPaymentStatusLabel,
  type PaymentStatus
} from "@/lib/payment";
import { getWeddingSiteBySlug, updateWeddingAccessState } from "@/lib/production-repositories";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type UnlockPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ requested?: string }>;
};

async function requestUnlockAction(formData: FormData) {
  "use server";

  const slug = String(formData.get("slug") || "").trim();

  if (!slug) {
    return;
  }

  await updateWeddingAccessState({
    slug,
    unlockRequestedAt: new Date().toISOString()
  });

  redirect(`/unlock/${slug}?requested=1`);
}

async function startPaymentAction(formData: FormData) {
  "use server";

  const slug = String(formData.get("slug") || "").trim();
  const packageTier = String(formData.get("packageTier") || "").trim() as
    | "basic"
    | "smart"
    | "premium";

  if (!slug || !packageTier) {
    return;
  }

  const paymentLink = getPackagePaymentLink(packageTier);

  await updateWeddingAccessState({
    slug,
    paymentStatus: "payment_requested",
    paymentRequestedAt: new Date().toISOString(),
    unlockRequestedAt: new Date().toISOString()
  });

  if (paymentLink) {
    redirect(paymentLink);
  }

  redirect(`/unlock/${slug}?requested=1`);
}

export default async function UnlockPage({
  params,
  searchParams
}: UnlockPageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : undefined;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord?.contentJson) {
    notFound();
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const theme = getThemeById(weddingData.theme);
  const plannerSettings = (weddingRecord.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
    websiteUnlocked?: boolean;
    portalUnlocked?: boolean;
    unlockRequestedAt?: string | null;
    paymentStatus?: PaymentStatus;
    paymentRequestedAt?: string | null;
    paymentCompletedAt?: string | null;
  };
  const packageTier = plannerSettings.packageTier ?? "smart";
  const packageName = getPackageDisplayName(packageTier);
  const packagePrice = getPackageDisplayPrice(packageTier);
  const paymentLink = getPackagePaymentLink(packageTier);
  const paymentStatus = plannerSettings.paymentStatus ?? "unpaid";
  const requested = query?.requested === "1" || Boolean(plannerSettings.unlockRequestedAt);

  return (
    <SiteFrame
      currentPath={`/unlock/${slug}`}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      showFooter={false}
    >
      <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-12">
          <p className="eyebrow">Unlock Your Website</p>
          <h1 className="mt-4 text-4xl">Final approval and unlock happen here</h1>
          <p className="prose-copy mt-4 max-w-3xl text-lg">
            Your preview is private while everything is being reviewed. When you are ready, continue to payment or send an unlock request. The operator can then approve the website and open the final guest link.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/78 p-6">
              <p className="eyebrow">What happens next</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <li>Review the private preview and decide what changes you want.</li>
                <li>Use the payment button when you are ready to move forward.</li>
                <li>The operator unlocks the live website after payment has been confirmed.</li>
              </ul>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/78 p-6">
              <p className="eyebrow">Your package</p>
              <p className="mt-4 text-2xl">{packageName}</p>
              <p className="prose-copy mt-3">
                {packageTier === "premium"
                  ? "Premium includes the private couple portal once it has been unlocked."
                  : "The private couple portal is a premium feature. Your guest website can still be unlocked and shared without it."}
              </p>
              {packagePrice ? (
                <p className="mt-3 text-sm font-medium text-[var(--accent-strong)]">{packagePrice}</p>
              ) : null}
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/78 p-6">
              <p className="eyebrow">Payment</p>
              <p className="mt-4 text-2xl">{getPaymentStatusLabel(paymentStatus)}</p>
              <p className="prose-copy mt-3">
                {paymentStatus === "paid"
                  ? "Payment has been marked as received. The operator can now unlock the website and portal."
                  : paymentLink
                    ? "A secure payment link is ready for this package. Payment completion is still confirmed manually before anything goes live."
                    : "A payment link has not been connected yet, so the operator can handle approval and payment manually for now."}
              </p>
            </div>
          </div>

          {requested ? (
            <div className="mt-6 rounded-[1.4rem] border border-[#184b38]/14 bg-[#f6fbf8] px-5 py-4 text-sm leading-6 text-[#486159]">
              Your unlock request has been marked. The operator can now unlock the website and, if included, the premium portal from the admin area.
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {paymentLink && paymentStatus !== "paid" ? (
              <form action={startPaymentAction}>
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="packageTier" value={packageTier} />
                <button className="accent-button rounded-full px-6 py-3 text-sm font-medium">
                  Pay Now To Unlock
                </button>
              </form>
            ) : null}
            {!requested ? (
              <form action={requestUnlockAction}>
                <input type="hidden" name="slug" value={slug} />
                <button className="accent-panel rounded-full px-6 py-3 text-sm font-medium">
                  Send Unlock Request
                </button>
              </form>
            ) : null}
            <Link
              href={`/preview/${slug}`}
              className="accent-outline rounded-full px-6 py-3 text-sm font-medium"
            >
              Back To Preview
            </Link>
            {packageTier === "premium" ? (
              <Link
                href="/couple-area"
                className="accent-panel rounded-full px-6 py-3 text-sm font-medium"
              >
                View Couple Portal Demo
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
