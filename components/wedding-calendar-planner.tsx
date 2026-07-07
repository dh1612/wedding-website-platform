"use client";

import { useMemo, useState } from "react";

type CalendarTask = {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  notes: string;
};

type WeddingCalendarPlannerProps = {
  weddingDateLabel: string;
  initialItems: CalendarTask[];
  apiBasePath?: string;
  demoMode?: boolean;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
] as const;

function parseDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateLabel(value: string) {
  const date = parseDate(value);

  if (!date) {
    return value;
  }

  return `${date.getDate()} ${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatMonthYear(date: Date) {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
}

function getGeneratedLabel() {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function toInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY_MS);
}

function differenceInDays(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / DAY_MS);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function WeddingCalendarPlanner({
  weddingDateLabel,
  initialItems,
  apiBasePath = "/api/portal",
  demoMode = false
}: WeddingCalendarPlannerProps) {
  const [tasks, setTasks] = useState<CalendarTask[]>(initialItems);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCategory, setDraftCategory] = useState("Planning");
  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");
  const [draftNotes, setDraftNotes] = useState("");
  const [generatedAt, setGeneratedAt] = useState("Ready when you are");
  const [statusMessage, setStatusMessage] = useState("");

  const timeline = useMemo(() => {
    const parsedRanges = tasks
      .map((task) => ({
        ...task,
        start: parseDate(task.startDate),
        end: parseDate(task.endDate)
      }))
      .filter(
        (task): task is CalendarTask & { start: Date; end: Date } =>
          Boolean(task.start) && Boolean(task.end)
      );

    const weddingDate = parseDate(weddingDateLabel) ?? new Date();
    const earliestTask =
      parsedRanges.reduce<Date | null>(
        (current, task) =>
          !current || task.start.getTime() < current.getTime()
            ? task.start
            : current,
        null
      ) ?? addDays(weddingDate, -180);

    const timelineStart = startOfMonth(earliestTask);
    const timelineEnd = addDays(weddingDate, 14);
    const monthSegments: Array<{
      label: string;
      key: string;
      monthStart: Date;
    }> = [];
    const cursor = new Date(timelineStart);

    while (cursor.getTime() <= timelineEnd.getTime()) {
      monthSegments.push({
        label: formatMonthYear(cursor),
        key: `${cursor.getFullYear()}-${cursor.getMonth()}`,
        monthStart: new Date(cursor)
      });

      cursor.setMonth(cursor.getMonth() + 1, 1);
    }

    const bars = parsedRanges.map((task) => {
      const startMonthIndex = Math.max(
        0,
        (task.start.getFullYear() - timelineStart.getFullYear()) * 12 +
          (task.start.getMonth() - timelineStart.getMonth())
      );
      const endMonthIndex = Math.max(
        startMonthIndex,
        (task.end.getFullYear() - timelineStart.getFullYear()) * 12 +
          (task.end.getMonth() - timelineStart.getMonth())
      );

      return {
        ...task,
        startMonthIndex,
        monthSpan: Math.max(1, endMonthIndex - startMonthIndex + 1)
      };
    });

    const tasksByMonth = monthSegments.map((month, index) => ({
      ...month,
      tasks: bars.filter((task) => task.startMonthIndex === index)
    }));

    const phases = [
      {
        id: "early",
        label: "12+ Months Out",
        description: "Big-picture foundations, guest communication, and early supplier planning.",
        tasks: bars.filter((task) => differenceInDays(task.start, weddingDate) > 180)
      },
      {
        id: "mid",
        label: "6 To 12 Months Out",
        description: "Core decisions, confirmations, and guest management checkpoints.",
        tasks: bars.filter((task) => {
          const daysToWedding = differenceInDays(task.start, weddingDate);
          return daysToWedding > 60 && daysToWedding <= 180;
        })
      },
      {
        id: "final",
        label: "Final 2 Months",
        description: "Lock in final numbers, payments, and practical wedding-day details.",
        tasks: bars.filter((task) => {
          const daysToWedding = differenceInDays(task.start, weddingDate);
          return daysToWedding > 14 && daysToWedding <= 60;
        })
      },
      {
        id: "wedding-week",
        label: "Wedding Week",
        description: "Handover notes, final checks, and last-mile coordination.",
        tasks: bars.filter((task) => differenceInDays(task.start, weddingDate) <= 14)
      }
    ];

    return {
      weddingDate,
      monthSegments,
      bars,
      tasksByMonth,
      phases
    };
  }, [tasks, weddingDateLabel]);

  async function addTask() {
    if (!draftTitle.trim() || !draftStartDate || !draftEndDate) {
      return;
    }

    if (demoMode) {
      const createdItem = {
        id: `demo-calendar-${Date.now()}`,
        title: draftTitle.trim(),
        category: draftCategory,
        startDate: draftStartDate,
        endDate: draftEndDate,
        notes: draftNotes.trim()
      };

      setTasks((current) =>
        [...current, createdItem].sort((a, b) => a.startDate.localeCompare(b.startDate))
      );
      setDraftTitle("");
      setDraftCategory("Planning");
      setDraftStartDate("");
      setDraftEndDate("");
      setDraftNotes("");
      setStatusMessage("Demo mode: timeline updates are for preview only and are not saved.");
      return;
    }

    const response = await fetch(`${apiBasePath}/calendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: draftTitle.trim(),
        category: draftCategory,
        startDate: draftStartDate,
        endDate: draftEndDate,
        notes: draftNotes.trim()
      })
    });

    if (!response.ok) {
      setStatusMessage("Calendar date could not be added.");
      return;
    }

    const createdItem = (await response.json()) as CalendarTask;

    setTasks((current) =>
      [...current, createdItem].sort((a, b) =>
        a.startDate.localeCompare(b.startDate)
      )
    );

    setDraftTitle("");
    setDraftCategory("Planning");
    setDraftStartDate("");
    setDraftEndDate("");
    setDraftNotes("");
    setStatusMessage("Calendar updated.");
  }

  async function removeTask(id: string) {
    const previousTasks = tasks;
    setTasks((current) => current.filter((task) => task.id !== id));

    if (demoMode) {
      setStatusMessage("Demo mode: removed dates return when the page is refreshed.");
      return;
    }

    const response = await fetch(`${apiBasePath}/calendar/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setTasks(previousTasks);
      setStatusMessage("Calendar date could not be removed.");
      return;
    }

    setStatusMessage("Calendar updated.");
  }

  function generateSummary() {
    setGeneratedAt(getGeneratedLabel());
    if (demoMode) {
      setStatusMessage("Demo mode: the calendar summary updates here, but nothing is stored.");
    }
  }

  return (
    <section
      id="calendar"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="section-shell rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Planning Timeline</p>
            <h2 className="text-4xl">Wedding Calendar</h2>
            <p className="prose-copy text-lg">
              Add key dates for the wedding, then create a clear planning overview you can use to stay on top of the months ahead.
            </p>
            {demoMode ? (
              <p className="rounded-[1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                Interactive demo: add dates, remove them, and regenerate the timeline to see how the Premium portal feels in practice.
              </p>
            ) : null}
          </div>
          <div className="accent-panel rounded-[1.4rem] px-5 py-4 text-sm">
            Calendar status: {generatedAt}
          </div>
        </div>
        {statusMessage ? (
          <p className="mt-6 rounded-[1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
            {statusMessage}
          </p>
        ) : null}

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6 xl:col-span-1">
            <div className="rounded-[1.6rem] border border-[var(--border)] bg-white/75 p-6">
              <h3 className="text-2xl">Add Key Date</h3>
              <div className="mt-5 space-y-4">
                <input
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder="Menu tasting"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <select
                  value={draftCategory}
                  onChange={(event) => setDraftCategory(event.target.value)}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                >
                  <option>Planning</option>
                  <option>Guests</option>
                  <option>Suppliers</option>
                  <option>Seating</option>
                  <option>Admin</option>
                  <option>Wedding Week</option>
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="date"
                    value={draftStartDate}
                    onChange={(event) => setDraftStartDate(event.target.value)}
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                  <input
                    type="date"
                    value={draftEndDate}
                    onChange={(event) => setDraftEndDate(event.target.value)}
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                </div>
                <textarea
                  value={draftNotes}
                  onChange={(event) => setDraftNotes(event.target.value)}
                  placeholder="Optional note"
                  rows={4}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={addTask}
                    className="accent-button rounded-full px-6 py-3 text-sm font-medium"
                  >
                    Add Date
                  </button>
                  <button
                    onClick={generateSummary}
                    className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-medium text-[var(--foreground)]"
                  >
                    Update Calendar
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-[var(--border)] bg-white/75 p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl">Saved Planning Dates</h3>
                <span className="text-sm text-[var(--muted)]">{pluralize(tasks.length, "item")}</span>
              </div>
              <div className="mt-5 space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="accent-panel rounded-[1.2rem] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-lg font-medium">{task.title}</p>
                        <p className="text-sm text-[var(--muted)]">
                          {task.category} · {formatDateLabel(task.startDate)} to{" "}
                          {formatDateLabel(task.endDate)}
                        </p>
                        {task.notes ? (
                          <p className="text-sm text-[var(--muted)]">
                            {task.notes}
                          </p>
                        ) : null}
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 xl:col-span-2">
            <div className="rounded-[1.6rem] border border-[var(--border)] bg-white/80 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Generated View</p>
                  <h3 className="mt-2 text-3xl">Planning Roadmap</h3>
                </div>
                <div className="text-sm text-[var(--muted)]">
                  Wedding date: {formatDateLabel(toInputDate(timeline.weddingDate))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[#f8f6f3] p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="accent-panel rounded-[1.2rem] p-4">
                    <p className="eyebrow">Dates Added</p>
                    <p className="mt-2 text-3xl">{tasks.length}</p>
                  </div>
                  <div className="accent-panel rounded-[1.2rem] p-4">
                    <p className="eyebrow">Active Months</p>
                    <p className="mt-2 text-3xl">
                      {timeline.tasksByMonth.filter((month) => month.tasks.length > 0).length}
                    </p>
                  </div>
                  <div className="accent-panel rounded-[1.2rem] p-4">
                    <p className="eyebrow">Next Focus</p>
                    <p className="mt-2 text-xl font-medium leading-snug">
                      {tasks[0]?.title ?? "Add a key date"}
                    </p>
                  </div>
                  <div className="accent-panel rounded-[1.2rem] p-4">
                    <p className="eyebrow">Wedding Date</p>
                    <p className="mt-2 text-lg font-medium">
                      {formatDateLabel(toInputDate(timeline.weddingDate))}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {timeline.phases.map((phase) => (
                    <div
                      key={phase.id}
                      className="rounded-[1.3rem] border border-[var(--border)] bg-white/90 p-5"
                    >
                      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
                        <div>
                          <p className="eyebrow">{phase.label}</p>
                          <h4 className="mt-2 text-2xl">Planning Phase</h4>
                          <p className="prose-copy mt-3 text-base">
                            {phase.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          {phase.tasks.length > 0 ? (
                            phase.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="rounded-[1rem] border border-[var(--border)] bg-[var(--accent-soft)]/40 p-4 sm:p-5"
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <p className="text-lg font-medium leading-tight">
                                      {task.title}
                                    </p>
                                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                                      {task.category}
                                    </p>
                                    <p className="mt-3 text-sm text-[var(--muted)]">
                                      {formatDateLabel(task.startDate)} to{" "}
                                      {formatDateLabel(task.endDate)}
                                    </p>
                                  </div>
                                  <div className="flex shrink-0 flex-wrap gap-2">
                                    <span className="rounded-[0.85rem] border border-[var(--accent-strong)] bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                                      {task.monthSpan > 1 ? `${task.monthSpan} months` : "Milestone"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="rounded-[1rem] border border-dashed border-[var(--border)] bg-white/70 p-4 text-sm text-[var(--muted)]">
                              No key dates sit in this planning phase yet.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.3rem] border border-[var(--border)] bg-white/85 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="eyebrow">Month Summary</p>
                      <h4 className="mt-2 text-2xl">Quick Month View</h4>
                    </div>
                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                      {timeline.monthSegments.length} months
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {timeline.tasksByMonth.map((month) => (
                      <div
                        key={month.key}
                        className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)]/25 px-4 py-2 text-sm text-[var(--foreground)]"
                      >
                        <span className="font-medium">{month.label}</span>
                        <span className="text-[var(--muted)]">
                          {" "}
                          · {pluralize(month.tasks.length, "item")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-[var(--border)] bg-white/80 p-6">
              <p className="eyebrow">Calendar Summary</p>
              <h3 className="mt-2 text-3xl">At A Glance</h3>
              <div className="mt-5 space-y-4 text-base leading-7 text-[var(--muted)]">
                <p>
                  {tasks.length > 0 ? (
                    <>
                      Your next planning window runs from{" "}
                      <strong className="text-[var(--foreground)]">
                        {formatDateLabel(tasks[0]?.startDate ?? "")}
                      </strong>{" "}
                      onwards, with the main focus currently sitting around guests, supplier confirmations, and final practical details.
                    </>
                  ) : (
                    <>
                      Add your first key dates here to turn this into a working planning overview for the months ahead.
                    </>
                  )}
                </p>
                <p>
                  Use this space as your working overview for the months ahead, so the important dates do not get lost across messages, emails, and notes.
                </p>
                <p>
                  As more dates are added, this roadmap becomes a clearer picture of what needs attention now, what can wait, and what is coming up next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
