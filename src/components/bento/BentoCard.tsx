"use client";

import { ArrowRight } from "lucide-react";

interface BentoCardProps {
  number: number;
  title: string;
  count: number;
  countLabel: string;
  color: string;
  onClick: () => void;
  className?: string;
  // kept for API compatibility, unused in current design
  icon?: React.ReactNode;
  preview?: string[];
}

export function BentoCard({
  number,
  title,
  count,
  countLabel,
  color,
  onClick,
  className = "",
}: BentoCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden flex flex-col justify-between rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${color} ${className}`}
    >
      {/* Top row: number + arrow */}
      <div className="flex items-start justify-between">
        <span className="text-2xl font-black text-white/25 tabular-nums leading-none select-none">
          {String(number).padStart(2, "0")}
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 group-hover:translate-x-1 group-hover:bg-white/30">
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </div>

      {/* Bottom: title + count */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-white leading-snug">{title}</p>
        <p className="mt-0.5 text-xs text-white/60">{count} {countLabel}</p>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-200 group-hover:bg-white/8" />
    </button>
  );
}
