import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalResetPasswordForm } from "@/components/portal-reset-password-form";
import { PortalResetRequestForm } from "@/components/portal-reset-request-form";
import { SUPPORT_EMAIL } from "@/lib/brand";
import { getRequiredPortalScope, sanitisePortalNextPath } from "@/lib/portal-auth";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type PortalResetPageProps = {
  searchParams?: Promise<{
    next?: string;
    theme?: string;
    token?: string;
  }>;
};

export default async function PortalResetPage({
  searchParams
}: PortalResetPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const rawNext = params?.next?.trim();

  if (!rawNext) {
    redirect("/");
  }

  const next = sanitisePortalNextPath(rawNext);
  const requiredScope = getRequiredPortalScope(next);

  if (!requiredScope?.startsWith("wedding:")) {
    redirect("/");
  }

  const theme = getThemeById(params?.theme ?? wedding.theme);
  const token = params?.token?.trim() ?? "";

  return (
    <main data-theme={theme.id} data-admin="true" style={theme.style}>
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-12 lg:px-8">
        <div className="section-shell w-full rounded-[2rem] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="eyebrow">Private Access</p>
              <h1 className="section-title">
                {token ? "Reset Couple Portal Password" : "Reset Portal Password"}
              </h1>
              <p className="prose-copy text-lg">
                {token
                  ? "Choose a new password for this private couple portal. Once saved, you can return to the login page and continue into the portal."
                  : "Enter the wedding email address linked to this portal and I'll send a secure reset link. If you no longer have access to that email, I can help manually."}
              </p>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Manual help is always available at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#184b38] underline underline-offset-2">
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            </div>
            <div className="space-y-5 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-6">
              <div className="accent-panel rounded-[1.25rem] p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                  Couple portal destination
                </p>
                <p className="mt-2 break-all text-sm">{next}</p>
              </div>
              {token ? (
                <PortalResetPasswordForm token={token} next={next} theme={theme.id} />
              ) : (
                <PortalResetRequestForm next={next} theme={theme.id} />
              )}
              <Link
                href={`/portal-login?next=${encodeURIComponent(next)}&theme=${encodeURIComponent(theme.id)}`}
                className="inline-flex text-sm text-[#184b38] underline underline-offset-2"
              >
                Back to portal login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
