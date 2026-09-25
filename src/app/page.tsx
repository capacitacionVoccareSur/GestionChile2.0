"use client";

import { useState } from "react";
import {
  Receipt,
  Monitor,
  Paintbrush,
  Wrench,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCard } from "@/components/bento/BentoCard";
import { Header } from "@/components/Header";
import { ProcedureModal } from "@/components/modal/ProcedureModal";
import { PilotosModal } from "@/components/modal/PilotosModal";
import { LinksModal } from "@/components/modal/LinksModal";
import { ProveedoresModal } from "@/components/modal/ProveedoresModal";
import { TomarDatosModal } from "@/components/modal/TomarDatosModal";

import { procedimientos } from "@/data/procedimientos";
import { planes } from "@/data/cuentas";
import { extensiones, telefonosClientes } from "@/data/pilotos";
import { links } from "@/data/links";
import { proveedores } from "@/data/proveedores";
import { preguntas } from "@/data/preguntas";

import { Procedure, Plan, CategoriaPreguntas, SearchResult, SectionKey } from "@/types";
import { ReactNode } from "react";

type ModalKey = SectionKey | null;

// ── Conversores a Procedure (para usar StepList en los modales) ──────────────

function planToProcedure(plan: Plan): Procedure {
  return {
    id: plan.id,
    title: plan.nombre,
    category: plan.empresa,
    steps: [
      {
        title: "Piloto / Validación",
        description: plan.piloto,
        note: plan.guionEntrada,
      },
      {
        title: "Principales Servicios",
        description: "",
        subSteps: plan.servicios,
      },
      {
        title: "Coberturas",
        description: plan.coberturas,
      },
      ...(plan.tiempoReporte
        ? [{ title: "Tiempo de Reporte", description: plan.tiempoReporte }]
        : []),
      {
        title: "Gestión",
        description: plan.gestion,
        warning: plan.observaciones,
      },
    ],
  };
}

function categoriaToProc(cat: CategoriaPreguntas): Procedure {
  return {
    id: cat.id,
    title: `${cat.emoji} ${cat.titulo}`,
    category: cat.categoria,
    steps: cat.preguntas.map((preg) => ({
      title: preg,
      description: "",
      note: undefined,
    })),
    ...(cat.notas
      ? {
          steps: [
            ...cat.preguntas.map((preg) => ({ title: preg, description: "" })),
            { title: "Nota importante", description: cat.notas! },
          ],
        }
      : {}),
  };
}

const planesAsProcedures = planes.map(planToProcedure);
const preguntasAsProcedures = preguntas.map(categoriaToProc);

// ── Índice de búsqueda global ─────────────────────────────────────────────────

const searchData: SearchResult[] = [
  ...procedimientos.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    section: "procedimientos" as SectionKey,
  })),
  ...planes.map((p) => ({
    id: p.id,
    title: p.nombre,
    category: p.empresa,
    section: "cuentas" as SectionKey,
  })),
  ...extensiones.map((e, i) => ({
    id: `ext-${i}`,
    title: e.cuenta,
    category: "Extensión piloto",
    section: "pilotos" as SectionKey,
  })),
  ...telefonosClientes.map((c, i) => ({
    id: `tel-${i}`,
    title: c.name,
    category: "Teléfono cliente",
    section: "pilotos" as SectionKey,
  })),
  ...links.map((l) => ({
    id: l.id,
    title: l.name,
    category: l.category,
    section: "links" as SectionKey,
  })),
  ...proveedores.map((p) => ({
    id: p.id,
    title: p.name,
    category: p.region,
    section: "proveedores" as SectionKey,
  })),
  ...preguntas.map((q) => ({
    id: q.id,
    title: `${q.emoji} ${q.titulo}`,
    category: q.categoria,
    section: "preguntas" as SectionKey,
  })),
];

// ── Guías rápidas (procedimientos de uso frecuente) ──────────────────────────

interface GuideInfo {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
  procedure: Procedure;
}

const GUIAS: GuideInfo[] = [
  {
    id: procedimientos[0].id,
    title: procedimientos[0].title,
    description: "Toma de datos, coordinación con proveedor y restricciones del servicio.",
    category: procedimientos[0].category,
    icon: <Paintbrush size={20} />,
    procedure: procedimientos[0],
  },
  {
    id: procedimientos[1].id,
    title: procedimientos[1].title,
    description: "Validación en SOA, preguntas de descarte, asignación de proveedor y cierre.",
    category: procedimientos[1].category,
    icon: <Monitor size={20} />,
    procedure: procedimientos[1],
  },
  {
    id: procedimientos[2].id,
    title: procedimientos[2].title,
    description: "Reintegro económico o de beneficios — datos requeridos y delegación a PDELOSREYES.",
    category: procedimientos[2].category,
    icon: <Receipt size={20} />,
    procedure: procedimientos[2],
  },
  {
    id: procedimientos[3].id,
    title: procedimientos[3].title,
    description: "Verificación en sistema, rotación de proveedores y envío de datos al coordinar.",
    category: procedimientos[3].category,
    icon: <Wrench size={20} />,
    procedure: procedimientos[3],
  },
];


// ── Card local para guías ─────────────────────────────────────────────────────

function GuideCard({ guide, onClick }: { guide: GuideInfo; onClick: () => void }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const shadow = pressed
    ? "inset 3px 3px 8px #e5e7eb, inset -3px -3px 8px #ffffff"
    : hovered
    ? "6px 6px 14px #e5e7eb, -6px -6px 14px #ffffff"
    : "4px 4px 10px #e5e7eb, -4px -4px 10px #ffffff";

  const categoryColors: Record<string, { bg: string; shadowDark: string; text: string }> = {
    "Servicios Hogar": { bg: "#fce7f3", shadowDark: "#f9a8d4", text: "#9d174d" },
    "Operaciones":     { bg: "#e0e7ff", shadowDark: "#a5b4fc", text: "#3730a3" },
    "Reintegros":      { bg: "#ffe4e6", shadowDark: "#fda4af", text: "#9f1239" },
  };
  const cat = categoryColors[guide.category] ?? { bg: "#f3f4f6", shadowDark: "#d1d5db", text: "#374151" };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="group flex flex-col gap-4 rounded-2xl p-5 text-left focus-visible:outline-none transition-shadow duration-150 cursor-pointer"
      style={{ background: "#f9fafb", boxShadow: shadow }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-shadow duration-150"
          style={{ background: cat.bg, boxShadow: `2px 2px 6px ${cat.shadowDark}, -2px -2px 6px #ffffff`, color: cat.text }}
        >
          {guide.icon}
        </div>
        <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: cat.bg, color: cat.text }}>
          {guide.category}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{guide.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{guide.description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{guide.procedure.steps.length} pasos</span>
        <span className="text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Ver procedimiento →
        </span>
      </div>
    </button>
  );
}

// ── Accesos directos ─────────────────────────────────────────────────────────

const ACCESOS = [
  { id: "sigma",     label: "Sigma Dental"   },
  { id: "imed",      label: "IMED La Polar"  },
  { id: "sura",      label: "Portal SURA"    },
  { id: "intranet",  label: "Intranet"       },
  { id: "rut",       label: "Rutificador"    },
  { id: "patentes",  label: "Patentes"       },
];

// ── Página ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [activeGuide, setActiveGuide] = useState<Procedure | null>(null);
  const [rightOpen, setRightOpen] = useState(true);

  const open = (key: SectionKey) => setActiveModal(key);
  const close = () => setActiveModal(null);

  return (
    <>
      <Header
        searchData={searchData}
        onResultClick={(r) => setActiveModal(r.section)}
        onTomarDatos={() => open("preguntas")}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-44 shrink-0 flex flex-col">
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-5 py-4">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 shrink-0">
              Directorio
            </p>
            <BentoGrid className="flex-1 min-h-0">
              <BentoCard
                number={1}
                colorKey="indigo"
                title="Cuentas / Planes"
                count={planes.length}
                countLabel="planes"
                onClick={() => open("cuentas")}
              />
              <BentoCard
                number={2}
                colorKey="violet"
                title="Procedimientos"
                count={procedimientos.length}
                countLabel="proc."
                onClick={() => open("procedimientos")}
              />
              <BentoCard
                number={3}
                colorKey="sky"
                title="Pilotos y Teléfonos"
                count={extensiones.length + telefonosClientes.length}
                countLabel="entradas"
                onClick={() => open("pilotos")}
              />
              <BentoCard
                number={4}
                colorKey="emerald"
                title="Links y Contraseñas"
                count={links.length}
                countLabel="entradas"
                onClick={() => open("links")}
              />
              <BentoCard
                number={5}
                colorKey="rose"
                title="Proveedores"
                count={proveedores.length}
                countLabel="proveedores"
                onClick={() => open("proveedores")}
              />
            </BentoGrid>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[11px] text-gray-300 font-medium">Gestión Chile 2.0</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-5xl h-full">
          <div className="rounded-2xl border border-gray-200 bg-white px-8 py-8 min-h-full">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
            <p className="mt-1 text-sm text-gray-400">
              Encuentra la información más relevante haciendo click
            </p>

            <div className="mt-8">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-base font-semibold text-gray-800">Guías rápidas</h2>
                <span className="text-xs text-gray-400">{GUIAS.length} guías disponibles</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {GUIAS.map((guide) => (
                  <GuideCard
                    key={guide.id}
                    guide={guide}
                    onClick={() => setActiveGuide(guide.procedure)}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
        </main>

        {/* Right panel — Accesos Directos */}
        <aside
          className={`shrink-0 flex flex-col bg-red-600 transition-all duration-300 ease-in-out overflow-hidden my-4 mr-4 rounded-2xl ${
            rightOpen ? "w-40" : "w-9"
          }`}
        >
          {/* Toggle */}
          <button
            onClick={() => setRightOpen(!rightOpen)}
            title={rightOpen ? "Colapsar" : "Expandir accesos"}
            className="flex h-10 w-full shrink-0 items-center justify-center border-b border-red-700/50 text-white/60 hover:text-white hover:bg-red-700/40 transition-colors"
          >
            {rightOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Shortcuts */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-1.5">
            <p
              className={`mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-white/40 transition-opacity duration-200 ${
                rightOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Accesos directos
            </p>
            <div className="flex flex-col gap-0.5">
              {ACCESOS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => open("links")}
                  title={a.label}
                  className="group flex w-full items-center gap-2.5 rounded-xl px-2 py-2.5 text-left hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <ExternalLink
                    size={13}
                    className="shrink-0 text-white/60 group-hover:text-white transition-colors"
                  />
                  <span
                    className={`overflow-hidden whitespace-nowrap text-xs font-semibold text-white transition-all duration-300 ${
                      rightOpen ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Modales — todos usan StepList vía ProcedureModal */}
      <ProcedureModal
        title="Procedimientos"
        procedures={procedimientos}
        open={activeModal === "procedimientos"}
        onClose={close}
      />
      <ProcedureModal
        title="Cuentas / Planes"
        procedures={planesAsProcedures}
        open={activeModal === "cuentas"}
        onClose={close}
      />
      <TomarDatosModal
        preguntas={preguntas}
        open={activeModal === "preguntas"}
        onClose={close}
      />

      {/* Modales especializados (directorio y herramientas) */}
      <PilotosModal
        extensiones={extensiones}
        telefonosClientes={telefonosClientes}
        open={activeModal === "pilotos"}
        onClose={close}
      />
      <LinksModal
        links={links}
        open={activeModal === "links"}
        onClose={close}
      />
      <ProveedoresModal
        proveedores={proveedores}
        open={activeModal === "proveedores"}
        onClose={close}
      />

      {/* Modal de guías rápidas */}
      {activeGuide && (
        <ProcedureModal
          title="Guía rápida"
          procedures={[activeGuide]}
          open={true}
          onClose={() => setActiveGuide(null)}
        />
      )}
    </>
  );
}
