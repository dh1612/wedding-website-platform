import type { TravelInfo, TravelVisualMapNode } from "@/types/wedding";

type TravelVisualMapProps = {
  visualMap: NonNullable<TravelInfo["visualMap"]>;
};

type VisualMapGroup = {
  title: string;
  badge: string;
  nodes: TravelVisualMapNode[];
};

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

function pinColor(tone: TravelVisualMapNode["tone"]) {
  switch (tone) {
    case "highlight":
      return "bg-[var(--accent-strong)]";
    case "secondary":
      return "bg-[var(--gold)]";
    default:
      return "bg-[#86b6b0]";
  }
}

function badgeClasses(badge?: string) {
  if (!badge) {
    return "bg-white/80 text-[var(--muted)]";
  }

  if (/day/i.test(badge)) {
    return "bg-[var(--accent-soft)] text-[var(--accent-strong)]";
  }

  if (/airport/i.test(badge)) {
    return "bg-[#f5ead6] text-[#956d2c]";
  }

  return "bg-[#e7f2ef] text-[#4e7e77]";
}

function buildGroups(nodes: TravelVisualMapNode[]): VisualMapGroup[] {
  const airports = nodes.filter((node) => /airport/i.test(node.detail ?? ""));
  const stays = nodes.filter((node) => /stay base/i.test(node.detail ?? ""));
  const days = nodes.filter((node) => /day\s+\d+/i.test(node.detail ?? ""));

  return [
    { title: "Airports", badge: "Arrival options", nodes: airports },
    { title: "Where To Stay", badge: "Guest bases", nodes: stays },
    { title: "Weekend Flow", badge: "Celebration days", nodes: days }
  ].filter((group) => group.nodes.length > 0);
}

export function TravelVisualMap({ visualMap }: TravelVisualMapProps) {
  const nodes = visualMap.nodes;

  if (!nodes.length) {
    return null;
  }

  const groups = buildGroups(nodes);

  return (
    <div className="rounded-[1.35rem] border border-[var(--border)] bg-white/82 p-5 sm:p-6">
      {(visualMap.eyebrow || visualMap.title || visualMap.description) ? (
        <div className="mb-5 max-w-2xl">
          {visualMap.eyebrow ? <p className="eyebrow">{visualMap.eyebrow}</p> : null}
          {visualMap.title ? <h3 className="mt-3 text-3xl">{visualMap.title}</h3> : null}
          {visualMap.description ? (
            <p className="prose-copy mt-3">{visualMap.description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-[1.2rem] border border-[var(--border)] bg-[linear-gradient(180deg,#fbfdfd,#f6efe5)] p-4 sm:p-5">
        <div className="relative overflow-hidden rounded-[1rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(246,240,230,0.92))] px-4 py-4 sm:px-6 sm:py-5">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 22% 30%, rgba(196,228,233,0.7), transparent 14%), radial-gradient(circle at 44% 54%, rgba(196,228,233,0.52), transparent 22%), radial-gradient(circle at 77% 68%, rgba(196,228,233,0.34), transparent 16%)"
            }}
          />
          <svg
            className="pointer-events-none absolute inset-[10%] h-[80%] w-[80%] opacity-16"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M18 24C24 12 41 8 56 12C71 16 83 28 86 43C89 57 82 71 68 81C53 91 35 91 23 80C12 70 9 53 12 39C13 33 15 28 18 24Z"
              fill="rgba(194, 223, 216, 0.84)"
            />
          </svg>

          <div className="relative h-[240px] sm:h-[260px]">
            {nodes.map((node) => {
              const detail = getDetailParts(node.detail);

              return (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <span
                      className={`h-4 w-4 rounded-full border-2 border-white shadow-[0_8px_14px_rgba(67,45,33,0.14)] ${pinColor(node.tone)}`}
                    />
                    <div className="max-w-[7rem] rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] shadow-[0_8px_14px_rgba(67,45,33,0.07)] sm:max-w-[8rem]">
                      {node.label}
                    </div>
                    {detail.badge ? (
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${badgeClasses(detail.badge)}`}>
                        {detail.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-[1rem] border border-[var(--border)] bg-white/72 p-4"
            >
              <p className="eyebrow">{group.badge}</p>
              <h4 className="mt-2 text-xl">{group.title}</h4>
              <div className="mt-3 space-y-3">
                {group.nodes.map((node) => {
                  const detail = getDetailParts(node.detail);

                  return (
                    <div key={`${group.title}-${node.id}`} className="rounded-[0.9rem] bg-white/78 p-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${pinColor(node.tone)}`} />
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]">
                          {node.label}
                        </p>
                      </div>
                      {detail.text ? (
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail.text}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
