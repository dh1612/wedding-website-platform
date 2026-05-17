"use client";

import { DemoPortalActionCard, DemoPortalModal, useDemoPortalModal } from "@/components/demo-portal-shell";

type DemoPortalHomeProps = {
  weddingDateLabel: string;
  checklistItems: Array<{
    id: string;
    title: string;
    category: string;
    completed: boolean;
    notes: string;
  }>;
  calendarItems: Array<{
    id: string;
    title: string;
    category: string;
    startDate: string;
    endDate: string;
    notes: string;
  }>;
};

export function DemoPortalHome({
  weddingDateLabel,
  checklistItems,
  calendarItems
}: DemoPortalHomeProps) {
  const { openTitle, openModal, closeModal } = useDemoPortalModal();

  return (
    <>
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <p id="portal-home" className="eyebrow">Portal Home</p>
        <h2 className="mt-4 text-4xl">Choose What You Want To Work On</h2>
        <p className="prose-copy mt-4 max-w-3xl text-lg">
          Everything for the wedding is gathered here in one place. Start with the checklist, then move through dates, guest replies, and seating as plans come together.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <DemoPortalActionCard
            id="checklist-demo"
            eyebrow="Start Here"
            title="Checklist"
            copy="Tick off planning jobs, leave comments, and keep all your to-dos in one place."
            buttonLabel="Open Checklist"
            onOpen={() => openModal("Checklist demo")}
          />

          <DemoPortalActionCard
            id="calendar-demo"
            eyebrow="Timeline"
            title="Calendar Planner"
            copy="Add key dates, map them against the wedding, and generate a clean timeline summary that feels closer to project planning."
            buttonLabel="Open Calendar"
            onOpen={() => openModal("Calendar demo")}
          />

          <DemoPortalActionCard
            id="rsvp-demo"
            eyebrow="Guests"
            title="RSVP Dashboard"
            copy="See who is attending, who still needs a reply, and any dietary requirements or notes."
            buttonLabel="Open RSVPs"
            onOpen={() => openModal("RSVP dashboard demo")}
          />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <DemoPortalActionCard
            id="seating-demo"
            eyebrow="Seating"
            title="Plan Your Tables"
            copy="Build the room layout, place tables, and decide where each guest should sit."
            buttonLabel="Open Seating Plan"
            onOpen={() => openModal("Seating plan demo")}
          />

          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Planning View</p>
            <h3 className="mt-3 text-3xl">What The Calendar Is For</h3>
            <p className="prose-copy mt-3">
              This gives the couple a clearer big-picture view of the wedding timeline, with milestones like RSVPs, supplier deadlines, dress fittings, final payments, and seating lock-in shown in one generated summary.
            </p>
            <p className="prose-copy mt-4">
              Think of it as the project-management layer of the portal: add dates, click generate, then review the timeline like a lightweight Gantt chart.
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Checklist Preview</p>
            <h3 className="mt-3 text-3xl">Planning tasks stay organised</h3>
            <div className="mt-6 space-y-3 opacity-75">
              {checklistItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1rem] border border-[var(--border)] bg-white/72 px-4 py-3"
                >
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.category}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openModal("Checklist demo")}
              className="accent-button mt-6 rounded-full px-5 py-3 text-sm font-medium"
            >
              Open Demo Popup
            </button>
          </div>

          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Calendar Preview</p>
            <h3 className="mt-3 text-3xl">Key dates around {weddingDateLabel}</h3>
            <div className="mt-6 space-y-3 opacity-75">
              {calendarItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1rem] border border-[var(--border)] bg-white/72 px-4 py-3"
                >
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {item.startDate} to {item.endDate}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openModal("Calendar demo")}
              className="accent-button mt-6 rounded-full px-5 py-3 text-sm font-medium"
            >
              Open Demo Popup
            </button>
          </div>
        </div>
      </section>
      <DemoPortalModal open={Boolean(openTitle)} title={openTitle} onClose={closeModal} />
    </>
  );
}
