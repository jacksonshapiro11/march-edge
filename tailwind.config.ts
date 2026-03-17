import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0f1a",
        "bg-card": "rgba(255,255,255,0.03)",
        "bg-card-hover": "rgba(255,255,255,0.06)",
        "border-subtle": "rgba(255,255,255,0.06)",
        "border-hover": "rgba(255,255,255,0.15)",
        gold: "#fbbf24",
        "text-primary": "#f8fafc",
        "text-body": "#e2e8f0",
        "text-secondary": "#cbd5e1",
        "text-muted": "#94a3b8",
        "text-dim": "#64748b",
        "text-faint": "#475569",
        breaking: "#ef4444",
        injury: "#f59e0b",
        sharp: "#10b981",
        bracket: "#3b82f6",
        purple: "#7c3aed",
        "purple-light": "#c4b5fd",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "Helvetica Neue", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
