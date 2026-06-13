"use client";

import { useMemo, useState } from "react";
import type { RSVPFormQuestion } from "@/types/wedding";

type RSVPStatus = "attending" | "declined" | "pending";

type PortalGuest = {
  id: string;
  name: string;
  household: string;
  email?: string;
  status: RSVPStatus;
  side: string;
  meal?: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
  dietary: string;
  partySize: number;
  note: string;
  songRequest?: string;
  messageToCouple?: string;
  customAnswers?: Record<string, string>;
};

type RSVPManagerProps = {
  guests: PortalGuest[];
  apiBasePath?: string;
  customQuestionLabels?: Record<string, string>;
  customSelectableQuestions?: RSVPFormQuestion[];
  showMealChoice?: boolean;
  demoMode?: boolean;
};

type DraftGuest = {
  name: string;
  household: string;
  status: RSVPStatus;
  meal: PortalGuest["meal"];
  dietary: string;
};

const emptyDraft: DraftGuest = {
  name: "",
  household: "",
  status: "pending",
  meal: "beef",
  dietary: ""
};

export function RSVPManager({
  guests,
  apiBasePath = "/api/portal",
  customQuestionLabels = {},
  customSelectableQuestions = [],
  showMealChoice = true,
  demoMode = false
}: RSVPManagerProps) {
  function isQuantityOption(option: string) {
    return /^\d+\+?$/.test(option.trim());
  }

  function getQuantityBaseValue(option: string) {
    const match = option.trim().match(/^(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  function isQuantityQuestion(question: RSVPFormQuestion) {
    const options = question.options ?? [];
    return options.length > 0 && options.every(isQuantityOption);
  }

  function getCustomQuestionLabel(questionId: string) {
    return customQuestionLabels[questionId] || questionId;
  }

  const [guestList, setGuestList] = useState<PortalGuest[]>(guests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RSVPStatus>("all");
  const [mealFilter, setMealFilter] = useState<
    "all" | NonNullable<PortalGuest["meal"]>
  >("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "has" | "none">("all");
  const [dietaryValueFilter, setDietaryValueFilter] = useState("");
  const [notesFilter, setNotesFilter] = useState<"all" | "has" | "none">("all");
  const [customFilters, setCustomFilters] = useState<Record<string, string[]>>({});
  const [openGroups, setOpenGroups] = useState<Record<RSVPStatus, boolean>>({
    attending: false,
    pending: false,
    declined: false
  });
  const [draft, setDraft] = useState<DraftGuest>(emptyDraft);
  const [statusMessage, setStatusMessage] = useState("");

  const filteredGuests = useMemo(() => {
    return guestList.filter((guest) => {
      const hasNotes =
        Boolean(guest.songRequest) ||
        Boolean(guest.messageToCouple) ||
        Boolean(guest.note) ||
        Boolean(Object.keys(guest.customAnswers ?? {}).length);
      const hasDietary = Boolean(guest.dietary && guest.dietary.trim());

      const matchesSearch =
        guest.name.toLowerCase().includes(search.toLowerCase()) ||
        guest.household.toLowerCase().includes(search.toLowerCase()) ||
        (guest.note ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (guest.songRequest ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (guest.messageToCouple ?? "").toLowerCase().includes(search.toLowerCase()) ||
        Object.values(guest.customAnswers ?? {}).some((answer) =>
          answer.toLowerCase().includes(search.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" ? true : guest.status === statusFilter;
      const matchesMeal =
        !showMealChoice || mealFilter === "all" ? true : guest.meal === mealFilter;
      const matchesDietary =
        dietaryFilter === "all"
          ? true
          : dietaryFilter === "has"
            ? hasDietary
            : !hasDietary;
      const matchesDietaryValue = !dietaryValueFilter
        ? true
        : (guest.dietary ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .includes(dietaryValueFilter);
      const matchesNotes =
        notesFilter === "all"
          ? true
          : notesFilter === "has"
            ? hasNotes
            : !hasNotes;
      const matchesCustomFilters = customSelectableQuestions
        .filter((question) => !isQuantityQuestion(question))
        .every((question) => {
        const selectedFilters = customFilters[question.id] ?? [];

        if (!selectedFilters.length) {
          return true;
        }

        const answer = guest.customAnswers?.[question.id] ?? "";

        if (question.type === "multiselect") {
          const selectedAnswers = answer
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

          return selectedFilters.every((filterValue) => selectedAnswers.includes(filterValue));
        }
          return selectedFilters.includes(answer.trim());
        });

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMeal &&
        matchesDietary &&
        matchesDietaryValue &&
        matchesNotes &&
        matchesCustomFilters
      );
    });
  }, [
    guestList,
    search,
    statusFilter,
    mealFilter,
    dietaryFilter,
    dietaryValueFilter,
    notesFilter,
    customSelectableQuestions,
    customFilters,
    showMealChoice
  ]);

  const summary = useMemo(() => {
    const sumPartySize = (status?: RSVPStatus) =>
      guestList
        .filter((guest) => (status ? guest.status === status : true))
        .reduce((total, guest) => total + Math.max(guest.partySize || 1, 0), 0);

    return {
      totalGuests: sumPartySize(),
      attending: sumPartySize("attending"),
      declined: sumPartySize("declined"),
      pending: sumPartySize("pending"),
      dietaryAlerts: guestList.filter(
        (guest) => guest.dietary && guest.dietary !== "Kids meal"
      ).length,
      households: new Set(guestList.map((guest) => guest.household)).size
    };
  }, [guestList]);

  const highlightedGuests = guestList
    .filter(
      (guest) =>
        guest.dietary ||
        guest.note ||
        guest.songRequest ||
        guest.messageToCouple ||
        Object.keys(guest.customAnswers ?? {}).length
    )
    .slice(0, 8);

  function renderGuestNotes(guest: PortalGuest) {
    const customEntries = Object.entries(guest.customAnswers ?? {});

    if (!guest.songRequest && !guest.messageToCouple && !customEntries.length) {
      return <p>None</p>;
    }

    return (
      <div className="space-y-2">
        {guest.songRequest ? (
          <div className="rounded-[0.9rem] border border-[var(--border)] bg-white/80 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Song
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground)]">{guest.songRequest}</p>
          </div>
        ) : null}
        {guest.messageToCouple ? (
          <div className="rounded-[0.9rem] border border-[var(--border)] bg-white/80 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Message
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground)]">
              {guest.messageToCouple}
            </p>
          </div>
        ) : null}
        {customEntries.map(([question, answer]) => (
          <div
            key={question}
            className="rounded-[0.9rem] border border-[var(--border)] bg-white/80 px-3 py-2"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {getCustomQuestionLabel(question)}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--foreground)]">{answer}</p>
          </div>
        ))}
      </div>
    );
  }

  async function addGuest() {
    if (!draft.name.trim() || !draft.household.trim()) {
      setStatusMessage("Add at least a guest name and household before saving.");
      return;
    }

    if (demoMode) {
      const newGuest: PortalGuest = {
        id: `demo-guest-${Date.now()}`,
        name: draft.name.trim(),
        household: draft.household.trim(),
        status: draft.status,
        side: "guest list",
        meal: showMealChoice ? draft.meal : undefined,
        dietary: draft.dietary.trim(),
        partySize: 1,
        note: ""
      };

      setGuestList((current) => [newGuest, ...current]);
      setDraft(emptyDraft);
      setStatusMessage("Demo mode: guest changes can be explored here, but they are not saved.");
      return;
    }

    const response = await fetch(`${apiBasePath}/guests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: draft.name.trim(),
        household: draft.household.trim(),
        status: draft.status,
        meal: showMealChoice ? draft.meal : undefined,
        dietary: draft.dietary.trim()
      })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatusMessage(payload?.error || "Guest could not be added.");
      return;
    }

    const newGuest = (await response.json()) as PortalGuest;

    setGuestList((current) => [newGuest, ...current]);
    setDraft(emptyDraft);
    setStatusMessage("Guest added.");
  }

  async function removeGuest(id: string) {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "Are you sure you want to remove this guest? This also removes their RSVP response from this wedding."
      );

      if (!confirmed) {
        return;
      }
    }

    const previousGuests = guestList;
    setGuestList((current) => current.filter((guest) => guest.id !== id));

    if (demoMode) {
      setStatusMessage("Demo mode: removals are only for preview and reset on refresh.");
      return;
    }

    const response = await fetch(`${apiBasePath}/guests/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setGuestList(previousGuests);
      setStatusMessage("Guest could not be removed.");
      return;
    }

    setStatusMessage("Guest removed.");
  }

  const summaryCards = [
    { label: "Total Guests", value: summary.totalGuests },
    { label: "Attending", value: summary.attending },
    { label: "Declined", value: summary.declined },
    { label: "Pending", value: summary.pending },
    { label: "Dietary Alerts", value: summary.dietaryAlerts },
    { label: "Households", value: summary.households }
  ];

  const groupedGuests: Array<{
    status: RSVPStatus;
    label: string;
    guests: PortalGuest[];
    guestCount: number;
  }> = [
    {
      status: "attending",
      label: "Attending",
      guests: filteredGuests.filter((guest) => guest.status === "attending"),
      guestCount: filteredGuests
        .filter((guest) => guest.status === "attending")
        .reduce((total, guest) => total + Math.max(guest.partySize || 1, 0), 0)
    },
    {
      status: "pending",
      label: "Pending",
      guests: filteredGuests.filter((guest) => guest.status === "pending"),
      guestCount: filteredGuests
        .filter((guest) => guest.status === "pending")
        .reduce((total, guest) => total + Math.max(guest.partySize || 1, 0), 0)
    },
    {
      status: "declined",
      label: "Declined",
      guests: filteredGuests.filter((guest) => guest.status === "declined"),
      guestCount: filteredGuests
        .filter((guest) => guest.status === "declined")
        .reduce((total, guest) => total + Math.max(guest.partySize || 1, 0), 0)
    }
  ];

  function toggleGroup(status: RSVPStatus) {
    setOpenGroups((current) => ({
      ...current,
      [status]: !current[status]
    }));
  }

  function toggleCustomFilter(questionId: string, option: string) {
    setCustomFilters((current) => {
      const currentValues = current[questionId] ?? [];
      const nextValues = currentValues.includes(option)
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option];

      return {
        ...current,
        [questionId]: nextValues
      };
    });
  }

  const filterableCustomQuestions = customSelectableQuestions.filter(
    (question) => !isQuantityQuestion(question)
  );

  const customQuestionSummaries = customSelectableQuestions.map((question) => {
    const options = (question.options ?? []).map((option) => ({
      option,
      count: guestList.filter((guest) => {
        const answer = guest.customAnswers?.[question.id] ?? "";
        if (!answer) return false;

        if (question.type === "multiselect") {
          return answer
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .includes(option);
        }

        return answer.trim() === option;
      }).length
    }));

    const totalResponses = options.reduce((total, item) => total + item.count, 0);
    const estimatedGuests = isQuantityQuestion(question)
      ? options.reduce(
          (total, item) => total + getQuantityBaseValue(item.option) * item.count,
          0
        )
      : 0;

    return {
      question,
      options,
      totalResponses,
      estimatedGuests,
      isQuantity: isQuantityQuestion(question)
    };
  });

  const dietaryValueOptions = Array.from(
    new Set(
      guestList
        .flatMap((guest) =>
          (guest.dietary ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
        .filter(Boolean)
    )
  );

  return (
    <>
      <section className="mx-auto w-full max-w-[92rem] px-6 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {summaryCards.map((card) => (
            <div key={card.label} className="section-shell rounded-[1.5rem] p-5">
              <p className="eyebrow">{card.label}</p>
              <p className="mt-3 text-4xl">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[92rem] px-6 py-2 lg:px-8 lg:py-4">
        <div className="space-y-8">
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Guest List</p>
                <h2 className="mt-2 text-3xl">Review Invitations & Replies</h2>
              </div>
              <div className="accent-panel rounded-full px-4 py-2 text-sm">
                Review replies first, then update the guest list if needed
              </div>
            </div>
            {demoMode ? (
              <p className="mt-6 rounded-[1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                Interactive demo: filters, counts, and guest updates work here for preview purposes, but nothing is stored after you leave this page.
              </p>
            ) : null}
            {statusMessage ? (
              <p className="mt-6 rounded-[1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                {statusMessage}
              </p>
            ) : null}

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_220px_220px_220px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search guest, household, or note"
                className="rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              />
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "all" | RSVPStatus)
                }
                className="rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              >
                <option value="all">All statuses</option>
                <option value="attending">Attending</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>
              {showMealChoice ? (
                <select
                  value={mealFilter}
                  onChange={(event) =>
                    setMealFilter(event.target.value as "all" | NonNullable<PortalGuest["meal"]>)
                  }
                  className="rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  <option value="all">All meals</option>
                  <option value="beef">Beef</option>
                  <option value="fish">Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="kids">Kids</option>
                  <option value="custom">Custom</option>
                </select>
              ) : null}
              <select
                value={dietaryFilter}
                onChange={(event) =>
                  setDietaryFilter(event.target.value as "all" | "has" | "none")
                }
                className="rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              >
                <option value="all">All dietary</option>
                <option value="has">Has dietary note</option>
                <option value="none">No dietary note</option>
              </select>
              <select
                value={notesFilter}
                onChange={(event) =>
                  setNotesFilter(event.target.value as "all" | "has" | "none")
                }
                className="rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              >
                <option value="all">All notes</option>
                <option value="has">Has notes / messages</option>
                <option value="none">No notes / messages</option>
              </select>
            </div>

            {dietaryValueOptions.length ? (
              <div className="mt-4 max-w-sm">
                <select
                  value={dietaryValueFilter}
                  onChange={(event) => setDietaryValueFilter(event.target.value)}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  <option value="">All dietary answers</option>
                  {dietaryValueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {filterableCustomQuestions.length ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filterableCustomQuestions.map((question) => {
                  const selectedFilters = customFilters[question.id] ?? [];

                  return (
                    <div
                      key={question.id}
                      className="rounded-[1rem] border border-[var(--border)] bg-white px-4 py-4"
                    >
                      <p className="text-sm font-medium text-[var(--foreground)]">{question.label}</p>
                      <div className="mt-3 space-y-2">
                        {(question.options ?? []).map((option) => {
                          const checked = selectedFilters.includes(option);

                          return (
                            <label
                              key={option}
                              className="flex items-center gap-3 text-sm text-[var(--foreground)]"
                            >
                              <input
                                type={question.type === "multiselect" ? "checkbox" : "radio"}
                                name={`custom-filter-${question.id}`}
                                checked={checked}
                                onChange={() =>
                                  question.type === "multiselect"
                                    ? toggleCustomFilter(question.id, option)
                                    : setCustomFilters((current) => ({
                                        ...current,
                                        [question.id]: checked ? [] : [option]
                                      }))
                                }
                              />
                              <span>{option}</span>
                            </label>
                          );
                        })}
                      </div>
                      {selectedFilters.length ? (
                        <button
                          type="button"
                          onClick={() =>
                            setCustomFilters((current) => ({
                              ...current,
                              [question.id]: []
                            }))
                          }
                          className="mt-3 text-sm text-[var(--accent-strong)] underline-offset-4 hover:underline"
                        >
                          Clear filter
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {customQuestionSummaries.length ? (
              <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5">
                <p className="eyebrow">Custom Question Counts</p>
                <div className="mt-4 space-y-5">
                  {customQuestionSummaries.map(
                    ({ question, options, totalResponses, estimatedGuests, isQuantity }) => (
                      <div key={question.id}>
                        <h3 className="text-lg">{question.label}</h3>
                        {isQuantity ? (
                          <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                            <div className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-4">
                              <p className="text-sm text-[var(--muted)]">Summary</p>
                              <p className="mt-2 text-2xl">
                                {estimatedGuests} guest{estimatedGuests === 1 ? "" : "s"}
                              </p>
                              <p className="mt-1 text-sm text-[var(--muted)]">
                                across {totalResponses} submission{totalResponses === 1 ? "" : "s"}
                              </p>
                            </div>
                            <div className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-4">
                              <p className="text-sm text-[var(--muted)]">Breakdown</p>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                {options.map(({ option, count }) => (
                                  <div
                                    key={option}
                                    className="rounded-[0.9rem] border border-[var(--border)] bg-white px-3 py-3"
                                  >
                                    <p className="text-sm text-[var(--muted)]">{option}</p>
                                    <p className="mt-2 text-xl">{count}</p>
                                    <p className="mt-1 text-xs text-[var(--muted)]">
                                      submission{count === 1 ? "" : "s"}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {options.map(({ option, count }) => (
                              <div
                                key={option}
                                className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3"
                              >
                                <p className="text-sm text-[var(--muted)]">{option}</p>
                                <p className="mt-2 text-2xl">{count}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : null}

            <div className="mt-6 space-y-4">
              {groupedGuests.map((group) => (
                <div key={group.status} className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-white/70">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.status)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div>
                      <p className="eyebrow">{group.label}</p>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {group.guestCount} guest{group.guestCount === 1 ? "" : "s"} · {group.guests.length} submission{group.guests.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-[var(--accent-strong)]">
                      {openGroups[group.status] ? "Collapse" : "Expand"}
                    </span>
                  </button>

                  {openGroups[group.status] ? (
                    <div className="border-t border-[var(--border)]">
                      {group.guests.length ? (
                        <div className="divide-y divide-[var(--border)]">
                          {group.guests.map((guest) => (
                            <div
                              key={guest.id}
                              className={`grid gap-5 px-5 py-5 ${
                                showMealChoice
                                  ? "lg:grid-cols-[minmax(0,1.1fr)_140px_120px_140px_180px_minmax(0,1.4fr)_100px]"
                                  : "lg:grid-cols-[minmax(0,1.1fr)_140px_120px_180px_minmax(0,1.4fr)_100px]"
                              }`}
                            >
                              <div>
                                <p className="font-medium text-[var(--foreground)]">{guest.name}</p>
                                <p className="mt-1 text-sm text-[var(--muted)]">
                                  {guest.household} · {guest.side}
                                </p>
                              </div>
                              <div>
                                <p className="eyebrow">Status</p>
                                <span className="mt-2 inline-flex accent-panel rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                                  {guest.status}
                                </span>
                              </div>
                              <div>
                                <p className="eyebrow">Guests</p>
                                <p className="mt-2 text-sm text-[var(--foreground)]">
                                  {guest.partySize}
                                </p>
                              </div>
                              {showMealChoice ? (
                                <div>
                                  <p className="eyebrow">Meal</p>
                                  <p className="mt-2 text-sm text-[var(--foreground)]">
                                    {guest.meal
                                      ? guest.meal === "kids"
                                        ? "Kids"
                                        : guest.meal.charAt(0).toUpperCase() + guest.meal.slice(1)
                                      : "None"}
                                  </p>
                                </div>
                              ) : null}
                              <div>
                                <p className="eyebrow">Dietary</p>
                                <p className="mt-2 text-sm text-[var(--foreground)]">
                                  {guest.dietary || "None"}
                                </p>
                              </div>
                              <div>
                                <p className="eyebrow">Notes</p>
                                <div className="mt-2 text-xs text-[var(--muted)]">{renderGuestNotes(guest)}</div>
                              </div>
                              <div className="flex items-start justify-start lg:justify-end">
                                <button
                                  onClick={() => removeGuest(guest.id)}
                                  className="text-sm font-medium text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-5 py-5 text-sm text-[var(--muted)]">
                          No guests match this group with the current filters.
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="section-shell rounded-[2rem] p-8">
              <p className="eyebrow">Add Guest</p>
              <h2 className="mt-3 text-3xl">Manual Entry</h2>
              <div className="mt-6 space-y-4">
                <input
                  value={draft.name}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Guest name"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                />
                <input
                  value={draft.household}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      household: event.target.value
                    }))
                  }
                  placeholder="Household / family name"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                />
                <select
                  value={draft.status}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      status: event.target.value as RSVPStatus
                    }))
                  }
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  <option value="pending">Pending</option>
                  <option value="attending">Attending</option>
                  <option value="declined">Declined</option>
                </select>
                {showMealChoice ? (
                  <select
                    value={draft.meal}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        meal: event.target.value as NonNullable<PortalGuest["meal"]>
                      }))
                    }
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                  >
                    <option value="beef">Beef</option>
                    <option value="fish">Fish</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="kids">Kids</option>
                  </select>
                ) : null}
                <textarea
                  value={draft.dietary}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      dietary: event.target.value
                    }))
                  }
                  placeholder="Dietary note if any"
                  rows={3}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                />
                <button
                  onClick={addGuest}
                  className="accent-button rounded-full px-6 py-3 text-sm font-medium"
                >
                  Add Guest
                </button>
              </div>
            </div>

            <div className="section-shell rounded-[2rem] p-8">
              <p className="eyebrow">Watch List</p>
              <h2 className="mt-3 text-3xl">Dietary & Notes</h2>
              <div className="mt-6 space-y-4">
                {highlightedGuests.map((guest) => (
                  <div key={guest.id} className="accent-panel rounded-[1.25rem] p-4">
                    <p className="font-medium">{guest.name}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {guest.dietary || "Guest note"}
                      {guest.note ? ` · ${guest.note}` : ""}
                    </p>
                    {guest.songRequest ? (
                      <p className="mt-1 text-sm text-[var(--muted)]">Song request: {guest.songRequest}</p>
                    ) : null}
                    {guest.messageToCouple ? (
                      <p className="mt-1 text-sm text-[var(--muted)]">Message: {guest.messageToCouple}</p>
                    ) : null}
                    {guest.customAnswers
                      ? Object.entries(guest.customAnswers).map(([question, answer]) => (
                          <p key={question} className="mt-1 text-sm text-[var(--muted)]">
                            {getCustomQuestionLabel(question)}: {answer}
                          </p>
                        ))
                      : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
