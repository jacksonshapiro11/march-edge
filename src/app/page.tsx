"use client";

import { useState } from "react";
import bracketData from "../../data/bracket.json";

const REGIONS = [
  {
    id: "East",
    label: "EAST",
    color: "bg-blue-500",
    textColor: "text-blue-400",
    borderColor: "border-blue-500",
    sub: "Duke (1) · UConn (2) · MSU (3) · Kansas (4)",
  },
  {
    id: "West",
    label: "WEST",
    color: "bg-purple-500",
    textColor: "text-purple-400",
    borderColor: "border-purple-500",
    sub: "Arizona (1) · Purdue (2) · Gonzaga (3) · Arkansas (4)",
  },
  {
    id: "Midwest",
    label: "MIDWEST",
    color: "bg-amber-500",
    textColor: "text-amber-400",
    borderColor: "border-amber-500",
    sub: "Michigan (1) · Iowa State (2) · Virginia (3) · Alabama (4)",
  },
  {
    id: "South",
    label: "SOUTH",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500",
    sub: "Florida (1) · Houston (2) · Illinois (3) · Nebraska (4)",
  },
];

const FINAL_FOUR = [
  { team: "Michigan", seed: "1 MW", note: "CHAMPION 🏆", highlight: true },
  { team: "Arizona", seed: "1 W", note: "Runner-up", highlight: false },
  { team: "UConn", seed: "2 E", note: "Duke falls in E8", highlight: false },
  { team: "Houston", seed: "2 S", note: "Home court edge", highlight: false },
];

const ROUND_ORDER = ["First Four", "R64", "R32", "S16", "E8"];
const ROUND_LABELS: Record<string, string> = {
  "First Four": "FIRST FOUR",
  R64: "ROUND OF 64",
  R32: "ROUND OF 32",
  S16: "SWEET 16",
  E8: "ELITE 8",
};

function ConfidenceBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    High: "bg-emerald-500/15 text-emerald-400",
    Medium: "bg-amber-500/15 text-amber-400",
    Med: "bg-amber-500/15 text-amber-400",
    Low: "bg-slate-500/15 text-slate-400",
  };
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded ${colors[level] || colors["Low"]}`}
    >
      {level.toUpperCase()}
    </span>
  );
}

function GameCard({
  game,
  regionColor,
}: {
  game: (typeof bracketData)[0];
  regionColor: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`bg-bg-card border rounded-lg p-4 cursor-pointer transition-all hover:bg-bg-card-hover ${
        game.upset
          ? "border-amber-500/30 bg-amber-500/[0.04]"
          : "border-border-subtle"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-text-primary">
              {game.matchup}
            </span>
            {game.upset && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 tracking-wide">
                UPSET
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-text-dim font-mono">
            <span>SPR {game.spread}</span>
            <span>O/U {game.ouTotal}</span>
            <span className="text-text-muted">{game.ouLean}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`text-sm font-bold ${regionColor}`}>
            {game.pick}
          </span>
          <ConfidenceBadge level={game.confidence} />
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border-subtle text-sm text-text-muted leading-relaxed">
          {game.reasoning}
        </div>
      )}
    </div>
  );
}

export default function BracketPage() {
  const [selectedRegion, setSelectedRegion] = useState("East");
  const [showFinalFour, setShowFinalFour] = useState(true);

  const region = REGIONS.find((r) => r.id === selectedRegion)!;
  const regionGames = bracketData.filter(
    (g) => g.region === selectedRegion
  );

  const finalFourGames = bracketData.filter(
    (g) => g.round === "F4" || g.round === "CHAMP"
  );

  const gamesByRound: Record<string, typeof bracketData> = {};
  for (const g of regionGames) {
    if (!gamesByRound[g.round]) gamesByRound[g.round] = [];
    gamesByRound[g.round].push(g);
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-extrabold text-text-primary font-display">
            THE BRACKET
          </h1>
          <span className="bg-emerald-500 text-black text-[10px] font-bold px-2.5 py-0.5 rounded tracking-wider">
            UPDATED MAR 17
          </span>
        </div>
        <p className="text-text-muted text-sm max-w-xl">
          Every game picked from First Four through Championship. 9 upset picks.
          Tap any game for matchup-by-matchup analysis.
        </p>
      </div>

      {/* Final Four banner */}
      <div className="rounded-xl p-5 mb-6 bg-gradient-to-br from-gold/10 to-gold/[0.02] border border-gold/20">
        <button
          onClick={() => setShowFinalFour(!showFinalFour)}
          className="w-full text-left bg-transparent border-none cursor-pointer"
        >
          <div className="text-[11px] font-bold text-gold tracking-[2px] mb-2">
            OUR FINAL FOUR{" "}
            <span className="text-text-dim ml-1">
              {showFinalFour ? "▾" : "▸"}
            </span>
          </div>
        </button>
        {showFinalFour && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FINAL_FOUR.map((t) => (
              <div
                key={t.team}
                className={`bg-white/5 rounded-lg p-3 border-l-[3px] ${
                  t.highlight ? "border-gold" : "border-text-muted"
                }`}
              >
                <div className="font-extrabold text-lg text-text-primary font-display">
                  {t.team}
                </div>
                <div className="text-xs text-text-dim">{t.seed}</div>
                <div
                  className={`text-[11px] font-semibold mt-1 ${
                    t.highlight ? "text-gold" : "text-text-muted"
                  }`}
                >
                  {t.note}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Region tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRegion(r.id)}
            className={`rounded-lg px-4 py-3 text-left transition-all border-none cursor-pointer ${
              selectedRegion === r.id
                ? `${r.color} text-black`
                : "bg-bg-card text-text-muted hover:bg-bg-card-hover"
            }`}
          >
            <div className="font-bold text-sm">{r.label}</div>
            <div
              className={`text-[10px] mt-0.5 ${
                selectedRegion === r.id ? "opacity-80" : "opacity-60"
              }`}
            >
              {r.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Games by round */}
      {ROUND_ORDER.filter((round) => gamesByRound[round]).map((round) => (
        <div key={round} className="mb-6">
          <h2 className="text-xs font-bold text-text-dim tracking-[2px] mb-3">
            {ROUND_LABELS[round]}
          </h2>
          <div className="flex flex-col gap-2">
            {gamesByRound[round].map((game, i) => (
              <GameCard
                key={i}
                game={game}
                regionColor={region.textColor}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Final Four + Championship */}
      {finalFourGames.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gold tracking-[2px] mb-3">
            FINAL FOUR & CHAMPIONSHIP
          </h2>
          <div className="flex flex-col gap-2">
            {finalFourGames.map((game, i) => (
              <GameCard key={i} game={game} regionColor="text-gold" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
