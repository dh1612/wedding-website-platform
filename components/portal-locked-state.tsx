import Link from "next/link";

type PortalLockedStateProps = {
  slug: string;
  isPremiumPackage: boolean;
  title?: string;
  description?: string;
};

export function PortalLockedState({
  slug,
  isPremiumPackage,
  title = "This private couple area is not unlocked yet",
  description = "The wedding website preview is ready to review, but the planning tools open after approval and final sign-off."
}: PortalLockedStateProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <p className="eyebrow">Private Access</p>
        <h2 className="mt-4 text-4xl">{title}</h2>
        <p className="prose-copy mt-4 max-w-3xl text-lg">{description}</p>

        <div className="mt-6 rounded-[1.4rem] border border-[var(--border)] bg-white/75 p-5 text-sm leading-7 text-[var(--muted)]">
          {isPremiumPackage
            ? "This wedding includes the premium couple portal, but it stays locked until the operator unlocks it after approval or payment."
            : "This wedding is not on the premium portal package, so the live planning tools stay locked. You can still review the website preview and ask about upgrading if needed."}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/preview/${slug}`}
            className="accent-button rounded-full px-5 py-3 text-sm font-medium"
          >
            Back To Website Preview
          </Link>
          <Link
            href={isPremiumPackage ? `/couple-area` : `/unlock/${slug}`}
            className="accent-outline rounded-full px-5 py-3 text-sm font-medium"
          >
            {isPremiumPackage ? "View Couple Portal Demo" : "Ask About Unlocking"}
          </Link>
          <Link
            href={`/unlock/${slug}`}
            className="accent-panel rounded-full px-5 py-3 text-sm font-medium"
          >
            Unlock My Website
          </Link>
        </div>
      </div>
    </section>
  );
}
