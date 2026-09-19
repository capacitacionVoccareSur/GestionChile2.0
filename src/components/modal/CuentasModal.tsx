"use client";

import { useState } from "react";
import { Plan } from "@/types";
import { Modal } from "./Modal";
import { Clock, Info, AlertCircle } from "lucide-react";

interface CuentasModalProps {
  planes: Plan[];
  open: boolean;
  onClose: () => void;
}

function PlanView({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="inline-block rounded-md bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-400 mb-2">
          {plan.empresa}
        </span>
        <h2 className="text-base font-semibold text-white">{plan.nombre}</h2>
        <div className="mt-2 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 flex flex-col gap-1">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Piloto / Validación</p>
          <p className="font-mono text-sm text-amber-300 whitespace-pre-wrap">{plan.piloto}</p>
        </div>
        {plan.guionEntrada && (
          <div className="mt-2 flex gap-2.5 rounded-lg border border-sky-500/20 bg-sky-500/5 p-3">
            <Info size={14} className="shrink-0 text-sky-400 mt-0.5" />
            <p className="text-sm text-sky-300 italic leading-relaxed">{plan.guionEntrada}</p>
          </div>
        )}
      </div>

      {/* Servicios */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Principales Servicios</p>
        <ul className="flex flex-col gap-1.5">
          {plan.servicios.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-500" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Coberturas */}
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Coberturas</p>
        <p className="text-sm text-slate-300">{plan.coberturas}</p>
      </div>

      {/* Tiempo de reporte */}
      {plan.tiempoReporte && (
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-slate-500 shrink-0" />
          <p className="text-sm text-slate-400">
            <span className="text-slate-500">Tiempo de reporte: </span>
            {plan.tiempoReporte}
          </p>
        </div>
      )}

      {/* Observaciones */}
      {plan.observaciones && (
        <div className="flex gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <AlertCircle size={14} className="shrink-0 text-amber-400 mt-0.5" />
          <p className="text-sm text-amber-300 leading-relaxed whitespace-pre-wrap">{plan.observaciones}</p>
        </div>
      )}

      {/* Gestión */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Gestión</p>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{plan.gestion}</p>
      </div>
    </div>
  );
}

export function CuentasModal({ planes, open, onClose }: CuentasModalProps) {
  const [selectedId, setSelectedId] = useState<string>(planes[0]?.id ?? "");
  const selected = planes.find((p) => p.id === selectedId) ?? planes[0];

  // Group by empresa
  const empresas = [...new Set(planes.map((p) => p.empresa))];
  const [activeEmpresa, setActiveEmpresa] = useState<string>("all");

  const filtered =
    activeEmpresa === "all" ? planes : planes.filter((p) => p.empresa === activeEmpresa);

  if (!selected) return null;

  return (
    <Modal open={open} onClose={onClose} title="Cuentas / Planes">
      <div className="flex flex-col gap-5">
        {/* Empresa filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveEmpresa("all"); setSelectedId(planes[0]?.id ?? ""); }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeEmpresa === "all"
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            Todas
          </button>
          {empresas.map((e) => (
            <button
              key={e}
              onClick={() => {
                setActiveEmpresa(e);
                const first = planes.find((p) => p.empresa === e);
                if (first) setSelectedId(first.id);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeEmpresa === e
                  ? "bg-sky-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Plan selector */}
        <div className="flex flex-wrap gap-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                p.id === selectedId
                  ? "bg-slate-700 text-white ring-1 ring-slate-600"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {p.nombre.length > 45 ? p.nombre.slice(0, 45) + "…" : p.nombre}
            </button>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-4">
          <PlanView plan={selected} />
        </div>
      </div>
    </Modal>
  );
}
