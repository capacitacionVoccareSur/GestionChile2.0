"use client";

import { useState } from "react";
import { CategoriaPreguntas } from "@/types";
import { Modal } from "./Modal";
import { Info } from "lucide-react";

interface PreguntasModalProps {
  preguntas: CategoriaPreguntas[];
  open: boolean;
  onClose: () => void;
}

export function PreguntasModal({ preguntas, open, onClose }: PreguntasModalProps) {
  const categorias = [...new Set(preguntas.map((p) => p.categoria))];
  const [activeCategoria, setActiveCategoria] = useState<string>("all");
  const [selected, setSelected] = useState<CategoriaPreguntas | null>(null);

  const filtered =
    activeCategoria === "all"
      ? preguntas
      : preguntas.filter((p) => p.categoria === activeCategoria);

  return (
    <Modal open={open} onClose={onClose} title="Preguntas de Descarte">
      <div className="flex flex-col gap-4">
        {/* Filtro categoría */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCategoria("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategoria === "all" ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}>
            Todas
          </button>
          {categorias.map((cat) => (
            <button key={cat} onClick={() => setActiveCategoria(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategoria === cat ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {!selected ? (
          // Grid de categorías
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {filtered.map((cat) => (
              <button key={cat.id} onClick={() => setSelected(cat)}
                className="group flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-4 text-center hover:border-sky-500/40 hover:bg-slate-800/60 transition-all">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-slate-300 leading-snug">{cat.titulo}</span>
                <span className="text-xs text-slate-600">{cat.preguntas.length} preguntas</span>
              </button>
            ))}
          </div>
        ) : (
          // Vista de preguntas de la categoría seleccionada
          <div className="flex flex-col gap-4">
            <button onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
              ← Volver
            </button>

            <div className="flex items-center gap-3">
              <span className="text-2xl">{selected.emoji}</span>
              <div>
                <h3 className="text-base font-semibold text-white">{selected.titulo}</h3>
                <span className="text-xs text-slate-500">{selected.categoria}</span>
              </div>
            </div>

            {selected.notas && (
              <div className="flex gap-2.5 rounded-lg border border-sky-500/20 bg-sky-500/5 p-3">
                <Info size={14} className="shrink-0 text-sky-400 mt-0.5" />
                <p className="text-sm text-sky-300 leading-relaxed">{selected.notas}</p>
              </div>
            )}

            <ol className="flex flex-col gap-2">
              {selected.preguntas.map((preg, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-300 leading-relaxed">{preg}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </Modal>
  );
}
