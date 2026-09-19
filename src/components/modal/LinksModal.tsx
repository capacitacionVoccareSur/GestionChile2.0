"use client";

import { useState } from "react";
import { LinkEntry } from "@/types";
import { Modal } from "./Modal";
import { Copy, Check, ExternalLink, Eye, EyeOff } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
    </button>
  );
}

function PasswordField({ password }: { password: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-xs text-gray-700">
        {visible ? password : "•".repeat(Math.min(password.length, 16))}
      </span>
      <button
        onClick={() => setVisible(!visible)}
        className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      >
        {visible ? <EyeOff size={11} /> : <Eye size={11} />}
      </button>
      <CopyButton text={password} />
    </div>
  );
}

function LinkCard({ entry }: { entry: LinkEntry }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-gray-900">{entry.name}</p>
          <p className="text-xs text-gray-400">{entry.category}</p>
        </div>
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {(entry.username || entry.password) && (
        <div className="flex flex-col gap-2 rounded-lg bg-gray-50 px-3 py-2.5 border border-gray-200">
          {entry.username && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 w-20 shrink-0">Usuario</span>
              <div className="flex items-center gap-1 min-w-0">
                <span className="font-mono text-xs text-gray-700 truncate">{entry.username}</span>
                <CopyButton text={entry.username} />
              </div>
            </div>
          )}
          {entry.password && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 w-20 shrink-0">Contraseña</span>
              <PasswordField password={entry.password} />
            </div>
          )}
        </div>
      )}

      {entry.notes && (
        <p className="text-xs text-gray-400">{entry.notes}</p>
      )}
    </div>
  );
}

export function LinksModal({
  links,
  open,
  onClose,
}: {
  links: LinkEntry[];
  open: boolean;
  onClose: () => void;
}) {
  const categories = [...new Set(links.map((l) => l.category))];
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? links
      : links.filter((l) => l.category === activeCategory);

  return (
    <Modal open={open} onClose={onClose} title="Links y Contraseñas">
      <div className="flex flex-col gap-4">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => (
            <LinkCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
