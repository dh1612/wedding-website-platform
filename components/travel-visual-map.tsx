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
        <div className="pointer-events-none absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(184,141,74,0),rgba(184,141,74,0.34),rgba(184,141,74,0))]" />

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

          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute w-[12.5rem] max-w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-[1.2rem] border p-3 shadow-[0_16px_34px_rgba(67,45,33,0.12)] sm:w-[13.5rem] ${toneClasses(node.tone)}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em]">{node.label}</p>
              {node.detail ? (
                <p
                  className={`mt-2 text-sm leading-6 ${
                    node.tone === "highlight" ? "text-[var(--accent-contrast)]/92" : ""
                  }`}
                >
                  {node.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
