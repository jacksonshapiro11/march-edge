import briefsData from "../../../data/briefs.json";

export default function BriefPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-extrabold text-text-primary font-display">
            THE BRIEF
          </h1>
          <span className="bg-blue-500/15 text-blue-300 text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider">
            INTELLIGENCE FEED
          </span>
        </div>
        <p className="text-text-muted text-sm max-w-xl">
          Real-time tournament intelligence. Injuries, arrests, line movements,
          sharp money, and analytical reactions — as they happen.
        </p>
      </div>

      {/* Brief entries */}
      <div className="flex flex-col gap-4">
        {briefsData.map((brief) => (
          <article
            key={brief.id}
            className={`bg-bg-card rounded-xl p-5 border-l-4 ${
              brief.tag === "BREAKING"
                ? "border border-red-500/25 border-l-red-500"
                : "border border-border-subtle"
            }`}
            style={{ borderLeftColor: brief.tagColor }}
          >
            {/* Tag + time */}
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wider text-white"
                style={{
                  backgroundColor: brief.tagColor,
                  color:
                    brief.tag === "SHARP MONEY" ? "#000" : "#fff",
                }}
              >
                {brief.tag}
              </span>
              <span className="text-xs text-text-dim">{brief.time}</span>
            </div>

            {/* Title */}
            <h2 className="text-[17px] font-bold text-text-primary font-display mb-2">
              {brief.title}
            </h2>

            {/* Summary */}
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              {brief.summary}
            </p>

            {/* Impact + Betting Edge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-bold text-text-dim tracking-wider mb-1">
                  BRACKET IMPACT
                </div>
                <div className="text-[13px] text-text-muted">
                  {brief.impact}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gold tracking-wider mb-1">
                  BETTING EDGE
                </div>
                <div className="text-[13px] text-gold">
                  {brief.bettingEdge}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA to cosmictrex */}
      <div className="rounded-xl p-6 mt-8 text-center bg-gradient-to-br from-blue-500/[0.06] to-purple/[0.06] border border-purple/20">
        <div className="text-[13px] font-bold text-purple-light tracking-wider mb-2">
          THE ANALYTICAL FRAMEWORK BEHIND THESE PICKS
        </div>
        <p className="text-[15px] text-text-body max-w-lg mx-auto leading-relaxed">
          This tournament analysis is powered by the same systems-thinking
          approach behind the{" "}
          <span className="text-purple-light font-bold">
            Mental Models Observatory
          </span>{" "}
          — 200+ frameworks across 40 domains for understanding complex systems.
        </p>
        <a
          href="https://cosmictrex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-purple text-white font-bold text-sm no-underline tracking-wide hover:bg-purple-600 transition-colors"
        >
          Explore cosmictrex.com →
        </a>
      </div>
    </div>
  );
}
