import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { getAdminProductionPath } from "@/lib/admin-path";
import { getThemeById } from "@/lib/themes";
import { getWeddingData } from "@/lib/wedding-data";

type ProductionPageProps = {
  searchParams?: Promise<{
    theme?: string;
  }>;
};

const checklist = [
  "One central database can now serve multiple weddings",
  "Each couple becomes its own `Wedding` record identified by a reusable `slug`",
  "Production schema added for guests, RSVP responses, admin users, seating plans, tables, and seat assignments",
  "Reusable Prisma client and repository helpers added for real reads and writes",
  "The app now supports one shared Postgres connection through `DATABASE_URL`"
];

const nextSteps = [
  "Add a real `DATABASE_URL` to `.env.local`",
  "Run `npm run db:generate`",
  "Run `npm run db:push` to create the schema",
  "Swap the mock RSVP/dashboard/planner pages over to real database queries",
  "Add couple auth on top of the new wedding admin users table"
];

export default async function ProductionPage({
  searchParams
}: ProductionPageProps) {
  const wedding = getWeddingData();
  const params = searchParams ? await searchParams : undefined;
  const theme = getThemeById(params?.theme ?? wedding.theme);

  return (
    <SiteFrame
      currentPath={getAdminProductionPath()}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
    >
      <PageHero
        eyebrow="Production Setup"
        title="Centralized Multi-Wedding Database Foundation"
        description="The app is now scaffolded for one reusable production database. Each new couple can become another wedding record instead of another separate app."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">What Is Ready</p>
            <div className="mt-5 space-y-3">
              {checklist.map((item) => (
                <div key={item} className="accent-panel rounded-[1.25rem] p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Next Steps</p>
            <div className="mt-5 space-y-3">
              {nextSteps.map((item) => (
                <div key={item} className="accent-panel rounded-[1.25rem] p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
