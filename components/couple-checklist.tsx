"use client";

import { useMemo, useState } from "react";

type ChecklistItem = {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  notes: string;
};

type CoupleChecklistProps = {
  initialItems: ChecklistItem[];
  apiBasePath?: string;
};

export function CoupleChecklist({
  initialItems,
  apiBasePath = "/api/portal"
}: CoupleChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCategory, setDraftCategory] = useState("Planning");
  const [draftNote, setDraftNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const groupedItems = useMemo(() => {
    const groups = new Map<string, ChecklistItem[]>();

    for (const item of items) {
      const current = groups.get(item.category) ?? [];
      current.push(item);
      groups.set(item.category, current);
    }

    return Array.from(groups.entries());
  }, [items]);

  const completedCount = items.filter((item) => item.completed).length;

  async function toggleItem(id: string) {
    const currentItem = items.find((item) => item.id === id);

    if (!currentItem) {
      return;
    }

    const nextCompleted = !currentItem.completed;

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: nextCompleted } : item
      )
    );

    const response = await fetch(`${apiBasePath}/checklist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: nextCompleted
      })
    });

    if (!response.ok) {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, completed: currentItem.completed } : item
        )
      );
      setStatusMessage("That change did not save. Please try again.");
      return;
    }

    setStatusMessage("Checklist updated.");
  }

  function updateNote(id: string, notes: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  }

  async function saveNote(id: string) {
    const item = items.find((entry) => entry.id === id);

    if (!item) {
      return;
    }

    const response = await fetch(`${apiBasePath}/checklist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notes: item.notes
      })
    });

    setStatusMessage(
      response.ok ? "Notes saved." : "Notes could not be saved."
    );
  }

  async function addItem() {
    if (!draftTitle.trim()) return;

    const response = await fetch(`${apiBasePath}/checklist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: draftTitle.trim(),
        category: draftCategory,
        notes: draftNote.trim()
      })
    });

    if (!response.ok) {
      setStatusMessage("New task could not be added.");
      return;
    }

    const createdItem = (await response.json()) as ChecklistItem;

    setItems((current) => [
      createdItem,
      ...current
    ]);

    setDraftTitle("");
    setDraftCategory("Planning");
    setDraftNote("");
    setStatusMessage("Checklist item added.");
  }

  async function removeItem(id: string) {
    const previousItems = items;
    setItems((current) => current.filter((item) => item.id !== id));

    const response = await fetch(`${apiBasePath}/checklist/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setItems(previousItems);
      setStatusMessage("That task could not be removed.");
      return;
    }

    setStatusMessage("Checklist item removed.");
  }

  return (
    <section
      id="checklist"
      className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="section-shell rounded-[2rem] p-8">
          <p className="eyebrow">Wedding Checklist</p>
          <h2 className="mt-3 text-4xl">Project Tracker</h2>
          <p className="prose-copy mt-4 text-lg">
            Keep wedding tasks, reminders, and planning notes together so it is easy to see what is done and what still needs attention.
          </p>
          {statusMessage ? (
            <p className="mt-4 rounded-[1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
              {statusMessage}
            </p>
          ) : null}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="accent-panel rounded-[1.5rem] p-5">
              <p className="eyebrow">Completed</p>
              <p className="mt-3 text-4xl">{completedCount}</p>
            </div>
            <div className="accent-panel rounded-[1.5rem] p-5">
              <p className="eyebrow">Remaining</p>
              <p className="mt-3 text-4xl">{items.length - completedCount}</p>
            </div>
          </div>
          <div className="mt-8 space-y-4 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5">
            <h3 className="text-2xl">Add New Task</h3>
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="Example: Confirm florist delivery time"
              className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
            />
            <select
              value={draftCategory}
              onChange={(event) => setDraftCategory(event.target.value)}
              className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
            >
              <option>Planning</option>
              <option>Guests</option>
              <option>Venue</option>
              <option>Seating</option>
              <option>Suppliers</option>
              <option>Stationery</option>
            </select>
            <textarea
              value={draftNote}
              onChange={(event) => setDraftNote(event.target.value)}
              placeholder="Optional comment or reminder"
              rows={4}
              className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
            />
            <button onClick={addItem} className="accent-button rounded-full px-6 py-3 text-sm font-medium">
              Add Checklist Item
            </button>
          </div>
        </div>

        <div className="section-shell rounded-[2rem] p-8">
          <p className="eyebrow">Live List</p>
          <div className="mt-6 space-y-8">
            {groupedItems.map(([category, categoryItems]) => (
              <div key={category}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl">{category}</h3>
                  <span className="text-sm text-[var(--muted)]">
                    {categoryItems.filter((item) => item.completed).length}/{categoryItems.length} complete
                  </span>
                </div>
                <div className="space-y-4">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="accent-panel rounded-[1.5rem] p-5">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                            item.completed
                              ? "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white"
                              : "border-[var(--border)] bg-white"
                          }`}
                          aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                        >
                          {item.completed ? "✓" : ""}
                        </button>
                        <div className="flex-1">
                          <p className={`text-lg font-medium ${item.completed ? "line-through opacity-60" : ""}`}>
                            {item.title}
                          </p>
                          <textarea
                            value={item.notes}
                            onChange={(event) => updateNote(item.id, event.target.value)}
                            rows={3}
                            className="mt-3 w-full rounded-[1rem] border border-[var(--border)] bg-white/90 px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                          />
                          <div className="mt-3 flex flex-wrap gap-3">
                            <button
                              onClick={() => saveNote(item.id)}
                              className="accent-button rounded-full px-4 py-2 text-xs font-medium"
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--muted)]"
                            >
                              Remove Task
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
