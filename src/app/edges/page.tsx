"use client";

import edgesData from "../../../data/edges.json";

function StarRating({ stars }: { stars: string }) {
  const count = (stars.match(/★/g) || []).length;
  return (
    <span className="text-gold tracking-wider font-mono text-sm">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const isFade = type.toUpperCase().includes("FADE");
  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wide ${
        isFade
          ? "bg-red-500/15 text-red-300"
          : "bg-blue-500/15 text-blue-300"
      }`}
    >
      {type.toUpperCase()}
    </span>
  );
}

export default function EdgesPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-extrabold text-text-primary font-display">
            EDGE BOARD
          </h1>
          <span className="bg-breaking text-white text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider animate-pulse-glow">
            LIVE
          </span>
        </div>
        <p className="text-text-muted text-sm max-w-xl">
          Our highest-conviction betting edges, ranked by confidence. Updated as
          lines move and news breaks.
        </p>
      </div>

      {/* Edges list */}
      <div className="flex flex-col gap-2">
        {edgesData.map((edge, i) => {
          const isNew = edge.confidence.includes("NEW") || edge.reasoning.includes("Holloway");
          return (
            <div
              key={i}
              className={`rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all ${
                isNew
                  ? "bg-red-500/[0.06] border border-red-500/25"
                  : "bg-bg-card border border-border-subtle hover:bg-bg-card-hover"
              }`}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 text-center">
                <span
                  className={`text-lg font-extrabold font-mono ${
                    edge.confidence.includes("★★★★★")
                      ? "text-emerald-400"
                      : "text-gold"
                  }`}
                >
                  {i + 1}
                </span>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15px] text-text-primary">
                  {edge.play}
                </div>
                <div className="text-xs text-text-dim mt-1 leading-relaxed">
                  {edge.reasoning}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 flex-wrap sm:flex-shrink-0">
                <TypeBadge type={edge.type} />
                <StarRating stars={edge.confidence} />
                {isNew && (
                  <span className="text-[10px] font-bold text-breaking tracking-wide">
                    NEW ⚡
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology */}
      <div className="bg-bg-card border border-border-subtle rounded-xl p-5 mt-6">
        <div className="text-xs font-bold text-text-dim tracking-wider mb-2">
          METHODOLOGY
        </div>
        <p className="text-sm text-text-muted leading-relaxed">
          Edges are identified through a convergence of KenPom/Torvik efficiency
          gaps, injury-adjusted projections, sharp money confirmation (verified
          line movements), historical upset indicators, and structural advantages
          (rest, travel, home court). We don&apos;t chase narratives — we follow
          the data and flag where markets haven&apos;t adjusted.
        </p>
      </div>
    </div>
  );
}
