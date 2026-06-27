import type { TravelInfo, TravelVisualMapNode } from "@/types/wedding";

type TravelVisualMapProps = {
  visualMap: NonNullable<TravelInfo["visualMap"]>;
};

function toneClasses(tone: TravelVisualMapNode["tone"]) {
  switch (tone) {
    case "highlight":
      return {
        pin: "bg-[var(--accent-strong)] border-white",
        badge: "bg-[var(--accent-strong)] text-[var(--accent-contrast)]",
        card: "border-[var(--accent-strong)]/25 bg-[var(--accent-soft)]/55"
      };
    case "secondary":
      return {
        pin: "bg-[var(--gold)] border-white",
        badge: "bg-[var(--gold)]/18 text-[var(--accent-strong)]",
        card: "border-[var(--gold)]/30 bg-[#fff7ea]"
      };
    default:
      return {
        pin: "bg-[#86b6b0] border-white",
        badge: "bg-[#edf6f4] text-[#3f726c]",
        card: "border-[var(--border)] bg-white/88"
      };
  }
}

function getDetailParts(detail?: string) {
  if (!detail) {
    return { badge: undefined, text: undefined };
  }

  const normalized = detail.trim();
  const match = normalized.match(/^(Day\s+\d+|Airport|Stay Base)\s*[:\-]\s*(.+)$/i);

  if (match) {
    return {
      badge: match[1],
      text: match[2]
    };
  }

  return {
    badge: undefined,
    text: normalized
  };
}

export function TravelVisualMap({ visualMap }: TravelVisualMapProps) {
  const nodes = visualMap.nodes;
  const connections = visualMap.connections ?? [];

  if (!nodes.length) {
    return null;
  }

  const byId = new Map(nodes.map((node) => [node.id, node] as const));

  return (
    <div className="rounded-[1.4rem] border border-[var(--border)] bg-white/82 p-5 sm:p-6">
      {(visualMap.eyebrow || visualMap.title || visualMap.description) ? (
        <div className="mb-5 max-w-2xl">
          {visualMap.eyebrow ? <p className="eyebrow">{visualMap.eyebrow}</p> : null}
          {visualMap.title ? <h3 className="mt-3 text-3xl">{visualMap.title}</h3> : null}
          {visualMap.description ? (
            <p className="prose-copy mt-3">{visualMap.description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-[1.35rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.48),rgba(255,248,236,0.72))] p-4 sm:p-5">
        <div className="relative overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f7fbfc,#f3eee5)] px-4 py-5 sm:px-6 sm:py-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 18% 26%, rgba(190,225,232,0.6), transparent 16%), radial-gradient(circle at 42% 54%, rgba(190,225,232,0.48), transparent 24%), radial-gradient(circle at 74% 72%, rgba(190,225,232,0.35), transparent 18%), radial-gradient(circle at 82% 18%, rgba(221,192,136,0.16), transparent 18%)"
            }}
          />
          <svg
            className="pointer-events-none absolute inset-[8%] h-[84%] w-[84%] opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M18 22C24 12 40 8 54 11C69 14 82 24 86 39C90 56 82 72 67 82C54 91 39 90 28 82C15 72 9 54 11 40C12 33 14 27 18 22Z"
              fill="rgba(196, 225, 218, 0.88)"
            />
            <path
              d="M30 18C42 20 52 26 58 35C64 44 66 56 62 67C58 76 50 82 40 85"
              fill="none"
              stroke="rgba(79,133,123,0.46)"
              strokeWidth="1.6"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative h-[320px] sm:h-[360px]">
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              {connections.map((connection, index) => {
                const from = byId.get(connection.from);
                const to = byId.get(connection.to);

                if (!from || !to) {
                  return null;
                }

                return (
                  <line
                    key={`${connection.from}-${connection.to}-${index}`}
                    x1={`${from.x}%`}
                    y1={`${from.y}%`}
                    x2={`${to.x}%`}
                    y2={`${to.y}%`}
                    stroke="rgba(184,141,74,0.34)"
                    strokeWidth="2"
                    strokeDasharray="7 7"
                  />
                );
              })}
            </svg>

            {nodes.map((node) => {
              const detail = getDetailParts(node.detail);
              const tones = toneClasses(node.tone);

              return (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span
                      className={`h-5 w-5 rounded-full border-2 shadow-[0_8px_16px_rgba(67,45,33,0.14)] ${tones.pin}`}
                    />
                    <div className="max-w-[8rem] rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] shadow-[0_8px_16px_rgba(67,45,33,0.08)]">
                      {node.label}
                    </div>
                    {detail.badge ? (
                      <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones.badge}`}>
                        {detail.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {nodes.map((node) => {
            const detail = getDetailParts(node.detail);
            const tones = toneClasses(node.tone);

            return (
              <div
                key={`${node.id}-detail`}
                className={`rounded-[1.1rem] border p-4 shadow-[0_10px_24px_rgba(67,45,33,0.06)] ${tones.card}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                      {node.label}
                    </p>
                    {detail.badge ? (
                      <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones.badge}`}>
                        {detail.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className={`mt-1 h-3 w-3 rounded-full ${tones.pin.split(" ")[0]}`} />
                </div>
                {detail.text ? (
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{detail.text}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
