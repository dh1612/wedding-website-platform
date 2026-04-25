"use client";

import { useMemo, useState } from "react";

type RSVPStatus = "attending" | "declined" | "pending";

type PortalGuest = {
  id: string;
  name: string;
  household: string;
  status: RSVPStatus;
  side: string;
  meal: "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";
  dietary: string;
  partySize: number;
  note: string;
};

type RSVPManagerProps = {
  guests: PortalGuest[];
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

export function RSVPManager({ guests }: RSVPManagerProps) {
  const [guestList, setGuestList] = useState<PortalGuest[]>(guests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RSVPStatus>("all");
  const [draft, setDraft] = useState<DraftGuest>(emptyDraft);
  const [statusMessage, setStatusMessage] = useState("");

  const filteredGuests = useMemo(() => {
    return guestList.filter((guest) => {
      const matchesSearch =
        guest.name.toLowerCase().includes(search.toLowerCase()) ||
        guest.household.toLowerCase().includes(search.toLowerCase()) ||
        (guest.note ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : guest.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [guestList, search, statusFilter]);

  const summary = useMemo(() => {
    return {
      totalGuests: guestList.length,
      attending: guestList.filter((guest) => guest.status === "attending").length,
      declined: guestList.filter((guest) => guest.status === "declined").length,
      pending: guestList.filter((guest) => guest.status === "pending").length,
      dietaryAlerts: guestList.filter(
        (guest) => guest.dietary && guest.dietary !== "Kids meal"
      ).length,
      households: new Set(guestList.map((guest) => guest.household)).size
    };
  }, [guestList]);

  const highlightedGuests = guestList
    .filter((guest) => guest.dietary || guest.note)
    .slice(0, 8);

  async function addGuest() {
    if (!draft.name.trim() || !draft.household.trim()) {
      return;
    }

    const response = await fetch("/api/portal/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: draft.name.trim(),
        household: draft.household.trim(),
        status: draft.status,
        meal: draft.meal,
        dietary: draft.dietary.trim()
      })
    });

    if (!response.ok) {
      setStatusMessage("Guest could not be added.");
      return;
    }

    const newGuest = (await response.json()) as PortalGuest;

    setGuestList((current) => [newGuest, ...current]);
    setDraft(emptyDraft);
    setStatusMessage("Guest added.");
  }

  async function removeGuest(id: string) {
    const previousGuests = guestList;
    setGuestList((current) => current.filter((guest) => guest.id !== id));

    const response = await fetch(`/api/portal/guests/${id}`, {
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

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {summaryCards.map((card) => (
            <div key={card.label} className="section-shell rounded-[1.5rem] p-5">
              <p className="eyebrow">{card.label}</p>
              <p className="mt-3 text-4xl">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-2 lg:px-8 lg:py-4">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="section-shell rounded-[2rem] p-8 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Guest List</p>
                <h2 className="mt-2 text-3xl">Manage Invitations & Replies</h2>
              </div>
              <div className="accent-panel rounded-full px-4 py-2 text-sm">
                Couples can add and remove guests here
              </div>
            </div>
            {statusMessage ? (
              <p className="mt-6 rounded-[1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
                {statusMessage}
              </p>
            ) : null}

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
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
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[var(--border)]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-black/5">
                  <tr>
                    <th className="px-4 py-3 font-medium">Guest</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Meal</th>
                    <th className="px-4 py-3 font-medium">Dietary</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.slice(0, 24).map((guest) => (
                    <tr key={guest.id} className="border-t border-[var(--border)]">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium">{guest.name}</p>
                          <p className="text-xs text-[var(--muted)]">
                            {guest.household} · {guest.side}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="accent-panel rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
                          {guest.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {guest.meal === "kids"
                          ? "Kids"
                          : guest.meal.charAt(0).toUpperCase() + guest.meal.slice(1)}
                      </td>
                      <td className="px-4 py-4">{guest.dietary || "None"}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => removeGuest(guest.id)}
                          className="text-sm font-medium text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-8">
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
                <select
                  value={draft.meal}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      meal: event.target.value as PortalGuest["meal"]
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
