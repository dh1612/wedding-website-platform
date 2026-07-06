"use client";

import type { ReactNode } from "react";
import { useMemo, useState, useTransition } from "react";
import {
  rosebankData,
  type RosebankBudgetItem,
  type RosebankData,
  type RosebankQuote,
  type RosebankRoom,
  type RosebankShoppingItem
} from "@/lib/rosebank-data";

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IE").format(value);
}

function toFeetAndInches(mm: number) {
  const totalInches = mm / 25.4;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}ft ${inches}in`;
}

function daysUntil(dateString: string) {
  const today = new Date();
  const target = new Date(`${dateString}T00:00:00`);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = target.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

type CopyState = string | null;

type RosebankHomeHubProps = {
  initialData?: RosebankData;
  accessKey?: string;
};

export function RosebankHomeHub({ initialData = rosebankData, accessKey }: RosebankHomeHubProps) {
  const [hubState, setHubState] = useState<RosebankData>(initialData);
  const [selectedRoomId, setSelectedRoomId] = useState(initialData.rooms[0]?.id ?? "");
  const [copyState, setCopyState] = useState<CopyState>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [floorAreaInput, setFloorAreaInput] = useState("23.61");
  const [boxCoverageInput, setBoxCoverageInput] = useState("2.03");
  const [pricePerBoxInput, setPricePerBoxInput] = useState("48.77");
  const [carpetAreaInput, setCarpetAreaInput] = useState("35.22");
  const [carpetRateInput, setCarpetRateInput] = useState("23.99");
  const [tileWallAreaInput, setTileWallAreaInput] = useState("16.5");
  const [tileRateInput, setTileRateInput] = useState("19.99");
  const [labourRateInput, setLabourRateInput] = useState("35");
  const [budgetOverrideInput, setBudgetOverrideInput] = useState(String(initialData.workingCashTarget ?? 35000));

  const selectedRoom = useMemo(
    () => hubState.rooms.find((room) => room.id === selectedRoomId) ?? hubState.rooms[0],
    [hubState.rooms, selectedRoomId]
  );

  const totals = useMemo(() => {
    const estimateLow = hubState.budgetItems.reduce((sum, item) => sum + item.estimateLow, 0);
    const estimateHigh = hubState.budgetItems.reduce((sum, item) => sum + item.estimateHigh, 0);
    const committed = hubState.budgetItems.reduce((sum, item) => sum + (item.actual ?? 0), 0);
    const targetCash = Number(budgetOverrideInput) || hubState.workingCashTarget || hubState.availableCashHigh;
    const remainingCash = targetCash - committed;
    const finishedRooms = hubState.rooms.filter((room) => room.status === "finished").length;
    const inProgressRooms = hubState.rooms.filter(
      (room) => room.status === "ordering" || room.status === "in progress"
    ).length;
    return {
      estimateLow,
      estimateHigh,
      committed,
      targetCash,
      remainingCash,
      finishedRooms,
      inProgressRooms
    };
  }, [budgetOverrideInput, hubState]);

  const flooringCalculator = useMemo(() => {
    const area = Number(floorAreaInput) || 0;
    const coverage = Number(boxCoverageInput) || 0;
    const pricePerBox = Number(pricePerBoxInput) || 0;
    if (!area || !coverage) {
      return { boxes: 0, total: 0 };
    }
    const boxes = Math.ceil((area * 1.1) / coverage);
    return { boxes, total: boxes * pricePerBox };
  }, [boxCoverageInput, floorAreaInput, pricePerBoxInput]);

  const carpetCalculator = useMemo(() => {
    const area = Number(carpetAreaInput) || 0;
    const rate = Number(carpetRateInput) || 0;
    const sqYd = area * 1.19599;
    return {
      sqYd,
      total: sqYd * rate
    };
  }, [carpetAreaInput, carpetRateInput]);

  const tileCalculator = useMemo(() => {
    const area = Number(tileWallAreaInput) || 0;
    const tileRate = Number(tileRateInput) || 0;
    const labourRate = Number(labourRateInput) || 0;
    const sqYd = area * 1.19599;
    return {
      sqYd,
      tileCost: sqYd * tileRate,
      labourCost: sqYd * labourRate,
      total: sqYd * tileRate + sqYd * labourRate
    };
  }, [labourRateInput, tileRateInput, tileWallAreaInput]);

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState(label);
      window.setTimeout(() => setCopyState((current) => (current === label ? null : current)), 1400);
    } catch {
      setCopyState("Could not copy");
      window.setTimeout(() => setCopyState(null), 1400);
    }
  }

  function updateBudgetItem(itemId: string, updater: (item: RosebankBudgetItem) => RosebankBudgetItem) {
    setHubState((current) => ({
      ...current,
      budgetItems: current.budgetItems.map((item) => (item.id === itemId ? updater(item) : item))
    }));
  }

  function updateQuote(quoteId: string, updater: (quote: RosebankQuote) => RosebankQuote) {
    setHubState((current) => ({
      ...current,
      quotes: current.quotes.map((quote) => (quote.id === quoteId ? updater(quote) : quote))
    }));
  }

  function updateShoppingItem(
    itemId: string,
    updater: (item: RosebankShoppingItem) => RosebankShoppingItem
  ) {
    setHubState((current) => ({
      ...current,
      shoppingItems: current.shoppingItems.map((item) => (item.id === itemId ? updater(item) : item))
    }));
  }

  function updateRoom(roomId: string, updater: (room: RosebankRoom) => RosebankRoom) {
    setHubState((current) => ({
      ...current,
      rooms: current.rooms.map((room) => (room.id === roomId ? updater(room) : room))
    }));
  }

  function saveHub() {
    const workingCashTarget = Number(budgetOverrideInput) || hubState.workingCashTarget || 35000;
    const nextState: RosebankData = {
      ...hubState,
      workingCashTarget
    };

    setHubState(nextState);
    setSaveMessage(null);

    startSaving(async () => {
      try {
        const response = await fetch("/api/home-hub/rosebank", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(accessKey ? { "x-home-hub-key": accessKey } : {})
          },
          body: JSON.stringify({ contentJson: nextState })
        });

        if (!response.ok) {
          throw new Error("Could not save");
        }

        setSaveMessage("Saved");
        window.setTimeout(() => setSaveMessage((current) => (current === "Saved" ? null : current)), 1800);
      } catch {
        setSaveMessage("Save failed");
      }
    });
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbf8f3_0%,#f6f1ea_52%,#ece4da_100%)] px-4 pb-16 pt-4 text-[#241f1b] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="rounded-[2rem] border border-black/5 bg-white/75 p-4 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a6442]">Private House Planner</p>
              <h1 className="mt-2 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em] sm:text-5xl">
                Rosebank
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#6f6358]">
                {hubState.houseType} in {hubState.development}. A warm, mobile-first hub for measurements,
                budgets, quotes, shopping, and all the small decisions that make the house feel yours.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                ["Dashboard", "#dashboard"],
                ["Shop mode", "#measurements"],
                ["Rooms", "#rooms"],
                ["Budget", "#budget"],
                ["Quotes", "#quotes"],
                ["Calculators", "#calculators"]
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#5d4537]/10 bg-white/80 px-4 text-sm text-[#45372e] transition hover:bg-white"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={saveHub}
                disabled={isSaving}
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#3e473d] px-4 text-sm font-medium text-white transition hover:bg-[#303930] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
              {saveMessage ? <span className="text-sm text-[#6f6358]">{saveMessage}</span> : null}
            </div>
          </div>
        </div>

        <section
          id="dashboard"
          className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-[linear-gradient(135deg,#d6c6b6_0%,#a49484_38%,#6f655d_68%,#ddd4c8_100%)] p-5 shadow-[0_24px_70px_rgba(54,39,28,0.14)] sm:p-6"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="rounded-[2rem] border border-white/20 bg-white/12 p-6 text-[#fff9f2] backdrop-blur-2xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#f3e6d6]">Forever Home</p>
              <h2 className="mt-3 font-[var(--font-display)] text-5xl leading-none tracking-[-0.05em] sm:text-6xl">
                {hubState.projectName}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#fff4e8]/86">
                Built for actual use while shopping, comparing, second-guessing, and trying to keep the whole move-in picture in your head without losing your mind.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#measurements"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#fff7ef] px-5 text-sm font-medium text-[#2f3438]"
                >
                  In the shop mode
                </a>
                <a
                  href="#budget"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 text-sm font-medium text-white"
                >
                  Review the spend
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DashboardStat
                label="Move-in countdown"
                value={`${daysUntil(hubState.moveInDate)}`}
                detail="Days until keys and phase-one reality"
              />
              <DashboardStat
                label="Available cash"
                value={`${euro.format(hubState.availableCashLow)}–${euro.format(hubState.availableCashHigh)}`}
                detail="Working move-in cash range"
              />
              <DashboardStat
                label="Planned spend"
                value={`${euro.format(totals.estimateLow)}–${euro.format(totals.estimateHigh)}`}
                detail="Based on current tracked assumptions"
              />
              <DashboardStat
                label="Committed spend"
                value={euro.format(totals.committed)}
                detail="Actual spend captured so far"
              />
              <DashboardStat
                label="Remaining cash"
                value={euro.format(totals.remainingCash)}
                detail="Using your current cash target"
              />
              <DashboardStat
                label="Rooms moving"
                value={`${totals.inProgressRooms} active`}
                detail={`${totals.finishedRooms} fully finished so far`}
              />
            </div>
          </div>
        </section>

        <section id="measurements" className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">In The Shop</p>
            <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
              Measurements first
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#6f6358]">
              The fast page. Dimensions in mm, metres, area, notes, and a one-tap copy action so you can answer “will it fit?” without digging through screenshots.
            </p>

            <div className="mt-6 grid gap-3">
              {hubState.rooms.map((room) => {
                const hasDimensions = room.dimensionsMm.length && room.dimensionsMm.width;
                const mmLabel = hasDimensions
                  ? `${formatNumber(room.dimensionsMm.length)} × ${formatNumber(room.dimensionsMm.width)} mm`
                  : "Area to be measured";
                const mLabel = hasDimensions
                  ? `${room.dimensionsM.length.toFixed(2)} × ${room.dimensionsM.width.toFixed(2)} m`
                  : "To be measured";

                return (
                  <div
                    key={room.id}
                    className="flex flex-col gap-4 rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-lg">{room.name}</strong>
                        <span className="rounded-full bg-[#8a6442]/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#8a6442]">
                          {room.floor}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#6f6358]">{mmLabel}</p>
                      <p className="text-sm leading-6 text-[#6f6358]">{mLabel}</p>
                      <p className="text-sm leading-6 text-[#6f6358]">
                        {room.areaM2 ? `${room.areaM2.toFixed(2)} m²` : "Area not set yet"}
                      </p>
                      {room.notes[0] ? <p className="mt-2 text-sm leading-6 text-[#5d5147]">{room.notes[0]}</p> : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copyText(mmLabel, room.name)}
                        className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#5d4537]/10 bg-white px-4 text-sm text-[#2f3438]"
                      >
                        Copy mm
                      </button>
                      <button
                        type="button"
                        onClick={() => copyText(mLabel, `${room.name}-metres`)}
                        className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#5d4537]/10 bg-white px-4 text-sm text-[#2f3438]"
                      >
                        Copy metres
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Live Pulse</p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-none tracking-[-0.04em]">
              What matters most right now
            </h2>
            <div className="mt-5 grid gap-3">
              <InfoCard title="Priority order" lines={hubState.priorities.map((priority, index) => `${index + 1}. ${priority}`)} />
              <InfoCard
                title="Current budget reality"
                lines={[
                  `Move-in cash target: ${euro.format(totals.targetCash)}`,
                  `Full fit-out could land around ${euro.format(hubState.totalFitOutLow)}–${euro.format(hubState.totalFitOutHigh)}`
                ]}
              />
              <div className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
                <strong className="text-base">Private notes</strong>
                <textarea
                  value={hubState.privateNotes}
                  onChange={(event) =>
                    setHubState((current) => ({
                      ...current,
                      privateNotes: event.target.value
                    }))
                  }
                  rows={7}
                  className="mt-3 w-full rounded-[1.2rem] border border-[#5d4537]/10 bg-white px-4 py-3 text-sm leading-6 text-[#45372e] outline-none"
                />
              </div>
              <InfoCard
                title="Copy feedback"
                lines={[
                  copyState
                    ? `Last action: ${copyState}`
                    : "Tap a measurement button above to copy dimensions instantly."
                ]}
              />
            </div>
          </div>
        </section>

        <section id="rooms" className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Rooms</p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-none tracking-[-0.04em]">
              Room by room
            </h2>
            <div className="mt-5 grid gap-2">
              {hubState.rooms.map((room) => {
                const active = room.id === selectedRoomId;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`rounded-[1.2rem] border px-4 py-3 text-left transition ${
                      active
                        ? "border-[#8a6442]/30 bg-[#fff9f2] shadow-[0_10px_30px_rgba(54,39,28,0.08)]"
                        : "border-[#5d4537]/10 bg-white/72"
                    }`}
                  >
                    <strong className="block text-base">{room.name}</strong>
                    <span className="mt-1 block text-sm text-[#6f6358]">
                      {room.floor} · {room.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {selectedRoom ? (
            <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">{selectedRoom.floor}</p>
                  <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
                    {selectedRoom.name}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[#6f6358]">
                    {selectedRoom.notes.join(" ")}
                  </p>
                </div>
                <select
                  value={selectedRoom.status}
                  onChange={(event) =>
                    updateRoom(selectedRoom.id, (room) => ({
                      ...room,
                      status: event.target.value as RosebankRoom["status"]
                    }))
                  }
                  className="rounded-full border border-[#8a6442]/20 bg-[#fff9f2] px-4 py-2 text-sm text-[#8a6442] outline-none"
                >
                  <option value="planning">planning</option>
                  <option value="quoting">quoting</option>
                  <option value="ordering">ordering</option>
                  <option value="in progress">in progress</option>
                  <option value="finished">finished</option>
                </select>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <RoomPanel
                  title="Measurements"
                  items={[
                    `${formatNumber(selectedRoom.dimensionsMm.length)} × ${formatNumber(selectedRoom.dimensionsMm.width)} mm`,
                    `${selectedRoom.dimensionsM.length.toFixed(2)} × ${selectedRoom.dimensionsM.width.toFixed(2)} m`,
                    selectedRoom.areaM2 ? `${selectedRoom.areaM2.toFixed(2)} m²` : "Area to confirm",
                    selectedRoom.dimensionsMm.length
                      ? `${toFeetAndInches(selectedRoom.dimensionsMm.length)} × ${toFeetAndInches(selectedRoom.dimensionsMm.width)}`
                      : "Feet/inches not set"
                  ]}
                />
                <RoomPanel title="Plans" items={selectedRoom.plans} />
                <RoomPanel title="Checklist" items={selectedRoom.checklist} />
                <RoomPanel title="Open questions" items={selectedRoom.openQuestions} />
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <RoomPanel title="Decisions made" items={selectedRoom.decisions} />
                <div className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Budget snapshot</p>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-[#5d5147]">
                    <p>
                      Estimate: {selectedRoom.budgetEstimate ? euro.format(selectedRoom.budgetEstimate) : "TBC"}
                    </p>
                    <p>Actual: {selectedRoom.actualSpend ? euro.format(selectedRoom.actualSpend) : euro.format(0)}</p>
                    <p>Status: {selectedRoom.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section id="budget" className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Budget Tracker</p>
            <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
              What the house is asking for
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#6f6358]">
              This separates the early-cash reality from the full-house dream. Helpful when something is objectively lovely but not remotely phase-one sensible.
            </p>
            <div className="mt-5 grid gap-3">
              {hubState.budgetItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <strong className="text-base">{item.category}</strong>
                      <p className="mt-1 text-sm leading-6 text-[#6f6358]">
                        {euro.format(item.estimateLow)}–{euro.format(item.estimateHigh)}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#5d5147]">{item.notes}</p>
                    </div>
                    <div className="grid gap-2 sm:min-w-[220px]">
                      <label className="text-sm text-[#6f6358]">
                        Actual spend
                        <input
                          type="number"
                          value={item.actual ?? ""}
                          onChange={(event) =>
                            updateBudgetItem(item.id, (current) => ({
                              ...current,
                              actual: event.target.value ? Number(event.target.value) : null
                            }))
                          }
                          className="mt-1 w-full rounded-xl border border-[#5d4537]/10 bg-white px-3 py-2 text-[#2f3438] outline-none"
                        />
                      </label>
                      <label className="text-sm text-[#6f6358]">
                        Status
                        <select
                          value={item.status}
                          onChange={(event) =>
                            updateBudgetItem(item.id, (current) => ({
                              ...current,
                              status: event.target.value as RosebankBudgetItem["status"]
                            }))
                          }
                          className="mt-1 w-full rounded-xl border border-[#5d4537]/10 bg-white px-3 py-2 text-[#2f3438] outline-none"
                        >
                          <option value="idea">idea</option>
                          <option value="quoted">quoted</option>
                          <option value="ordered">ordered</option>
                          <option value="installed">installed</option>
                          <option value="completed">completed</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Budget Summary</p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-none tracking-[-0.04em]">
              Cash lens
            </h2>
            <div className="mt-5 rounded-[1.4rem] border border-[#8a6442]/14 bg-[linear-gradient(135deg,rgba(181,138,98,0.12),rgba(142,154,135,0.12))] p-4">
              <label className="text-sm text-[#5d5147]" htmlFor="cash-target">
                Working cash target
              </label>
              <input
                id="cash-target"
                type="number"
                value={budgetOverrideInput}
                onChange={(event) => setBudgetOverrideInput(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#5d4537]/10 bg-white px-4 py-3 text-base outline-none"
              />
            </div>
            <div className="mt-4 grid gap-3">
              <SummaryPill label="Planned spend range" value={`${euro.format(totals.estimateLow)}–${euro.format(totals.estimateHigh)}`} />
              <SummaryPill label="Committed spend" value={euro.format(totals.committed)} />
              <SummaryPill label="Remaining against cash target" value={euro.format(totals.remainingCash)} />
              <SummaryPill label="Full fit-out expectation" value={`${euro.format(hubState.totalFitOutLow)}–${euro.format(hubState.totalFitOutHigh)}`} />
            </div>
          </div>
        </section>

        <section id="quotes" className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Quotes</p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
            Quotes worth keeping straight
          </h2>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {hubState.quotes.map((quote) => (
              <div key={quote.id} className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-base">{quote.supplier}</strong>
                    <p className="mt-1 text-sm text-[#6f6358]">{quote.category}</p>
                  </div>
                  <select
                    value={quote.status}
                    onChange={(event) =>
                      updateQuote(quote.id, (current) => ({
                        ...current,
                        status: event.target.value as RosebankQuote["status"]
                      }))
                    }
                    className="rounded-full border border-[#8a6442]/20 bg-[#fff9f2] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#8a6442] outline-none"
                  >
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="paid">paid</option>
                  </select>
                </div>
                <div className="mt-4 space-y-2 text-sm leading-6 text-[#5d5147]">
                  <p>Amount: {euro.format(quote.amount)}</p>
                  <p>Date: {quote.quoteDate}</p>
                  <p>Labour included: {quote.includesLabour ? "Yes" : "No"}</p>
                  <p>VAT: {quote.includesVat}</p>
                  <p>Contact: {quote.contact}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#6f6358]">{quote.notes}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="shopping" className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Shopping List</p>
            <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
              Products already in the conversation
            </h2>
            <div className="mt-5 grid gap-3">
              {hubState.shoppingItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <strong className="text-base">{item.product}</strong>
                      <p className="mt-1 text-sm text-[#6f6358]">
                        {item.room} · {item.store} · {item.price ? euro.format(item.price) : "Price to confirm"}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#5d5147]">{item.notes}</p>
                    </div>
                    <div className="grid gap-2 sm:min-w-[220px]">
                      <label className="text-sm text-[#6f6358]">
                        Status
                        <select
                          value={item.status}
                          onChange={(event) =>
                            updateShoppingItem(item.id, (current) => ({
                              ...current,
                              status: event.target.value as RosebankShoppingItem["status"]
                            }))
                          }
                          className="mt-1 w-full rounded-xl border border-[#5d4537]/10 bg-white px-3 py-2 text-[#2f3438] outline-none"
                        >
                          <option value="considering">considering</option>
                          <option value="favourite">favourite</option>
                          <option value="bought">bought</option>
                          <option value="installed">installed</option>
                        </select>
                      </label>
                      <span className="text-sm text-[#6f6358]">Priority: {item.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Decision Log</p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-none tracking-[-0.04em]">
              What you’ve already decided
            </h2>
            <div className="mt-5 grid gap-3">
              {hubState.decisions.map((decision) => (
                <div key={decision.id} className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
                  <strong className="text-base">{decision.title}</strong>
                  <p className="mt-2 text-sm leading-6 text-[#6f6358]">{decision.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="calculators" className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">Calculators</p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
            Quick maths without the tabs
          </h2>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            <CalculatorCard
              title="Flooring box calculator"
              description="Adds 10% waste automatically."
              fields={[
                {
                  label: "Room area (m²)",
                  value: floorAreaInput,
                  onChange: setFloorAreaInput
                },
                {
                  label: "Box coverage (m²)",
                  value: boxCoverageInput,
                  onChange: setBoxCoverageInput
                },
                {
                  label: "Price per box (€)",
                  value: pricePerBoxInput,
                  onChange: setPricePerBoxInput
                }
              ]}
            >
              <ResultRow label="Boxes needed" value={`${flooringCalculator.boxes}`} />
              <ResultRow label="Estimated material cost" value={euro.format(flooringCalculator.total)} />
            </CalculatorCard>

            <CalculatorCard
              title="Carpet sq yd calculator"
              description="Helpful for upstairs carpet quotes."
              fields={[
                {
                  label: "Area (m²)",
                  value: carpetAreaInput,
                  onChange: setCarpetAreaInput
                },
                {
                  label: "Rate per sq yd (€)",
                  value: carpetRateInput,
                  onChange: setCarpetRateInput
                }
              ]}
            >
              <ResultRow label="Area in sq yd" value={carpetCalculator.sqYd.toFixed(2)} />
              <ResultRow label="Estimated carpet cost" value={euro.format(carpetCalculator.total)} />
            </CalculatorCard>

            <CalculatorCard
              title="Tile + labour calculator"
              description="Useful for bathroom wall estimates."
              fields={[
                {
                  label: "Wall area (m²)",
                  value: tileWallAreaInput,
                  onChange: setTileWallAreaInput
                },
                {
                  label: "Tile rate per sq yd (€)",
                  value: tileRateInput,
                  onChange: setTileRateInput
                },
                {
                  label: "Labour rate per sq yd (€)",
                  value: labourRateInput,
                  onChange: setLabourRateInput
                }
              ]}
            >
              <ResultRow label="Area in sq yd" value={tileCalculator.sqYd.toFixed(2)} />
              <ResultRow label="Tile cost" value={euro.format(tileCalculator.tileCost)} />
              <ResultRow label="Labour cost" value={euro.format(tileCalculator.labourCost)} />
              <ResultRow label="Estimated installed total" value={euro.format(tileCalculator.total)} />
            </CalculatorCard>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-[1.8rem] border border-white/18 bg-white/14 p-4 text-[#fff9f2] backdrop-blur-2xl">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#f3e6d6]">{label}</p>
      <strong className="mt-3 block text-2xl leading-none sm:text-3xl">{value}</strong>
      <p className="mt-2 text-sm leading-6 text-[#fff4e8]/82">{detail}</p>
    </div>
  );
}

function InfoCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
      <strong className="text-base">{title}</strong>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[#6f6358]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function RoomPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">{title}</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[#5d5147]">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">{label}</p>
      <strong className="mt-2 block text-lg text-[#2f3438]">{value}</strong>
    </div>
  );
}

function CalculatorCard({
  title,
  description,
  fields,
  children
}: {
  title: string;
  description: string;
  fields: Array<{
    label: string;
    value: string;
    onChange: (value: string) => void;
  }>;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.6rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a6442]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#6f6358]">{description}</p>
      <div className="mt-4 grid gap-3">
        {fields.map((field) => (
          <label key={field.label} className="text-sm text-[#5d5147]">
            {field.label}
            <input
              type="number"
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#5d4537]/10 bg-white px-3 py-2 text-[#2f3438] outline-none"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#5d4537]/10 bg-white px-3 py-2 text-sm">
      <span className="text-[#6f6358]">{label}</span>
      <strong className="text-[#2f3438]">{value}</strong>
    </div>
  );
}
