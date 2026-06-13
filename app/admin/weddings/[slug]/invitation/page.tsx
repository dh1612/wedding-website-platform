import Link from "next/link";
import { notFound } from "next/navigation";
import { InvitationSuite } from "@/components/invitation-suite";
import { PageHero } from "@/components/page-hero";
import { PrintInvitationButton } from "@/components/print-invitation-button";
import { getWeddingRecordForAdmin } from "@/lib/production-repositories";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
import { getThemeById } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type AdminWeddingInvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminWeddingInvitationPage({
  params
}: AdminWeddingInvitationPageProps) {
  const { slug } = await params;
  const record = await getWeddingRecordForAdmin(slug);

  if (!record?.contentJson) {
    notFound();
  }

  const weddingData = coerceWeddingData(record.liveContentJson ?? record.contentJson);
  const theme = getThemeById(weddingData.theme);

  return (
    <main data-theme={theme.id} data-admin="true" style={theme.style}>
      <div className="print:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 pt-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {buildOperatorWeddingNavItems(slug).map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="accent-panel rounded-full px-4 py-2 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <PrintInvitationButton />
        </div>
        <PageHero
          eyebrow="Invitation Suite"
          title={`Print invitations for ${record.title}`}
          description="This admin-only invitation suite is generated from the saved wedding details and matched to the couple’s chosen theme. Use it to refine the wording, then print or save a PDF before sharing it manually with the couple."
          themeId={theme.id}
          weddingData={weddingData}
          showWeddingSummary={false}
        />
      </div>

      <InvitationSuite slug={slug} weddingData={weddingData} />
    </main>
  );
}
