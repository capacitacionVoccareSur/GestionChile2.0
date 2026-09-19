"use client";

import { useEffect, useRef, useState } from "react";

interface FlowChartProps {
  chart: string;
}

export function FlowChart({ chart }: FlowChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            background: "#0f172a",
            primaryColor: "#1e293b",
            primaryTextColor: "#e2e8f0",
            primaryBorderColor: "#334155",
            lineColor: "#64748b",
            secondaryColor: "#0f172a",
            tertiaryColor: "#0f172a",
          },
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (err) {
        setError("No se pudo renderizar el diagrama.");
        console.error(err);
      }
    };

    render();
  }, [chart]);

  if (error) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-500">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 [&_svg]:max-w-full [&_svg]:mx-auto"
    />
  );
}
