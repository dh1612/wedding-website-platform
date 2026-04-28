"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SeatingPlannerProps = {
  guests: PlannerGuest[];
  tables: PlannerTableInput[];
};

type PlannerGuest = {
  id: string;
  name: string;
  household: string;
  status: "attending" | "declined" | "pending";
  side: string;
  meal: string;
  dietary: string;
  partySize: number;
  note?: string;
  tableId?: string;
};

type PlannerTableInput = {
  id: string;
  name: string;
  x?: number;
  y?: number;
  seats: number;
  shape: "round" | "long";
  rotation?: number;
  guests?: string[];
};

type DragGuestPayload = {
  type: "guest";
  guestId: string;
};

type DragTablePayload = {
  type: "table";
  tableId: string;
};

type DragPayload = DragGuestPayload | DragTablePayload;

type PlannerTable = PlannerTableInput & {
  x: number;
  y: number;
  rotation: number;
  guests: string[];
  isPlaced: boolean;
};

const starterTables: Array<Pick<PlannerTable, "name" | "shape" | "seats">> = [
  { name: "Top Table", shape: "long", seats: 8 },
  { name: "Table 1", shape: "round", seats: 10 },
  { name: "Table 2", shape: "round", seats: 10 },
  { name: "Table 3", shape: "round", seats: 10 },
  { name: "Table 4", shape: "round", seats: 10 },
  { name: "Table 5", shape: "round", seats: 10 },
  { name: "Table 6", shape: "round", seats: 10 },
  { name: "Table 7", shape: "round", seats: 10 },
  { name: "Table 8", shape: "round", seats: 10 },
  { name: "Table 9", shape: "round", seats: 10 },
  { name: "Table 10", shape: "round", seats: 10 },
  { name: "Band", shape: "long", seats: 4 },
  { name: "Dessert Station", shape: "long", seats: 4 }
];

function seatPosition(index: number, total: number, radius: number) {
  const angle = (Math.PI * 2 * index) / Math.max(total, 1) - Math.PI / 2;

  return {
    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
    top: `calc(50% + ${Math.sin(angle) * radius}px)`
  };
}

function createBlankTables(): PlannerTable[] {
  return starterTables.map((table, index) => ({
    id: `planner-table-${index + 1}`,
    name: table.name,
    shape: table.shape,
    seats: table.seats,
    x: 50,
    y: 50,
    rotation: 0,
    guests: [],
    isPlaced: false
  }));
}

export function SeatingPlanner({ guests }: SeatingPlannerProps) {
  const [plannerTables, setPlannerTables] = useState<PlannerTable[]>(() =>
    createBlankTables()
  );
  const [guestAssignments, setGuestAssignments] = useState<Record<string, string | undefined>>(
    () => Object.fromEntries(guests.map((guest) => [guest.id, undefined]))
  );
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [guestSearch, setGuestSearch] = useState("");
  const [lastSaved, setLastSaved] = useState("Not saved yet");
  const [isCompactView, setIsCompactView] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updateCompactMode() {
      setIsCompactView(window.innerWidth < 1024);
    }

    updateCompactMode();
    window.addEventListener("resize", updateCompactMode);

    return () => window.removeEventListener("resize", updateCompactMode);
  }, []);

  const attendingGuests = useMemo(
    () => guests.filter((guest) => guest.status === "attending"),
    [guests]
  );

  const placedTables = plannerTables.filter((table) => table.isPlaced);
  const unplacedTables = plannerTables.filter((table) => !table.isPlaced);
  const selectedTable =
    plannerTables.find((table) => table.id === selectedTableId) ?? placedTables[0] ?? null;
  const selectedGuests = attendingGuests.filter(
    (guest) => guestAssignments[guest.id] === selectedTable?.id
  );
  const assignedSeats = attendingGuests.filter((guest) => guestAssignments[guest.id]).length;
  const unassignedGuests = attendingGuests.filter((guest) => !guestAssignments[guest.id]);

  const guestSearchResults = attendingGuests
    .filter((guest) => guestAssignments[guest.id] !== selectedTable?.id)
    .filter((guest) => {
      const query = guestSearch.trim().toLowerCase();
      if (!query) return true;

      return (
        guest.name.toLowerCase().includes(query) ||
        guest.household.toLowerCase().includes(query)
      );
    })
    .slice(0, 10);

  function tableGuests(tableId: string) {
    return attendingGuests.filter((guest) => guestAssignments[guest.id] === tableId);
  }

  function parsePayload(event: React.DragEvent<HTMLElement>): DragPayload | null {
    const raw = event.dataTransfer.getData("application/json");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as DragPayload;
    } catch {
      return null;
    }
  }

  function handleGuestDragStart(event: React.DragEvent<HTMLElement>, guestId: string) {
    const payload: DragGuestPayload = { type: "guest", guestId };
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "move";
  }

  function handleTableDragStart(event: React.DragEvent<HTMLDivElement>, tableId: string) {
    const payload: DragTablePayload = { type: "table", tableId };
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "move";
  }

  function assignGuest(guestId: string, tableId?: string) {
    setGuestAssignments((current) => ({
      ...current,
      [guestId]: tableId
    }));
  }

  function placeOrMoveTable(tableId: string, clientX: number, clientY: number) {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.getBoundingClientRect();
    const x = ((clientX - canvas.left) / canvas.width) * 100;
    const y = ((clientY - canvas.top) / canvas.height) * 100;

    setPlannerTables((current) =>
      current.map((table) =>
        table.id === tableId
          ? {
              ...table,
              isPlaced: true,
              x: Math.min(94, Math.max(6, x)),
              y: Math.min(90, Math.max(8, y))
            }
          : table
      )
    );
    setSelectedTableId(tableId);
  }

  function handleCanvasDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const payload = parsePayload(event);
    if (!payload) return;

    if (payload.type === "table") {
      placeOrMoveTable(payload.tableId, event.clientX, event.clientY);
    }
  }

  function handleTableDrop(event: React.DragEvent<HTMLElement>, tableId: string) {
    event.preventDefault();
    const payload = parsePayload(event);
    if (!payload) return;

    if (payload.type === "guest") {
      assignGuest(payload.guestId, tableId);
      setSelectedTableId(tableId);
      return;
    }

    if (payload.type === "table") {
      placeOrMoveTable(payload.tableId, event.clientX, event.clientY);
    }
  }

  function handleUnassignedDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const payload = parsePayload(event);
    if (payload?.type === "guest") {
      assignGuest(payload.guestId, undefined);
    }
  }

  function rotateSelectedTable() {
    if (!selectedTable) return;
    setPlannerTables((current) =>
      current.map((table) =>
        table.id === selectedTable.id
          ? { ...table, rotation: (table.rotation + 90) % 360 }
          : table
      )
    );
  }

  function toggleSelectedShape() {
    if (!selectedTable) return;
    setPlannerTables((current) =>
      current.map((table) =>
        table.id === selectedTable.id
          ? { ...table, shape: table.shape === "round" ? "long" : "round" }
          : table
      )
    );
  }

  function saveArrangement() {
    setLastSaved(
      new Date().toLocaleTimeString("en-IE", {
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  }

  function addGuestToSelectedTable(guestId: string) {
    if (!selectedTable) return;
    assignGuest(guestId, selectedTable.id);
    setGuestSearch("");
  }

  function placeTableFromPalette(tableId: string) {
    const placedCount = plannerTables.filter((table) => table.isPlaced).length;
    const xPositions = [22, 50, 78];
    const yPositions = [20, 40, 60, 80];
    const x = xPositions[placedCount % xPositions.length] ?? 50;
    const y = yPositions[Math.floor(placedCount / xPositions.length) % yPositions.length] ?? 50;

    setPlannerTables((current) =>
      current.map((table) =>
        table.id === tableId
          ? {
              ...table,
              isPlaced: true,
              x,
              y
            }
          : table
      )
    );
    setSelectedTableId(tableId);
  }

  function renameSelectedTable(name: string) {
    if (!selectedTable) return;

    setPlannerTables((current) =>
      current.map((table) =>
        table.id === selectedTable.id
          ? {
              ...table,
              name
            }
          : table
      )
    );
  }

  return (
    <>
      <section className="mx-auto w-full max-w-[1900px] px-4 pt-6 lg:px-6">
        <div className="section-shell rounded-[1.75rem] p-5 sm:p-6">
          <p className="eyebrow">Optimised For Desktop Or Tablet</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Best for a slower planning session with room to think</h2>
          <p className="prose-copy mt-3">
            For the smoothest seating planning experience, open this on a laptop or tablet when
            you are ready to map everything out properly. Phone view still works for lighter table
            and guest assignment, and the same planner state carries across.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1900px] px-4 py-8 lg:px-6 lg:py-12">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="section-shell rounded-[1.5rem] p-5">
            <p className="eyebrow">Placed Tables</p>
            <p className="mt-3 text-4xl">{placedTables.length}</p>
          </div>
          <div className="section-shell rounded-[1.5rem] p-5">
            <p className="eyebrow">Available Tables</p>
            <p className="mt-3 text-4xl">{unplacedTables.length}</p>
          </div>
          <div className="section-shell rounded-[1.5rem] p-5">
            <p className="eyebrow">Assigned</p>
            <p className="mt-3 text-4xl">{assignedSeats}</p>
          </div>
          <div className="section-shell rounded-[1.5rem] p-5">
            <p className="eyebrow">Unassigned</p>
            <p className="mt-3 text-4xl">{unassignedGuests.length}</p>
          </div>
          <div className="section-shell rounded-[1.5rem] p-5">
            <p className="eyebrow">Saved</p>
            <p className="mt-3 text-2xl">{lastSaved}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1900px] px-4 py-2 lg:px-6 lg:py-4">
        <div className="grid gap-8 2xl:grid-cols-[0.34fr_1fr]">
          <div className="section-shell rounded-[2rem] p-6 sm:p-8">
            <p className="eyebrow">Build The Room</p>
            <h2 className="mt-2 text-3xl">Table Palette</h2>
            <p className="prose-copy mt-3">
              Start with a blank canvas. Drag tables and features into the room, then click one to assign guests.
            </p>
            <div className="mt-6 grid max-h-[28rem] gap-3 overflow-y-auto pr-1">
              {unplacedTables.map((table) => (
                <div
                  key={table.id}
                  draggable
                  onDragStart={(event) => handleTableDragStart(event, table.id)}
                  className="accent-panel flex cursor-grab items-center justify-between rounded-[1.25rem] p-4 active:cursor-grabbing"
                >
                  <div>
                    <p className="font-medium">{table.name}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {table.shape === "round" ? "Round table" : "Long table"} · {table.seats} seats
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {isCompactView ? (
                      <button
                        type="button"
                        onClick={() => placeTableFromPalette(table.id)}
                        className="rounded-full border border-[var(--border)] bg-white/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]"
                      >
                        Add
                      </button>
                    ) : null}
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                      {isCompactView ? "Tap In" : "Drag In"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Blank Canvas</p>
                <h2 className="mt-2 text-4xl sm:text-5xl">Reception Room</h2>
                <p className="prose-copy mt-3 text-lg">
                  Drop tables into the room to build the layout from scratch. Once a table is placed, click it to assign guests in the focused planner below.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <button onClick={toggleSelectedShape} className="accent-panel rounded-full px-4 py-2">
                  Shape
                </button>
                <button onClick={rotateSelectedTable} className="accent-panel rounded-full px-4 py-2">
                  Rotate
                </button>
                <button onClick={saveArrangement} className="accent-panel rounded-full px-4 py-2">
                  Save arrangement
                </button>
              </div>
            </div>

            {isCompactView ? (
              <div className="mt-8 space-y-4">
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
                  <p className="eyebrow">Touch-Friendly Room View</p>
                  <h3 className="mt-2 text-3xl">Placed Tables</h3>
                  <p className="prose-copy mt-3">
                    On phone, use the table cards below to place a table, pick it, and assign
                    guests without dragging around the full room canvas.
                  </p>
                </div>
                {placedTables.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {placedTables.map((table) => {
                      const seatedGuests = tableGuests(table.id);
                      const isSelected = table.id === selectedTable?.id;

                      return (
                        <button
                          key={table.id}
                          type="button"
                          onClick={() => setSelectedTableId(table.id)}
                          className={`rounded-[1.4rem] border p-4 text-left ${
                            isSelected
                              ? "border-[var(--accent-strong)] bg-white shadow-[var(--shadow)]"
                              : "border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_88%,white)]"
                          }`}
                        >
                          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                            {table.shape === "round" ? "Round table" : "Long table"}
                          </p>
                          <p className="mt-2 text-2xl">{table.name}</p>
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {seatedGuests.length}/{table.seats} seats filled
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-6 text-center">
                    <p className="eyebrow">Start Here</p>
                    <h3 className="mt-3 text-3xl">Add Your First Table</h3>
                    <p className="prose-copy mt-3">
                      Use the palette to add tables into the planner. Desktop and tablet give the
                      full room-building version when you are ready for a more detailed pass.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div
                ref={canvasRef}
                className="relative mt-8 min-h-[1100px] overflow-hidden rounded-[1.75rem] border border-dashed border-[var(--border)] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.04))] xl:min-h-[1220px]"
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleCanvasDrop}
              >
                {!placedTables.length ? (
                  <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                    <div className="max-w-xl rounded-[2rem] border border-[var(--border)] bg-white/70 px-8 py-10 shadow-[var(--shadow)]">
                      <p className="eyebrow">Start Here</p>
                      <h3 className="mt-3 text-4xl">Drop Your First Table</h3>
                      <p className="prose-copy mt-4 text-lg">
                        Use the table palette on the left to drag in a top table, round tables, or room features. This planner now starts as a blank room.
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="absolute left-[4%] top-[4%] rounded-full border border-dashed border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Dance Floor
                </div>

                {placedTables.map((table) => {
                  const seatedGuests = tableGuests(table.id);
                  const isSelected = table.id === selectedTable?.id;

                  return (
                    <div
                      key={table.id}
                      draggable
                      onClick={() => setSelectedTableId(table.id)}
                      onDragStart={(event) => handleTableDragStart(event, table.id)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => handleTableDrop(event, table.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-move border p-4 shadow-[var(--shadow)] backdrop-blur ${
                        table.shape === "round"
                          ? "h-48 w-48 rounded-full"
                          : "h-[8.5rem] w-[17rem] rounded-[1.75rem]"
                      } ${
                        isSelected
                          ? "border-[var(--accent-strong)] ring-4 ring-[var(--accent)]/25"
                          : "border-[var(--border)]"
                      } bg-[color:color-mix(in_srgb,var(--surface)_90%,white)]/98`}
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        transform: `translate(-50%, -50%) rotate(${table.rotation}deg)`
                      }}
                    >
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                          {table.name === "Band" || table.name === "Dessert Station"
                            ? "Feature"
                            : "Table"}
                        </p>
                        <p className="mt-1 text-[2rem] font-medium leading-none">{table.name}</p>
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {seatedGuests.length}/{table.seats} seats filled
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                          Click To Edit
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1900px] px-4 py-6 lg:px-6 lg:py-6">
        <div className="grid gap-8 2xl:grid-cols-[0.9fr_1.4fr]">
          <div
            className="section-shell rounded-[2rem] p-8"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleUnassignedDrop}
          >
            <p className="eyebrow">Guest Pool</p>
            <h2 className="mt-3 text-3xl">Unassigned Guests</h2>
            <p className="prose-copy mt-2">
              Keep the room blank until you are ready, then drag guests onto a selected table or add them from search.
            </p>
            <div className="mt-6 grid max-h-[26rem] gap-3 overflow-y-auto pr-1">
              {unassignedGuests.slice(0, 18).map((guest) => (
                <div
                  key={guest.id}
                  draggable
                  onDragStart={(event) => handleGuestDragStart(event, guest.id)}
                  className="accent-panel flex cursor-grab items-center justify-between rounded-[1.25rem] p-4 active:cursor-grabbing"
                >
                  <div>
                    <p className="font-medium">{guest.name}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {guest.household} · {guest.meal}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    Drag
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="section-shell rounded-[2rem] p-8"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              if (selectedTable) {
                handleTableDrop(event, selectedTable.id);
              }
            }}
          >
            <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="eyebrow">Focused Table Planner</p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-4xl">
                      {selectedTable ? selectedTable.name : "Select A Table"}
                    </h2>
                    <p className="prose-copy mt-2">
                      {selectedTable
                        ? `${selectedGuests.length}/${selectedTable.seats} guests assigned`
                        : "Click a placed table in the room overview to start assigning guests."}
                    </p>
                  </div>
                </div>

                {selectedTable ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-[1fr_180px_160px]">
                    <label className="block">
                      <span className="text-sm font-medium text-[var(--foreground)]">Table name</span>
                      <input
                        value={selectedTable.name}
                        onChange={(event) => renameSelectedTable(event.target.value)}
                        className="mt-2 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                      />
                    </label>
                    <div>
                      <span className="text-sm font-medium text-[var(--foreground)]">Shape</span>
                      <div className="mt-2 rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]">
                        {selectedTable.shape === "round" ? "Round" : "Long"}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[var(--foreground)]">Seats</span>
                      <div className="mt-2 rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]">
                        {selectedTable.seats}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 flex min-h-[420px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.04))] p-6 sm:min-h-[720px] sm:p-8">
                  {selectedTable ? (
                    isCompactView ? (
                      <div className="w-full max-w-xl space-y-4">
                        <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/90 p-5 text-center shadow-[var(--shadow)]">
                          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                            {selectedTable.shape === "round" ? "Round table" : "Long table"}
                          </p>
                          <p className="mt-2 text-3xl">{selectedTable.name}</p>
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {selectedGuests.length}/{selectedTable.seats} guests assigned
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {selectedGuests.slice(0, selectedTable.seats).map((guest, index) => (
                            <div
                              key={guest.id}
                              className="rounded-[1rem] border border-[var(--border)] bg-white/92 px-4 py-3 text-sm shadow-sm"
                            >
                              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                                Seat {index + 1}
                              </p>
                              <p className="mt-1 font-medium">{guest.name}</p>
                            </div>
                          ))}
                          {!selectedGuests.length ? (
                            <div className="rounded-[1rem] border border-[var(--border)] bg-white/80 px-4 py-3 text-sm text-[var(--muted)] sm:col-span-2">
                              No guests assigned yet. Add people from the search panel below.
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-[560px] w-[560px]">
                        {selectedTable.shape === "round" ? (
                          <div className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_92%,white)] shadow-[var(--shadow)]">
                            <div className="text-center">
                              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                                Table
                              </p>
                              <p className="mt-2 text-4xl">{selectedTable.name}</p>
                              <p className="mt-2 text-sm text-[var(--muted)]">
                                Build this table seat by seat
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute left-1/2 top-1/2 flex h-36 w-96 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_92%,white)] shadow-[var(--shadow)]">
                            <div className="text-center">
                              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                                Table
                              </p>
                              <p className="mt-2 text-4xl">{selectedTable.name}</p>
                              <p className="mt-2 text-sm text-[var(--muted)]">
                                Build this table seat by seat
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedGuests.slice(0, selectedTable.seats).map((guest, index) => {
                          const pos = seatPosition(index, selectedTable.seats, 205);

                          return (
                            <div
                              key={guest.id}
                              draggable
                              onDragStart={(event) => handleGuestDragStart(event, guest.id)}
                              className="absolute z-10 flex h-16 w-28 -translate-x-1/2 -translate-y-1/2 cursor-grab flex-col items-center justify-center rounded-[1rem] border border-[var(--border)] bg-white/96 px-2 text-center shadow-sm active:cursor-grabbing"
                              style={pos}
                              title={guest.name}
                            >
                              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                                Seat
                              </span>
                              <span className="mt-1 text-xs font-medium leading-tight">
                                {guest.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    <div className="max-w-lg text-center">
                      <p className="eyebrow">No Table Selected</p>
                      <h3 className="mt-3 text-4xl">Pick A Table From The Room</h3>
                      <p className="prose-copy mt-4 text-lg">
                        The focused planner becomes active once you place and select a table from the room overview above.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
                  <label className="block">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {selectedTable
                        ? `Add guest directly to ${selectedTable.name}`
                        : "Select a table to add guests"}
                    </span>
                    <input
                      value={guestSearch}
                      onChange={(event) => setGuestSearch(event.target.value)}
                      placeholder="Search by guest or household"
                      disabled={!selectedTable}
                      className="mt-3 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </label>
                  <div className="mt-4 grid max-h-[16rem] gap-3 overflow-y-auto pr-1">
                    {selectedTable
                      ? guestSearchResults.map((guest) => (
                          <button
                            key={guest.id}
                            onClick={() => addGuestToSelectedTable(guest.id)}
                            className="accent-panel flex items-center justify-between rounded-[1.1rem] p-4 text-left transition hover:bg-white/90"
                          >
                            <span>
                              <span className="block font-medium">{guest.name}</span>
                              <span className="block text-sm text-[var(--muted)]">
                                {guest.household} · {guest.meal}
                              </span>
                            </span>
                            <span className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                              Add
                            </span>
                          </button>
                        ))
                      : null}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="eyebrow">Assigned Guests</p>
                  <div className="mt-4 grid max-h-[20rem] gap-3 overflow-y-auto pr-1">
                    {selectedGuests.length ? (
                      selectedGuests.map((guest) => (
                        <div
                          key={guest.id}
                          draggable
                          onDragStart={(event) => handleGuestDragStart(event, guest.id)}
                          className="accent-panel flex cursor-grab items-center justify-between rounded-[1.25rem] p-4 active:cursor-grabbing"
                        >
                          <div>
                            <p className="font-medium">{guest.name}</p>
                            <p className="text-sm text-[var(--muted)]">
                              {guest.side} · {guest.meal}
                            </p>
                          </div>
                          <button
                            onClick={() => assignGuest(guest.id, undefined)}
                            className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="accent-panel rounded-[1.25rem] p-4 text-sm text-[var(--muted)]">
                        {selectedTable
                          ? "No guests assigned yet."
                          : "No table selected yet."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
