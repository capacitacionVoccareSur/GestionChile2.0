"use client";

import { useState } from "react";
import { Provider } from "@/types";
import { Modal } from "./Modal";
import { Phone, Copy, Check } from "lucide-react";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
    >
      {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
    </button>
  );
}

function ProviderRow({ p }: { p: Provider }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-gray-50 p-3">
      <p className="text-sm font-medium text-gray-900">{p.name}</p>
      <p className="text-xs text-gray-400">{p.region}</p>
      {p.phone !== "—" && (
        <div className="flex items-center gap-1 mt-0.5">
          <Phone size={11} className="text-gray-400 shrink-0" />
          <span className="font-mono text-xs text-indigo-600">{p.phone}</span>
          <CopyBtn text={p.phone} />
        </div>
      )}
      <p className="text-xs text-gray-500 mt-0.5">{p.servicios}</p>
    </div>
  );
}

export function ProveedoresModal({
  proveedores,
  open,
  onClose,
}: {
  proveedores: Provider[];
  open: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = proveedores.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase()) ||
      p.servicios.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal open={open} onClose={onClose} title="Proveedores">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, región o servicio..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-400"
        />
        <div className="flex flex-col gap-2">
          {filtered.map((p) => (
            <ProviderRow key={p.id} p={p} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
