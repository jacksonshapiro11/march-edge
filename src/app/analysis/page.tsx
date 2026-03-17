"use client";

import { useState } from "react";
import restTravel from "../../../data/analysis/rest-travel.json";
import overUnder from "../../../data/analysis/over-under.json";
import styleEvolution from "../../../data/analysis/style-evolution.json";
import players from "../../../data/analysis/players.json";
import teams from "../../../data/analysis/teams.json";

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl transition-all hover:border-border-hover">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 bg-transparent border-none cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">{icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-text-primary font-display">
                {title}
              </h2>
              <span className="text-text-dim text-xs">{open ? "▾" : "▸"}</span>
            </div>
            <p className="text-[13px] text-text-muted mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-border-subtle pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

function DataRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-border-subtle last:border-0">
      <span className="text-xs text-text-dim font-semibold tracking-wide shrink-0">
        {label}
      </span>
      <span
        className={`text-sm text-right ${accent ? "text-gold font-semibold" : "text-text-muted"}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-text-primary font-display mb-2">
          DEEP ANALYSIS
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          The full analytical framework behind every pick. Tap any section to
          explore the data.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Team Profiles */}
        <Section
          icon="🏀"
          title="Team Profiles"
          description="Full analytical profiles for every contender — 1-seeds, 2-seeds, and key Cinderellas."
        >
          <div className="space-y-4">
            {teams.map((team: any, i: number) => (
              <div key={i} className="bg-bg/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-text-primary text-base font-display">
                    {team.team}
                  </span>
                  <span className="text-xs text-text-dim font-mono">
                    {team.seed} · {team.record}
                  </span>
                  {team.ourPick.includes("CHAMPION") && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold/20 text-gold tracking-wide">
                      OUR CHAMPION
                    </span>
                  )}
                  {team.ourPick.includes("Final Four") && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 tracking-wide">
                      FINAL FOUR
                    </span>
                  )}
                </div>
                <div className="text-xs text-text-dim mb-2">
                  {team.coach} · KenPom {team.kenpom}
                </div>
                {/* Key Players */}
                <div className="mb-2">
                  <div className="text-[10px] font-bold text-text-dim tracking-wider mb-1">KEY PLAYERS</div>
                  <div className="space-y-1">
                    {team.keyPlayers.map((p: any, j: number) => (
                      <div key={j} className="text-xs text-text-muted">
                        <span className="text-text-secondary font-semibold">{p.name}</span>
                        <span className="text-text-dim font-mono ml-1">({p.stats})</span>
                        {p.note && <span className="text-text-dim ml-1">— {p.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <DataRow label="STRENGTHS" value={team.strengths} />
                <DataRow label="WEAKNESSES" value={team.weaknesses} />
                <DataRow label="OUR PICK" value={team.ourPick} accent />
              </div>
            ))}
          </div>
        </Section>

        {/* Style Evolution */}
        <Section
          icon="🔄"
          title="Style Evolution by Round"
          description="Which teams' advantages GROW vs SHRINK as the tournament progresses."
        >
          <div className="space-y-4">
            {styleEvolution.map((team, i) => (
              <div key={i} className="bg-bg/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-text-primary text-sm">
                    {team.team}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      team.growsOrShrinks.includes("GROWS")
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {team.growsOrShrinks}
                  </span>
                </div>
                <DataRow label="STYLE" value={team.styleAdvantage} />
                <DataRow label="WHY" value={team.why} />
                <DataRow label="PEAKS" value={team.peakRound} accent />
                <DataRow label="VULNERABILITY" value={team.vulnerability} />
              </div>
            ))}
          </div>
        </Section>

        {/* Rest & Travel */}
        <Section
          icon="✈️"
          title="Rest, Travel & Fatigue Map"
          description="Conference tournament workloads, travel distances, days of rest — who's fresh, who's gassed."
        >
          <div className="space-y-3">
            {restTravel.map((team, i) => (
              <div
                key={i}
                className="bg-bg/50 rounded-lg p-4 flex flex-col gap-1"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-text-primary text-sm">
                    {team.team}
                  </span>
                  <span className="text-xs text-text-dim font-mono">
                    {team.seed}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      team.fatigueLevel.includes("FRESH")
                        ? "bg-emerald-500/15 text-emerald-400"
                        : team.fatigueLevel.includes("HIGH")
                          ? "bg-red-500/15 text-red-400"
                          : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {team.fatigueLevel}
                  </span>
                </div>
                <DataRow label="CONF TOURNEY" value={team.confTourneyGames} />
                <DataRow label="REST" value={team.daysRest} />
                <DataRow
                  label="TRAVEL"
                  value={`${team.travel} (${team.distance})`}
                />
                <DataRow label="IMPACT" value={team.impact} accent />
              </div>
            ))}
          </div>
        </Section>

        {/* O/U Later Rounds */}
        <Section
          icon="⬆️⬇️"
          title="Over/Under Later Rounds"
          description="Sweet 16 through Championship total projections. The strongest UNDER plays in the tournament."
        >
          {["S16", "E8", "F4", "CHAMP"].map((round) => {
            const games = overUnder.filter((g) => g.round === round);
            if (games.length === 0) return null;
            const roundLabels: Record<string, string> = {
              S16: "SWEET 16",
              E8: "ELITE 8",
              F4: "FINAL FOUR",
              CHAMP: "CHAMPIONSHIP",
            };
            return (
              <div key={round} className="mb-4 last:mb-0">
                <h3 className="text-[10px] font-bold text-text-dim tracking-[2px] mb-2">
                  {roundLabels[round]}
                </h3>
                <div className="space-y-2">
                  {games.map((game, i) => (
                    <div key={i} className="bg-bg/50 rounded-lg p-3">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-sm text-text-primary">
                          {game.game}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-mono text-sm text-text-muted">
                            {game.projTotal}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              game.ouLean.includes("UNDER")
                                ? "bg-blue-500/15 text-blue-400"
                                : "bg-amber-500/15 text-amber-400"
                            }`}
                          >
                            {game.ouLean}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-text-dim leading-relaxed">
                        {game.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Section>

        {/* Key Player Matchups */}
        <Section
          icon="⚔️"
          title="Key Player Matchups"
          description="Star-vs-star analysis — who wins each head-to-head when it matters most."
        >
          <div className="space-y-3">
            {players.map((p, i) => (
              <div key={i} className="bg-bg/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-text-primary text-sm">
                    {p.player}
                  </span>
                  <span className="text-xs text-text-dim">
                    {p.team}
                  </span>
                </div>
                <DataRow label="STATS" value={p.stats} />
                <DataRow label="ARCHETYPE" value={p.archetype} />
                <DataRow label="IMPACT" value={p.impact} accent />
                <DataRow label="BEST MATCHUP" value={p.bestMatchup} />
                <DataRow label="WORST MATCHUP" value={p.worstMatchup} />
              </div>
            ))}
          </div>
        </Section>

        {/* Historical Upset Indicators */}
        <Section
          icon="📚"
          title="Historical Upset Indicators"
          description="The statistical factors that predict upsets, applied to every competitive first-round game."
        >
          <div className="space-y-3 text-sm text-text-muted leading-relaxed">
            <p>
              We identified 6 factors that historically predict NCAA Tournament
              upsets:
            </p>
            <div className="space-y-2">
              {[
                {
                  num: "1",
                  label: "KenPom Gap ≤ 20",
                  desc: "Teams within 20 spots in KenPom are competitive regardless of seeding.",
                },
                {
                  num: "2",
                  label: "Key Injury to Favorite",
                  desc: "Missing a starter shifts the line 3-5 points and disrupts chemistry.",
                },
                {
                  num: "3",
                  label: "Rest Advantage ≥ 3 Days",
                  desc: "Underdog with significantly more rest compounds late-game.",
                },
                {
                  num: "4",
                  label: "Hot Streak (8+ Wins in Last 10)",
                  desc: "Teams entering on a run carry confidence and execution patterns.",
                },
                {
                  num: "5",
                  label: "3-Point Shooting ≥ 37%",
                  desc: "High-variance shooting collapses seed advantage in a single game.",
                },
                {
                  num: "6",
                  label: "Sharp Money Confirmation",
                  desc: "When professional bettors back the underdog, the market hasn't adjusted.",
                },
              ].map((factor) => (
                <div
                  key={factor.num}
                  className="bg-bg/50 rounded-lg p-3 flex gap-3"
                >
                  <span className="text-gold font-bold font-mono flex-shrink-0">
                    {factor.num}
                  </span>
                  <div>
                    <span className="font-semibold text-text-secondary">
                      {factor.label}
                    </span>
                    <span className="text-text-dim"> — {factor.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-dim italic mt-3">
              Our 9 upset picks average 4.2 of these 6 factors. The more factors
              present, the higher our conviction.
            </p>
          </div>
        </Section>
      </div>

      {/* Analytical Philosophy */}
      <div className="bg-bg-card border border-border-subtle rounded-xl p-6 mt-6">
        <div className="text-[11px] font-bold text-text-dim tracking-[2px] mb-3">
          OUR ANALYTICAL PHILOSOPHY
        </div>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-2xl">
          Defense wins championships (85% of winners are top-25 in defensive
          efficiency). Injuries are the largest source of market mispricing — we
          adjust immediately while the market adjusts slowly. Structural
          advantages compound through rounds. Experience and stability matter
          more than peak talent in single elimination. Contrarian positioning
          wins bracket pools — differentiate where others default to chalk.
        </p>
        <p className="text-sm text-text-dim italic mt-3">
          Framework inspired by Munger&apos;s latticework of mental models,
          applied to basketball.
        </p>
      </div>
    </div>
  );
}
