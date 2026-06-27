import type { TravelInfo, TravelVisualMapNode } from "@/types/wedding";

type TravelVisualMapProps = {
  visualMap: NonNullable<TravelInfo["visualMap"]>;
};

function toneClasses(tone: TravelVisualMapNode["tone"]) {
  switch (tone) {
    case "highlight":
      return "border-[var(--accent-strong)] bg-[var(--accent-strong)] text-[var(--accent-contrast)]";
    case "secondary":
      return "border-[var(--gold)] bg-[var(--accent-soft)] text-[var(--accent-strong)]";
    default:
      return "border-[var(--border)] bg-white/86 text-[var(--foreground)]";
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

      <div className="relative overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,248,236,0.72))] px-4 py-6 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 10% 12%, rgba(255,255,255,0.84), transparent 18%), radial-gradient(circle at 84% 16%, rgba(215,176,106,0.14), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.08), transparent 18%)"
          }}
        />
        <div
          className="pointer-events-none absolute inset-[7%] opacity-55"
          style={{
            background:
              "radial-gradient(circle at 24% 26%, rgba(203, 228, 237, 0.58), transparent 18%), radial-gradient(circle at 50% 48%, rgba(203, 228, 237, 0.48), transparent 22%), radial-gradient(circle at 78% 70%, rgba(203, 228, 237, 0.42), transparent 18%)"
          }}
        />
        <svg
          className="pointer-events-none absolute inset-[8%] h-[84%] w-[84%] opacity-18"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M20 18C28 10 42 8 54 13C62 16 72 23 78 31C83 37 87 45 84 54C81 62 72 66 66 72C58 79 54 89 45 91C35 94 26 86 19 79C10 70 9 57 11 46C13 34 11 25 20 18Z"
            fill="rgba(191, 222, 214, 0.85)"
          />
          <path
            d="M34 16C45 18 55 25 60 36C65 47 64 59 57 69C52 76 43 83 34 83"
            fill="none"
            stroke="rgba(79, 133, 123, 0.45)"
            strokeWidth="1.4"
            strokeDasharray="4 5"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative h-[640px] sm:h-[520px]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {connections.map((connection, index) => {
              const from = byId.get(connection.from);
              const to = byId.get(connection.to);

              if (!from || !to) {
                return null;
              }

              const x1 = `${from.x}%`;
              const y1 = `${from.y}%`;
              const x2 = `${to.x}%`;
              const y2 = `${to.y}%`;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={`${connection.from}-${connection.to}-${index}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(184,141,74,0.38)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                  />
                  {connection.label ? (
                    <text
                      x={`${midX}%`}
                      y={`${midY - 1.5}%`}
                      textAnchor="middle"
                      fill="rgba(111,92,70,0.9)"
                      fontSize="12"
                      letterSpacing="0.06em"
                    >
                      {connection.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          {nodes.map((node) => {
            const detail = getDetailParts(node.detail);

            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`relative w-[12.5rem] max-w-[42vw] rounded-[1.2rem] border p-3 pl-4 shadow-[0_16px_34px_rgba(67,45,33,0.12)] sm:w-[13.5rem] ${toneClasses(node.tone)}`}
                >
                  <span
                    className={`absolute -left-3 top-4 h-6 w-6 rounded-full border-2 border-white shadow-[0_8px_18px_rgba(67,45,33,0.18)] ${
                      node.tone === "highlight"
                        ? "bg-[var(--accent-strong)]"
                        : node.tone === "secondary"
                          ? "bg-[var(--gold)]"
                          : "bg-[#86b6b0]"
                    }`}
                  />
                  <p className="text-sm font-semibold uppercase tracking-[0.16em]">{node.label}</p>
                  {detail.badge ? (
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        node.tone === "highlight"
                          ? "bg-white/18 text-[var(--accent-contrast)]"
                          : "bg-white/72 text-[var(--accent-strong)]"
                      }`}
                    >
                      {detail.badge}
                    </span>
                  ) : null}
                  {detail.text ? (
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        node.tone === "highlight" ? "text-[var(--accent-contrast)]/92" : ""
                      }`}
                    >
                      {detail.text}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
