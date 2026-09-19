"use client";

import { useState } from "react";
import { Extension, Contact } from "@/types";
import { Modal } from "./Modal";
import { Phone, Mail, Copy, Check } from "lucide-react";

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

function ExtensionCard({ ext }: { ext: Extension }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
      <span className="text-xs font-medium text-gray-700 truncate">{ext.cuenta}</span>
      <div className="flex items-center gap-1 shrink-0">
        <span className="font-mono text-xs text-indigo-600">{ext.numero}</span>
        <CopyBtn text={ext.numero} />
      </div>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 flex flex-col gap-1.5">
      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
      {contact.phone && (
        <a href={`tel:${contact.phone.replace(/[\s\/]/g, "")}`}
          className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 transition-colors">
          <Phone size={11} />
          {contact.phone}
        </a>
      )}
      {contact.email && (
        <a href={`mailto:${contact.email}`}
          className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 transition-colors">
          <Mail size={11} />
          {contact.email}
        </a>
      )}
      {contact.notes && <p className="text-xs text-gray-400 mt-0.5">{contact.notes}</p>}
    </div>
  );
}

interface PilotosModalProps {
  extensiones: Extension[];
  telefonosClientes: Contact[];
  open: boolean;
  onClose: () => void;
}

export function PilotosModal({ extensiones, telefonosClientes, open, onClose }: PilotosModalProps) {
  const [tab, setTab] = useState<"pilotos" | "telefonos">("pilotos");
  const [search, setSearch] = useState("");

  const filteredExt = extensiones.filter(e =>
    e.cuenta.toLowerCase().includes(search.toLowerCase())
  );
  const filteredTel = telefonosClientes.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal open={open} onClose={onClose} title="Pilotos y Teléfonos">
      <div className="flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-2">
          {(["pilotos", "telefonos"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === t ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-800"
              }`}>
              {t === "pilotos" ? `Pilotos (${extensiones.length})` : `Teléfonos clientes (${telefonosClientes.length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === "pilotos" ? "Buscar cuenta..." : "Buscar empresa..."}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-400"
        />

        {tab === "pilotos" && (
          <div className="flex flex-col gap-1.5">
            {filteredExt.map((ext) => (
              <ExtensionCard key={ext.cuenta} ext={ext} />
            ))}
          </div>
        )}

        {tab === "telefonos" && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filteredTel.map((c, i) => (
              <ContactCard key={i} contact={c} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
