"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg/95 backdrop-blur-xl">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center text-lg font-black text-bg">
            M
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-text-primary font-display">
              MARCH EDGE
            </div>
            <div className="text-[10px] text-text-dim tracking-[1.5px] font-semibold">
              BY COSMIC TREX
            </div>
          </div>
        </a>
        <a
          href="https://cosmictrex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-muted no-underline font-medium px-3 py-1.5 rounded-md border border-border-subtle hover:border-border-hover hover:text-text-secondary transition-colors"
        >
          cosmictrex.com ↗
        </a>
      </div>
    </header>
  );
}
