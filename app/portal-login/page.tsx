import { PortalLoginForm } from "@/components/portal-login-form";
import { getRequiredPortalScope, sanitisePortalNextPath } from "@/lib/portal-auth";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

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
  const theme = getThemeById(params?.theme ?? wedding.theme);
  const next = sanitisePortalNextPath(params?.next);
  const requiredScope = getRequiredPortalScope(next);
  const portalCopy = requiredScope?.startsWith("wedding:")
    ? "Enter the private password for this wedding. Couples can have their own portal password, separate from operator access."
    : "Enter the operator password to open the private admin and backend areas.";

  return (
    <main data-theme={theme.id} data-admin="true" style={theme.style}>
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-12 lg:px-8">
        <div className="section-shell w-full rounded-[2rem] p-8 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <p className="eyebrow">Private Access</p>
              <h1 className="section-title">Private Couple Area</h1>
              <p className="prose-copy text-lg">
                {portalCopy}
              </p>
            </div>
            <div className="space-y-5 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-6">
              <div className="accent-panel rounded-[1.25rem] p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                  You Will Be Taken To
                </p>
                <p className="mt-2 break-all text-sm">{next}</p>
              </div>
              <PortalLoginForm next={next} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
