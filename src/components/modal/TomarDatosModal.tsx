"use client";

import { useState } from "react";
import { CategoriaPreguntas } from "@/types";
import { Modal } from "./Modal";
import { StepList } from "@/components/content/StepList";
import {
  Info, Droplets, Activity, Truck, KeyRound, PawPrint, Car, Zap,
  Smartphone, Wrench, LayoutGrid, Monitor, Fuel, Paintbrush, Flame,
  FileText, Heart, Star, GraduationCap, ChevronLeft, type LucideIcon,
} from "lucide-react";

interface IconCfg { icon: LucideIcon; bg: string; shadowDark: string; iconColor: string }

const ICON_MAP: Record<string, IconCfg> = {
  "plomeria":              { icon: Droplets,      bg: "#dbeafe", shadowDark: "#93c5fd",  iconColor: "text-blue-600"    },
  "dental":                { icon: Activity,      bg: "#cffafe", shadowDark: "#67e8f9",  iconColor: "text-cyan-600"    },
  "remolque":              { icon: Truck,         bg: "#ffedd5", shadowDark: "#fdba74",  iconColor: "text-orange-600"  },
  "cerrajeria":            { icon: KeyRound,      bg: "#fef3c7", shadowDark: "#fcd34d",  iconColor: "text-amber-600"   },
  "mascota":               { icon: PawPrint,      bg: "#fce7f3", shadowDark: "#f9a8d4",  iconColor: "text-pink-600"    },
  "auxilio-vial":          { icon: Car,           bg: "#f1f5f9", shadowDark: "#cbd5e1",  iconColor: "text-slate-600"   },
  "electricidad":          { icon: Zap,           bg: "#fef9c3", shadowDark: "#fde047",  iconColor: "text-yellow-600"  },
  "sura-uber":             { icon: Smartphone,    bg: "#ede9fe", shadowDark: "#c4b5fd",  iconColor: "text-violet-600"  },
  "cambio-neumatico":      { icon: Wrench,        bg: "#f3f4f6", shadowDark: "#d1d5db",  iconColor: "text-gray-600"    },
  "vidrieria":             { icon: LayoutGrid,    bg: "#e0f2fe", shadowDark: "#7dd3fc",  iconColor: "text-sky-600"     },
  "pc":                    { icon: Monitor,       bg: "#e0e7ff", shadowDark: "#a5b4fc",  iconColor: "text-indigo-600"  },
  "combustible":           { icon: Fuel,          bg: "#fee2e2", shadowDark: "#fca5a5",  iconColor: "text-red-600"     },
  "pintura-piso":          { icon: Paintbrush,    bg: "#fae8ff", shadowDark: "#f0abfc",  iconColor: "text-fuchsia-600" },
  "calefon":               { icon: Flame,         bg: "#ffedd5", shadowDark: "#fb923c",  iconColor: "text-orange-600"  },
  "beneficios-divorcio":   { icon: FileText,      bg: "#f1f5f9", shadowDark: "#cbd5e1",  iconColor: "text-slate-500"   },
  "beneficios-matrimonio": { icon: Heart,         bg: "#ffe4e6", shadowDark: "#fda4af",  iconColor: "text-rose-600"    },
  "beneficios-nacimiento": { icon: Star,          bg: "#fef9c3", shadowDark: "#fde047",  iconColor: "text-amber-500"   },
  "beneficios-titulacion": { icon: GraduationCap, bg: "#d1fae5", shadowDark: "#6ee7b7",  iconColor: "text-emerald-600" },
};

function CategoryCard({ cat, onClick }: { cat: CategoriaPreguntas; onClick: () => void }) {
  const cfg = ICON_MAP[cat.id];
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const shadow = pressed && cfg
    ? `inset 3px 3px 8px ${cfg.shadowDark}, inset -3px -3px 8px #ffffff`
    : hovered && cfg
    ? `5px 5px 12px ${cfg.shadowDark}, -5px -5px 12px #ffffff`
    : cfg
    ? `3px 3px 8px ${cfg.shadowDark}, -3px -3px 8px #ffffff`
    : "3px 3px 8px #d1d5db, -3px -3px 8px #ffffff";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-shadow duration-150 cursor-pointer"
      style={{
        background: hovered && cfg ? cfg.bg : "#f9fafb",
        boxShadow: shadow,
      }}
    >
      <CategoryIcon id={cat.id} size={18} />
      <span className="text-xs font-medium text-gray-700 leading-snug">{cat.titulo}</span>
    </button>
  );
}

function CategoryIcon({ id, size = 20 }: { id: string; size?: number }) {
  const cfg = ICON_MAP[id];
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{
        width: size * 2.2,
        height: size * 2.2,
        background: cfg.bg,
        boxShadow: `4px 4px 10px ${cfg.shadowDark}, -4px -4px 10px #ffffff`,
      }}
    >
      <Icon size={size} className={cfg.iconColor} strokeWidth={1.75} />
    </div>
  );
}

const PASOS_TOMA_DATOS = [
  {
    title: "RUT del titular",
    description: "7 u 8 dígitos más dígito verificador, sin guión ni puntos. En el SOA siempre sin guión.",
  },
  {
    title: "Nombre completo",
    description: "",
  },
  {
    title: "Teléfono de contacto",
    description: "Número de 9 dígitos. Para llamadas salientes se debe agregar 769. \"El 56 solamente es para WhatsApp\".",
  },
  {
    title: "Pedir dirección clara",
    description: "Preguntar Región y comuna. En Santiago, preguntar si es Santiago Ciudad o Región Metropolitana. Pedir Calle, numeración, entrecalles y referencias.",
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
            Datos básicos para creación de Expediente y asistencia
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
              {["all", ...categorias].map((cat) => {
                const active = activeCategoria === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoria(cat)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition-shadow duration-150"
                    style={{
                      background: active ? "#e0e7ff" : "#f3f4f6",
                      color: active ? "#3730a3" : "#6b7280",
                      boxShadow: active
                        ? "inset 2px 2px 5px #a5b4fc, inset -2px -2px 5px #ffffff"
                        : "2px 2px 5px #d1d5db, -2px -2px 5px #ffffff",
                    }}
                  >
                    {cat === "all" ? "Todas" : cat}
                  </button>
                );
              })}
            </div>

            {/* Grid de categorías */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {filtered.map((cat) => (
                <CategoryCard key={cat.id} cat={cat} onClick={() => setSelected(cat)} />
              ))}
            </div>
          </div>
        ) : (
          /* Vista de preguntas de la categoría seleccionada */
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 self-start rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
              Volver a categorías
            </button>

            <div className="flex items-center gap-3">
              <CategoryIcon id={selected.id} size={22} />
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
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-gray-500 mt-0.5"
                    style={{ background: "#f3f4f6", boxShadow: "2px 2px 4px #d1d5db, -2px -2px 4px #ffffff" }}>
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
