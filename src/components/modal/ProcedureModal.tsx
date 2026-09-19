"use client";

import { useState } from "react";
import { Procedure } from "@/types";
import { Modal } from "./Modal";
import { StepList } from "@/components/content/StepList";
import { FlowChart } from "@/components/content/FlowChart";
import { Clock, Tag } from "lucide-react";

interface ProcedureModalProps {
  procedures: Procedure[];
  open: boolean;
  onClose: () => void;
  title?: string;
  initialId?: string;
}

export function ProcedureModal({
  procedures,
  open,
  onClose,
  title = "Procedimientos",
  initialId,
}: ProcedureModalProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialId ?? procedures[0]?.id ?? ""
  );

  const selected = procedures.find((p) => p.id === selectedId) ?? procedures[0];

  if (!selected) return null;

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-5">
        {/* Selector */}
        {procedures.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {procedures.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  p.id === selectedId
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {/* Meta */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{selected.title}</h2>
          <div className="mt-2 flex flex-wrap gap-3">
            <span className="text-xs text-gray-400">{selected.category}</span>
            {selected.estimatedTime && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />
                {selected.estimatedTime}
              </span>
            )}
            {selected.tags?.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-gray-400"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <StepList steps={selected.steps} />

        {/* Flowchart */}
        {selected.flowchart && (
          <div className="pt-2">
            <h3 className="mb-3 text-sm font-medium text-gray-600">Diagrama de flujo</h3>
            <FlowChart chart={selected.flowchart} />
          </div>
        )}
      </div>
    </Modal>
  );
}
