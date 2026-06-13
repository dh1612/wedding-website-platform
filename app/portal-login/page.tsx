import { PortalLoginForm } from "@/components/portal-login-form";
import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/brand";
import { getRequiredPortalScope, sanitisePortalNextPath } from "@/lib/portal-auth";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";
import { redirect } from "next/navigation";

type PortalLoginPageProps = {
  searchParams?: Promise<{
    next?: string;
    theme?: string;
  }>;
};

export default async function PortalLoginPage({
  searchParams
}: PortalLoginPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const rawNext = params?.next?.trim();

  if (!rawNext) {
    redirect("/");
  }

  const theme = getThemeById(params?.theme ?? wedding.theme);
  const next = sanitisePortalNextPath(rawNext);
  const requiredScope = getRequiredPortalScope(next);

  if (!requiredScope) {
    redirect("/");
  }

  const isCouplePortal = Boolean(requiredScope?.startsWith("wedding:"));
  const requireEmail = isCouplePortal;
  const eyebrow = isCouplePortal ? "Private Access" : "Operator Access";
  const title = isCouplePortal ? "Private Couple Area" : "Private Admin Area";
  const portalCopy = isCouplePortal
    ? "Enter the couple portal email and password for this wedding. This access is separate from the operator backend."
    : "Enter your operator password to open the admin workspace, wedding editor, and backend tools.";
  const destinationLabel = isCouplePortal ? "You Will Be Taken To" : "Admin Destination";
  const submitLabel = isCouplePortal ? "Open Private Area" : "Open Admin Area";
  const errorFallback = isCouplePortal
    ? "Unable to open the private area."
    : "Unable to open the admin area.";

  return (
    <main data-theme={theme.id} data-admin="true" style={theme.style}>
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-12 lg:px-8">
        <div className="section-shell w-full rounded-[2rem] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="section-title">{title}</h1>
              <p className="prose-copy text-lg">
                {portalCopy}
              </p>
            </div>
            <div className="space-y-5 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-6">
              <div className="accent-panel rounded-[1.25rem] p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                  {destinationLabel}
                </p>
                <p className="mt-2 break-all text-sm">{next}</p>
              </div>
              <PortalLoginForm
                next={next}
                requireEmail={requireEmail}
                submitLabel={submitLabel}
                errorFallback={errorFallback}
              />
              {isCouplePortal ? (
                <div className="space-y-3 text-sm text-[var(--muted)]">
                  <Link
                    href={`/portal-reset?next=${encodeURIComponent(next)}&theme=${encodeURIComponent(theme.id)}`}
                    className="inline-flex text-[#184b38] underline underline-offset-2"
                  >
                    Forgot password?
                  </Link>
                  <p>
                    If you no longer have access to the wedding email address on file, please{" "}
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-[#184b38] underline underline-offset-2"
                    >
                      contact me
                    </a>{" "}
                    and I'll help you reset access manually.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
