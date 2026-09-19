"use client";

import { useState } from "react";
import { CategoriaPreguntas } from "@/types";
import { Modal } from "./Modal";
import { StepList } from "@/components/content/StepList";
import { Info } from "lucide-react";

const PASOS_TOMA_DATOS = [
  {
    title: "RUT del titular",
    description: "7 u 8 dígitos más dígito verificador, sin guión ni puntos. En el sistema siempre sin guión.",
  },
  {
    title: "Nombre completo",
    description: "Nombre y apellidos del titular.",
  },
  {
    title: "Teléfono de contacto",
    description: "Número donde coordinar la asistencia.",
  },
  {
    title: "Región y Comuna",
    description: "Región y comuna donde se necesita el servicio.",
  },
  {
    title: "Dirección con referencia",
    description: "Calle, número y departamento. Pedir una referencia (entre calles, edificio cercano).",
  },
];

interface TomarDatosModalProps {
  preguntas: CategoriaPreguntas[];
  open: boolean;
  onClose: () => void;
}

export function TomarDatosModal({ preguntas, open, onClose }: TomarDatosModalProps) {
  const categorias = [...new Set(preguntas.map((p) => p.categoria))];
  const [activeCategoria, setActiveCategoria] = useState<string>("all");
  const [selected, setSelected] = useState<CategoriaPreguntas | null>(null);

  const filtered =
    activeCategoria === "all"
      ? preguntas
      : preguntas.filter((p) => p.categoria === activeCategoria);

  return (
    <Modal open={open} onClose={onClose} title="¿Cómo tomar datos?">
      <div className="flex flex-col gap-4">

        {/* ── Sección 1: Toma de datos básicos ─────────────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Datos básicos del afiliado
          </p>
          <StepList steps={PASOS_TOMA_DATOS} />
        </div>

        {/* ── Divisor ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Preguntas de descarte
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── Sección 2: Preguntas de descarte ─────────────────────── */}
        {!selected ? (
          <div className="flex flex-col gap-3">
            {/* Filtro por categoría */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategoria("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeCategoria === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:text-gray-800"
                }`}
              >
                Todas
              </button>
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoria(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategoria === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid de categorías */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {filtered.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelected(cat)}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center hover:border-indigo-200 hover:bg-indigo-50/40 transition-all"
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-xs font-medium text-gray-700 leading-snug">{cat.titulo}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Vista de preguntas de la categoría seleccionada */
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-900 transition-colors"
            >
              ← Volver a categorías
            </button>

            <div className="flex items-center gap-3">
              <span className="text-2xl">{selected.emoji}</span>
              <div>
                <h3 className="text-base font-semibold text-gray-900">{selected.titulo}</h3>
                <span className="text-xs text-slate-500">{selected.categoria}</span>
              </div>
            </div>

            {selected.notas && (
              <div className="flex gap-2.5 rounded-lg border border-indigo-200 bg-indigo-50 p-3">
                <Info size={14} className="shrink-0 text-sky-400 mt-0.5" />
                <p className="text-sm text-indigo-700 leading-relaxed">{selected.notas}</p>
              </div>
            )}

            <ol className="flex flex-col gap-1.5">
              {selected.preguntas.map((preg, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-normal">{preg}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </Modal>
  );
}
