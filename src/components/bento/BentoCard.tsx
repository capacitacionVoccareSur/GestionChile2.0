"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export type BentoColorKey = "indigo" | "violet" | "sky" | "emerald" | "rose";

const COLORS: Record<BentoColorKey, {
  bg: string; shadowDark: string; shadowLight: string;
  text: string; subText: string; numText: string; arrowBg: string;
}> = {
  indigo:  { bg: "#6366f1", shadowDark: "#3730a3", shadowLight: "#818cf8", text: "#ffffff", subText: "rgba(255,255,255,0.65)", numText: "rgba(255,255,255,0.25)", arrowBg: "rgba(255,255,255,0.25)" },
  violet:  { bg: "#8b5cf6", shadowDark: "#5b21b6", shadowLight: "#a78bfa", text: "#ffffff", subText: "rgba(255,255,255,0.65)", numText: "rgba(255,255,255,0.25)", arrowBg: "rgba(255,255,255,0.25)" },
  sky:     { bg: "#0ea5e9", shadowDark: "#0369a1", shadowLight: "#38bdf8", text: "#ffffff", subText: "rgba(255,255,255,0.65)", numText: "rgba(255,255,255,0.25)", arrowBg: "rgba(255,255,255,0.25)" },
  emerald: { bg: "#10b981", shadowDark: "#065f46", shadowLight: "#34d399", text: "#ffffff", subText: "rgba(255,255,255,0.65)", numText: "rgba(255,255,255,0.25)", arrowBg: "rgba(255,255,255,0.25)" },
  rose:    { bg: "#f43f5e", shadowDark: "#9f1239", shadowLight: "#fb7185", text: "#ffffff", subText: "rgba(255,255,255,0.65)", numText: "rgba(255,255,255,0.25)", arrowBg: "rgba(255,255,255,0.25)" },
};

interface BentoCardProps {
  number: number;
  title: string;
  count: number;
  countLabel: string;
  colorKey: BentoColorKey;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  preview?: string[];
}

export function BentoCard({
  number, title, count, countLabel, colorKey, onClick, className = "",
}: BentoCardProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const cfg = COLORS[colorKey];

  const shadow = pressed
    ? `inset 2px 2px 5px ${cfg.shadowDark}99, inset -2px -2px 5px ${cfg.shadowLight}99`
    : hovered
    ? `3px 3px 8px ${cfg.shadowDark}88, -3px -3px 8px ${cfg.shadowLight}88`
    : "none";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`group relative flex flex-col rounded-xl p-2.5 text-left focus-visible:outline-none flex-1 min-h-[76px] transition-shadow duration-200 cursor-pointer ${className}`}
      style={{ background: cfg.bg, boxShadow: shadow }}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-black tabular-nums leading-none select-none" style={{ color: cfg.numText }}>
          {String(number).padStart(2, "0")}
        </span>
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5"
          style={{ background: cfg.arrowBg }}
        >
          <ArrowRight size={10} strokeWidth={2.5} className="text-white" />
        </span>
      </div>
      <div className="mt-auto pt-2">
        <p className="text-xs font-semibold leading-snug" style={{ color: cfg.text }}>{title}</p>
        <p className="mt-0.5 text-[11px]" style={{ color: cfg.subText }}>{count} {countLabel}</p>
      </div>
    </button>
  );
}
