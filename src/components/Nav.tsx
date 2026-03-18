"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "BRACKET", icon: "🏀" },
  { href: "/edges", label: "EDGE BOARD", icon: "📊" },
  { href: "/brief", label: "THE BRIEF", icon: "📡" },
  { href: "/analysis", label: "DEEP ANALYSIS", icon: "🔬" },
  { href: "/survivor", label: "SURVIVOR", icon: "🎯" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border-subtle overflow-x-auto">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 flex gap-0">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 sm:px-5 py-3.5 text-xs font-bold tracking-wider whitespace-nowrap no-underline transition-colors border-b-2 ${
                active
                  ? "text-gold border-gold"
                  : "text-text-dim border-transparent hover:text-text-muted"
              }`}
            >
              <span className="mr-1.5">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
