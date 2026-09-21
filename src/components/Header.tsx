"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ClipboardCheck } from "lucide-react";
import { SearchResult } from "@/types";

function BanderaChile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Bandera de Chile">
      <rect width="30" height="10" fill="#FFFFFF" />
      <rect y="10" width="30" height="10" fill="#D52B1E" />
      <rect width="10" height="10" fill="#0039A6" />
      {/* Estrella blanca centrada en el cantón azul */}
      <polygon
        points="5,1.7 5.8,4.0 8.3,4.0 6.3,5.4 7.1,7.8 5,6.3 2.9,7.8 3.7,5.4 1.7,4.0 4.2,4.0"
        fill="#FFFFFF"
      />
    </svg>
  );
}

interface HeaderProps {
  searchData: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  onTomarDatos: () => void;
}

export function Header({ searchData, onResultClick, onTomarDatos }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length >= 2
    ? searchData.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sectionLabels: Record<string, string> = {
    procedimientos: "Procedimientos",
    cuentas: "Cuentas",
    pilotos: "Pilotos",
    links: "Links",
    proveedores: "Proveedores",
    preguntas: "Preguntas",
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <BanderaChile className="h-6 w-9 rounded-sm shadow-sm shadow-black/10" />
          <span className="text-sm font-semibold text-gray-900">Gestión Chile 2.0</span>
        </div>

        {/* Tomar datos */}
        <div className="border-travel-wrapper shrink-0">
          <button
            onClick={onTomarDatos}
            className="relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-indigo-700 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_8px_#a5b4fc,_-3px_-3px_8px_#ffffff]"
            style={{ background: "#e0e7ff" }}
          >
            <ClipboardCheck size={14} />
            <span className="hidden sm:inline">¿Cómo tomar datos?</span>
          </button>
        </div>

        {/* Search */}
        <div ref={containerRef} className="relative w-full max-w-sm">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Buscar procedimientos, cuentas..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-colors"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {open && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/10 overflow-hidden">
              {results.map((result) => (
                <button
                  key={`${result.section}-${result.id}`}
                  onClick={() => {
                    onResultClick(result);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                    <p className="text-xs text-gray-400">{result.category}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {sectionLabels[result.section]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
