"use client";

import { useState } from "react";
import survivorData from "../../../data/survivor.json";

/* ── Burn score bar (visual gauge) ── */
function BurnBar({ score }: { score: number | null }) {
  if (score === null) return null;
  const pct = Math.min(score / 10, 1) * 100;
  const color =
    score >= 7
      ? "bg-emerald-400"
      : score >= 5
        ? "bg-amber-400"
        : score >= 3
          ? "bg-orange-400"
          : "bg-red-400";
  return (
    <div className="w-full h-1.5 bg-bg rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ── Single candidate row ── */
function CandidateRow({
  c,
}: {
  c: {
    rank: number | null;
    team: string;
    seed: string;
    opponent: string;
    line: string | null;
    safety: number;
    fv: number;
    burn: number | null;
    analysis: string;
    avoid?: boolean;
  };
}) {
  const [open, setOpen] = useState(false);
  const isAvoid = c.avoid;
  const isTop = c.rank === 1;

  return (
    <button
      onClick={() => setOpen(!open)}
      className={`w-full text-left bg-transparent border cursor-pointer rounded-lg p-3 transition-all ${
        isAvoid
          ? "border-red-500/15 bg-red-500/[0.03] opacity-60"
          : isTop
            ? "border-gold/30 bg-gold/[0.04]"
            : "border-border-subtle hover:border-border-hover"
      }`}
    >
      {/* Top line: rank, team, opponent, scores */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Rank badge */}
        {c.rank ? (
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
              isTop
                ? "bg-gold text-bg"
                : "bg-bg text-text-dim border border-border-subtle"
            }`}
          >
            {c.rank}
          </span>
        ) : (
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 bg-red-500/20 text-red-400">
            ✕
          </span>
        )}

        {/* Team name */}
        <span className="font-bold text-sm text-text-primary font-display">
          {c.team}
        </span>
        <span className="text-[10px] text-text-dim font-mono">{c.seed}</span>

        {/* vs opponent */}
        <span className="text-xs text-text-dim">
          vs {c.opponent}
        </span>

        {/* Line if available */}
        {c.line && (
          <span className="text-[10px] font-mono text-text-dim">
            ({c.line})
          </span>
        )}

        {/* Spacer */}
        <span className="flex-1" />

        {/* Score pills */}
        {!isAvoid && c.burn !== null && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[9px] font-mono text-text-dim">
              S{c.safety}
            </span>
            <span className="text-[9px] font-mono text-text-dim">
              FV{c.fv}
            </span>
            <span
              className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                c.burn >= 7
                  ? "bg-emerald-500/15 text-emerald-400"
                  : c.burn >= 5
                    ? "bg-amber-500/15 text-amber-400"
                    : "bg-orange-500/15 text-orange-400"
              }`}
            >
              {c.burn.toFixed(1)}
            </span>
          </div>
        )}
        {isAvoid && (
          <span className="text-[10px] font-bold text-red-400 tracking-wider flex-shrink-0">
            AVOID
          </span>
        )}

        <span className="text-text-dim text-[10px] flex-shrink-0">
          {open ? "▾" : "▸"}
        </span>
      </div>

      {/* Burn bar for non-avoid candidates */}
      {!isAvoid && c.burn !== null && (
        <div className="mt-2">
          <BurnBar score={c.burn} />
        </div>
      )}

      {/* Expanded analysis */}
      {open && (
        <p className="text-xs text-text-muted mt-2 leading-relaxed">
          {c.analysis}
        </p>
      )}
    </button>
  );
}

/* ── Round section ── */
function RoundSection({
  round,
}: {
  round: {
    id: string;
    name: string;
    date: string;
    verdict: string;
    candidates: any[];
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl transition-all hover:border-border-hover">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 bg-transparent border-none cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-text-primary font-display">
                {round.name}
              </h2>
              <span className="text-text-dim text-xs">{open ? "▾" : "▸"}</span>
            </div>
            <p className="text-[11px] text-text-dim mt-0.5 font-mono">
              {round.date}
            </p>
          </div>
          {/* Verdict badge */}
          <div className="text-right flex-shrink-0">
            <div className="text-[9px] font-bold text-text-dim tracking-wider mb-0.5">
              VERDICT
            </div>
            <div className="text-[11px] text-gold font-semibold max-w-[200px]">
              {round.verdict.split(",")[0]}
            </div>
          </div>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border-subtle pt-3 space-y-2">
          {/* Verdict banner */}
          <div className="bg-gold/[0.06] border border-gold/20 rounded-lg p-3 mb-3">
            <div className="text-[9px] font-bold text-gold tracking-wider mb-1">
              ROUND VERDICT
            </div>
            <p className="text-xs text-text-secondary">{round.verdict}</p>
          </div>

          {/* Column headers */}
          <div className="flex items-center gap-2 px-3 text-[9px] font-bold text-text-dim tracking-wider">
            <span className="w-5" />
            <span className="flex-1">TEAM</span>
            <span className="w-20 text-right">SCORES</span>
            <span className="w-4" />
          </div>

          {/* Candidate rows */}
          {round.candidates.map((c: any, i: number) => (
            <CandidateRow key={i} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Primary path timeline (compact) ── */
function PathStep({
  step,
  index,
  total,
}: {
  step: { round: string; pick: string; opponent?: string; winPct: string; burnReason?: string };
  index: number;
  total: number;
}) {
  const isChamp = index === total - 1;
  return (
    <div className="relative pl-8">
      {index < total - 1 && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border-subtle" />
      )}
      <div
        className={`absolute left-1 top-2 w-[14px] h-[14px] rounded-full border-2 ${
          isChamp ? "bg-gold border-gold" : "bg-bg border-text-dim"
        }`}
      />
      <div
        className={`pb-4 ${
          isChamp ? "bg-gold/[0.04] border border-gold/20 rounded-lg p-4 -ml-2" : ""
        }`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-text-dim tracking-wider font-mono">
            {step.round}
          </span>
          <span className="text-sm font-bold text-text-primary">
            {step.pick}
          </span>
          {step.opponent && (
            <span className="text-xs text-text-dim">vs {step.opponent}</span>
          )}
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
              parseInt(step.winPct) >= 85
                ? "bg-emerald-500/15 text-emerald-400"
                : parseInt(step.winPct) >= 70
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-red-500/15 text-red-300"
            }`}
          >
            {step.winPct}
          </span>
        </div>
        {step.burnReason && (
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            {step.burnReason}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SurvivorPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showPrimary, setShowPrimary] = useState(false);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-extrabold text-text-primary font-display">
            SURVIVOR STRATEGY
          </h1>
          <span className="bg-purple/20 text-purple-light text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider">
            POOL GUIDE
          </span>
        </div>
        <p className="text-text-muted text-sm max-w-xl">
          Every viable pick ranked by round. The core principle: pick the safest
          team that dies soonest. Never burn a team you&apos;ll need later.
        </p>
      </div>

      {/* Burn Score methodology */}
      <div className="bg-bg-card border border-border-subtle rounded-xl p-5 mb-6">
        <div className="text-[10px] font-bold text-text-dim tracking-wider mb-2">
          HOW BURN SCORES WORK
        </div>
        <p className="text-sm text-text-muted leading-relaxed">
          <span className="text-gold font-semibold">Burn Score</span> = Safety × (10 −
          Future Value) / 10. A team that&apos;s 95% safe with zero future value
          (dead next round) scores <span className="font-mono text-text-secondary">8.6</span>. That same team as a Final Four
          contender scores <span className="font-mono text-text-secondary">0.95</span>. Same
          safety, wildly different burn value. High safety + low future value = pick them now.
        </p>
        <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-text-dim">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-emerald-400 inline-block" /> 7+</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-amber-400 inline-block" /> 5-7</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-orange-400 inline-block" /> 3-5</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-red-400 inline-block" /> &lt;3</span>
        </div>
      </div>

      {/* The One Rule */}
      <div className="bg-gold/[0.06] border border-gold/20 rounded-xl p-5 mb-6 text-center">
        <p className="text-[15px] text-gold font-bold font-display">
          &ldquo;Every time you pick a team, ask: Will I wish I had this team later?&rdquo;
        </p>
        <p className="text-xs text-text-muted mt-2">
          Yes → find someone else. No → burn them.
        </p>
      </div>

      {/* Untouchables */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-breaking tracking-[2px] mb-3">
          THE UNTOUCHABLES — NEVER USE EARLY
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {survivorData.untouchables.map((team, i) => (
            <div
              key={i}
              className="bg-red-500/[0.04] border border-red-500/15 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-text-primary text-sm font-display">
                  {team.team}
                </span>
                <span className="text-xs text-text-dim font-mono">
                  {team.seed}
                </span>
              </div>
              <div className="text-[10px] font-bold text-gold tracking-wider mb-1">
                EXIT: {team.projectedExit.toUpperCase()}
              </div>
              <p className="text-xs text-text-muted">{team.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* ROUND-BY-ROUND CANDIDATE RANKINGS — the main event */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gold tracking-[2px] mb-1">
          ROUND-BY-ROUND CANDIDATE RANKINGS
        </h2>
        <p className="text-xs text-text-dim mb-4">
          Every viable candidate ranked by Burn Score. Tap a round to see the full table.
        </p>
        <div className="flex flex-col gap-3">
          {survivorData.rounds.map((round) => (
            <RoundSection key={round.id} round={round} />
          ))}
        </div>
      </div>

      {/* Primary Path (collapsible) */}
      <div className="mb-8">
        <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden">
          <button
            onClick={() => setShowPrimary(!showPrimary)}
            className="w-full text-left p-5 bg-transparent border-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-bold text-emerald-400 tracking-[2px]">
                THE DEFINITIVE PATH (PRIMARY)
              </h2>
              <span className="text-[10px] font-bold text-text-dim font-mono">
                Cumulative survival: {survivorData.cumulativeSurvival}
              </span>
              <span className="flex-1" />
              <span className="text-text-dim text-xs">
                {showPrimary ? "▾" : "▸"}
              </span>
            </div>
          </button>
          {showPrimary && (
            <div className="px-5 pb-5 border-t border-border-subtle pt-4">
              {survivorData.primaryPath.map((step, i) => (
                <PathStep
                  key={i}
                  step={step}
                  index={i}
                  total={survivorData.primaryPath.length}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Danger Zones */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-breaking tracking-[2px] mb-3">
          DANGER ZONES — DO NOT PICK
        </h2>
        <div className="flex flex-col gap-2">
          {survivorData.dangerZones.map((dz, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle rounded-lg p-3 flex gap-3"
            >
              <span className="text-breaking text-sm flex-shrink-0">✕</span>
              <div>
                <span className="text-sm font-semibold text-text-secondary">
                  {dz.game}
                </span>
                <span className="text-xs text-text-dim ml-2">— {dz.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternate Paths */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-text-dim tracking-[2px] mb-3">
          ALTERNATE PATHS
        </h2>
        <div className="flex flex-col gap-3">
          {survivorData.alternatePaths.map((path, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setSelectedPath(selectedPath === path.name ? null : path.name)
                }
                className="w-full text-left p-4 bg-transparent border-none cursor-pointer hover:bg-bg-card-hover transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-text-primary">
                      {path.name}
                    </span>
                    <span className="text-xs text-text-dim ml-2">
                      {path.cumulative}
                    </span>
                  </div>
                  <span className="text-text-dim text-xs">
                    {selectedPath === path.name ? "▾" : "▸"}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  {path.description}
                </p>
              </button>
              {selectedPath === path.name && (
                <div className="px-4 pb-4 border-t border-border-subtle pt-3">
                  <div className="space-y-2">
                    {path.picks.map((pick, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span className="text-text-dim font-mono w-16 flex-shrink-0">
                          {pick.round}
                        </span>
                        <span className="text-text-primary font-semibold flex-1">
                          {pick.pick}
                        </span>
                        <span
                          className={`font-mono font-bold ${
                            parseInt(pick.winPct) >= 85
                              ? "text-emerald-400"
                              : parseInt(pick.winPct) >= 70
                                ? "text-amber-400"
                                : "text-red-300"
                          }`}
                        >
                          {pick.winPct}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Format Guides */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-text-dim tracking-[2px] mb-3">
          FORMAT-SPECIFIC STRATEGY
        </h2>
        <div className="flex flex-col gap-2">
          {survivorData.formatGuides.map((fmt, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle rounded-lg p-4"
            >
              <div className="font-semibold text-sm text-text-secondary mb-1">
                {fmt.format}
              </div>
              <div className="text-xs text-text-muted font-mono">
                {fmt.strategy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
